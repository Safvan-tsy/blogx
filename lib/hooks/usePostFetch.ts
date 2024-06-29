import { Post } from '@prisma/client';
import { useEffect, useState } from 'react';

export const usePostFetch = (id: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = new Headers();
        const response = await fetch(`/api/post/${id}`, {
          method: 'GET',
          headers,
        });
        if (response.ok) {
          const { post } = await response.json();
          post.updatedAt = new Date(post.updatedAt);
          setPost(post);
        } else {
          setError('Something went wrong');
        }
      } catch (error: any) {
        setError(error.message || 'shit');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { isLoading, post, error };
};
