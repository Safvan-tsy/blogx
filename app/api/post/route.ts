import { NextResponse } from "next/server";

export async function GET() {
  try {
    //logic to get data from db
    return NextResponse.json(
      {
        status: "success",
        blogs: [
          {
            title: "sample",
          },
        ],
      },
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
