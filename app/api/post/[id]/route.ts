import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const id = req.url.split("post/")[1];
    const post = await db.post.findUnique({ where: { id: Number(id) } });

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

export async function POST(req: Request) {
  const data = await req.json();

  return Response.json({ status: "success", data });
}
