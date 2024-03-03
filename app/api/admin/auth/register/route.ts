import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

export async function POST(req: Request) {
  try {
    const { username, email, password, confirmPassword } = await req.json();

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail)
      return NextResponse.json(
        {
          message: "User Already Exists",
        },
        { status: 409 }
      );

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername)
      return NextResponse.json(
        {
          message: "User Already Exists",
        },
        { status: 409 }
      );

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const { password: newPass, ...rest } = newUser;
    return NextResponse.json(
      { status: "success", user: rest },
      { status: 201 }
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
