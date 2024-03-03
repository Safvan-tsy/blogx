import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password, confirmPassword } = await req.json();

    const data = await req.json();

    return NextResponse.json({ status: "success", data }, { status: 200 });
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
