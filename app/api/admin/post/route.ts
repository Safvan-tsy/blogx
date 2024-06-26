import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('Authorization');
    if (!token)
      return NextResponse.json(
        {
          message: 'Invalid User',
        },
        { status: 403 },
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

    return NextResponse.json({ status: 'success', post }, { status: 200 });
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

export async function PUT(req: Request) {
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
    const body = await req.json();
    const id = Number(body.id);
    const updatedPost = await db.post.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        status: body.status,
        image: body.image,
      },
    });

    return NextResponse.json({ status: 'success', post: updatedPost }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Something went wrong',
        error,
      },
      { status: 500 },
    );
  }
}
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page'));
    const limit = Number(url.searchParams.get('limit'));
    const status = url.searchParams.get('status');
    const keyword = url.searchParams.get('keyword');

    let query: Prisma.PostFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (status && status != '')
      query = {
        ...query,
        where: {
          status,
        },
      };

    if (keyword && keyword != '')
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
        createdAt: 'desc',
      },
    });

    const totalCount = await db.post.count();
    const totalPage = Math.ceil(totalCount / limit);
    return NextResponse.json({ status: 'success', totalPage, totalCount, posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error',
        error,
      },
      { status: 500 },
    );
  }
}
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
    const body = await req.json();
    const ids = body.ids;
    await db.post.deleteMany({
      where: { id: { in: ids } },
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
