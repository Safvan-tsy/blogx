'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Post } from '@prisma/client';
import { LatestBlogSkelton } from '@/app/components/ui/skeleton/Dashboard';

const LatestBlogsCard: React.FC = () => {
  const { data: userData } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [post, setPost] = useState<Post[]>();

  const fetchData = async () => {
    try {
      const headers = new Headers();
      headers.append('Authorization', userData?.user.username || '');
      const queryString = new URLSearchParams({
        page: '1',
        limit: '2',
        status: 'published',
      }).toString();

      const response = await fetch(`/api/admin/post?${queryString}`, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      setPost(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (userData?.user) fetchData();
  }, [userData?.user]);

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-base-100 p-3 lg:p-4">
      {isLoading ? (
        <LatestBlogSkelton />
      ) : (
        <>
          <h2 className="card-title">Latest Blogs</h2>
          <div className="flex flex-col gap-2 lg:gap-4 lg:py-5">
            {post?.map((item) => (
              <div
                key={item.id}
                className="card border border-base-200 bg-base-100 p-2 shadow-xl
                    md:card-side hover:bg-base-200"
              >
                <figure>
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Cover"
                      className="mask h-28 w-full rounded-xl object-cover object-center md:h-20 md:w-40"
                    />
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="text-lg font-semibold tracking-wide lg:text-xl">{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LatestBlogsCard;
