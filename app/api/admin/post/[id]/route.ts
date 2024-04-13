import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(req: Request) {
  try {
    const token = req.headers.get('Authorization');
    if (!token)
      return NextResponse.json(
        {
          message: 'Invalid User',
        },
        { status: 403 },
      );
    const user = await db.user.findUnique({ where: { username: token } });
    if (!user)
      return NextResponse.json(
        {
          message: 'No user found with that token',
        },
        { status: 404 },
      );
    const id = Number(req.url.split('post/')[1]);

    await db.post.delete({
      where: { id },
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
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
