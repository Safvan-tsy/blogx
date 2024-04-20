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
          const data: { status: string; post: Post } = await response.json();
          data.post.updatedAt = new Date(data.post.updatedAt);
          setPost(data.post);
        } else {
          setError('Something went wrong');
        }
      } catch (error: any) {
        setError(error.message);
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
