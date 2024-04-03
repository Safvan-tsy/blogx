import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page"));
    const limit = Number(url.searchParams.get("limit"));
    const status = url.searchParams.get("status");
    const keyword = url.searchParams.get("keyword");

    let query: Prisma.PostFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (status && status != "")
      query = {
        ...query,
        where: {
          status: status,
        },
      };

    if (keyword && keyword != "")
      query = {
        skip: query.skip,
        take: query.take,
        where: {
          ...query.where,
          title: {
            search: keyword,
          },
        },
      };

    const posts = await db.post.findMany({
      ...query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await db.post.count({ where: query.where });
    return NextResponse.json(
      { status: "success", totalCount, posts },
      { status: 200 }
    );
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
