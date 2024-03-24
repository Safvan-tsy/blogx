import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

    return NextResponse.json(
      { status: "success", user: user },
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
    let isUsernameChange = false;
    if (user.username !== body.username) isUsernameChange = true;

    const updatedUser = await db.user.update({
      where: { username: token },
      data: {
        username: body.username,
        email: body.email,
        fullName: body.fullName,
        about: body.about,
      },
    });
    console.log(updatedUser);

    return NextResponse.json(
      { status: "success", user: updatedUser, isUsernameChange },
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
