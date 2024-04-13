'use client';
import { Post } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { BlogViewSkelton } from '../../components/ui/skeleton/Home';

export const BlogView: React.FC<{ id: number }> = ({ id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post>();
  const [error, setError] = useState<string>('');

  const fetchData = async (id: number) => {
    try {
      const headers = new Headers();
      const response = await fetch(`/api/post/${id}`, {
        method: 'GET',
        headers,
      });
      const data: { status: string; post: Post } = await response.json();
      data.post.updatedAt = new Date(data.post.updatedAt);
      setPost(data.post);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const calculateTimeDifference = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="flex max-w-full flex-col gap-3">
      {isLoading ? (
        <BlogViewSkelton />
      ) : (
        <>
          {post && (
            <div className="card card-compact border border-base-200 bg-base-200 p-2 shadow-xl">
              {post.image && (
                <figure>
                  <img
                    src={post.image}
                    alt="Cover"
                    className="mask h-60 w-full rounded-xl object-cover 
                  object-center md:w-full xl:h-80"
                  />
                </figure>
              )}
              <div className="card-body">
                <div className="flex flex-col gap-2 xl:pb-10 xl:pt-5">
                  <h2 className="xl:lead-[3rem] text-2xl font-semibold md:text-3xl lg:text-4xl">
                    {post.title}
                  </h2>
                  <div className="badge badge-md">
                    {post.updatedAt.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    ({calculateTimeDifference(post.updatedAt)})
                  </div>
                </div>
                <div>
                  <div
                    className="editor flex flex-col gap-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
