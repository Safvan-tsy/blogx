'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CounterCardSkelton } from '@/app/components/ui/skeleton/Dashboard';

const CountCard: React.FC = () => {
  const { data: userData } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [blogCount, setBlogCount] = useState<number>();

  const fetchData = async () => {
    try {
      const headers = new Headers();
      headers.append('Authorization', userData?.user.username || '');
      const response = await fetch(`/api/admin/post`, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      setBlogCount(data.totalCount);
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
    <div className="flex justify-between gap-3 md:justify-center lg:justify-start lg:gap-5">
      {isLoading ? (
        <CounterCardSkelton />
      ) : (
        <>
          <div className="w-full">
            <div className="card w-full  bg-base-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{blogCount}</h2>
                <p>Blogs</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="card w-full  bg-base-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title">25</h2>
                <p>Views</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountCard;
