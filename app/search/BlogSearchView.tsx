'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '@prisma/client';
import Image from 'next/image';
import Pagination from '@/app/components/ui/Pagination';
import { BlogListViewSkelton } from '@/app/components/ui/skeleton/Home';
import { NAV_URL } from '@/lib/utils/constants';
import NotFoundImage from '@/public/not-found.jpg';
import { calculateTimeDifference } from '@/lib/actions/utils';

const BlogSearchView: React.FC<{
  params: { [key: string]: string | undefined };
}> = ({ params }) => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
    keyword?: string;
  }>({
    page: 1,
    limit: 10,
  });

  const fetchData = async () => {
    try {
      const headers = new Headers();
      const queryString = new URLSearchParams({
        page: query.page.toString(),
        limit: query.limit.toString(),
        status: 'published',
        keyword: query.keyword || '',
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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      limit: Number(params.limit) || 10,
      keyword: params.keyword,
    }));
  }, [params]);

  useEffect(() => {
    if (query.keyword) {
      setIsLoading(true);
      fetchData();
    }
  }, [query]);

  const pageOnChange = async (page: number) => {
    router.push(`${NAV_URL.SEARCH}?page=${page}&limit=${query.limit}&keyword=${query.keyword}`);
  };

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <BlogListViewSkelton />
      ) : (
        <>
          {posts.length > 0 ? (
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
                      <h2 className="text-lg font-semibold tracking-wide lg:text-xl">
                        {item.title}
                      </h2>
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
            </>
          ) : (
            <>
              <div
                className={`card cursor-pointer border border-base-200 bg-base-100 p-2 shadow-xl hover:bg-base-200`}
              >
                <figure>
                  <Image
                    src={NotFoundImage}
                    alt="Empty result"
                    className={`mask h-60 w-full rounded-xl object-cover object-center md:w-full xl:h-80`}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="text-lg font-semibold tracking-wide lg:text-xl">
                    No search results found 🥴
                  </h2>
                  <div className="badge badge-md">just now</div>
                </div>
              </div>
            </>
          )}
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

export default BlogSearchView;
