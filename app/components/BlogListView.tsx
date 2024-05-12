'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { calculateTimeDifference } from '@/lib/actions/utils';
import Pagination from './ui/Pagination';
import { BlogListViewSkelton } from './ui/skeleton/Home';

const BlogListView = () => {
  // const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 5,
  });

  const fetchData = useCallback(async () => {
    try {
      const headers = new Headers();
      const queryString = new URLSearchParams({
        page: query.page.toString(),
        limit: query.limit.toString(),
        status: 'published',
      }).toString();

      const response = await fetch(`/api/post?${queryString}`, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      const postsWithDate = data.posts.map((post: Post) => ({
        ...post,
        updatedAt: new Date(post.updatedAt),
      }));

      setPosts(postsWithDate);
      setTotalPage(data.totalPage);
    } catch (error) {
      throw new Error(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const pageOnChange = async (page: number) => {
    setIsLoading(true);
    setQuery((prevQuery) => ({
      ...prevQuery,
      page,
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <BlogListViewSkelton />
      ) : (
        <>
          {posts.map((item, index) => (
            <Link key={item.id} href={`/blog/${item.id}`}>
              <div
                className={`card ${
                  index !== 0 ? 'md:card-side' : ''
                }  cursor-pointer border border-base-200 bg-base-100 p-2 shadow-xl hover:bg-base-200`}
              >
                <figure>
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Cover"
                      className={`mask w-full rounded-xl object-cover object-center ${
                        index == 0 ? 'h-60 md:w-full xl:h-80' : 'h-28 md:h-20 md:w-40 '
                      }`}
                    />
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="text-lg font-semibold tracking-wide lg:text-xl">{item.title}</h2>
                  <div className="badge badge-md">
                    {item.updatedAt.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    ({calculateTimeDifference(item.updatedAt)})
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {posts.length > 0 && (
            <div className="m-1 flex justify-center p-2">
              <Pagination currentPage={query.page} onChange={pageOnChange} totalPage={totalPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogListView;
