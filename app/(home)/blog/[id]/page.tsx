'use client';
import React from 'react';
import { usePostFetch } from '@/lib/hooks/usePostFetch';
import { BlogView } from '../components/BlogView';

const Blog: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { isLoading, post, error } = usePostFetch(Number(params.id));

  return (
    <div className="xl:w-[50rem]">
      <BlogView isLoading={isLoading} post={post} error={error} />
    </div>
  );
};

export default Blog;
