import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(15),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must have than 6 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

async function checkExistingUser(email: string, username: string) {
  const existingUserByEmail = await db.user.findUnique({
    where: { email: email },
  });
  const existingUserByUsername = await db.user.findUnique({
    where: { username: username },
  });
  if (existingUserByEmail || existingUserByUsername) return true;
  else return false;
}

async function checkAnyUsers() {
  const existingUser = await db.user.findMany();
  if (existingUser) return true;
  else return false;
}

export async function POST(req: Request) {
  try {
    const anyUser = await checkAnyUsers();
    if (anyUser)
      return NextResponse.json(
        {
          message: "User Already Exists",
        },
        { status: 409 }
      );
    const body = await req.json();
    const { username, email, password, confirmPassword } =
      userSchema.parse(body);

    const existingUser = await checkExistingUser(email, username);
    if (existingUser)
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
