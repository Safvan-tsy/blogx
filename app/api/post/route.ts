import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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

    const totalCount = await db.post.count({ where: query.where });
    const totalPage = Math.ceil(totalCount / limit);
    return NextResponse.json({ status: 'success', totalPage, posts }, { status: 200 });
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
