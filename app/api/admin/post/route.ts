import { db } from "@/lib/db";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization");
    if (!token)
      return NextResponse.json(
        {
          message: "Invalid User",
        },
        { status: 403 }
      );

    const body = await req.json();
    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
      },
    });
    ////

    return NextResponse.json({ status: "success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const token = req.headers.get("Authorization");
    if (!token)
      return NextResponse.json(
        {
          message: "Invalid User",
        },
        { status: 403 }
      );
    const user = await db.user.findUnique({ where: { username: token } });
    if (!user)
      return NextResponse.json(
        {
          message: "No user found with that token",
        },
        { status: 404 }
      );
    const body = await req.json();

    const updatedPost = await db.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
      },
    });

    return NextResponse.json(
      { status: "success", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error,
      },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page"));
    const limit = Number(url.searchParams.get("limit"));
    const status = url.searchParams.get("status");

    let posts: Post[];
    if (status && status != "") {
      posts = await db.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          status: {
            contains: status,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await db.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json({ status: "success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      { status: 500 }
    );
  }
}
