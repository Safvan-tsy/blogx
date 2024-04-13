import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const users = await db.user.findMany();

    return NextResponse.json(
      {
        status: 'success',
        user: users[0],
        users: users && users.length > 0 ? true : false,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong',
        error,
      },
      { status: 500 },
    );
  }
}
