import { Post } from '@prisma/client';
import React from 'react';
import { BlogViewSkelton } from '@/app/components/ui/skeleton/Home';
import { calculateTimeDifference } from '@/lib/actions/utils';

export const BlogView: React.FC<{
  isLoading: boolean;
  post: Post | null;
  error?: string | null;
}> = ({ isLoading, post, error }) => {
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
