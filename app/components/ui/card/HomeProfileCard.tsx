'use client';
import React, { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { ProfileCardSkelton } from '../skeleton/Dashboard';
import WelcomeCard from './WelcomeCard';

const HomeProfileCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<User>();

  const fetchData = async () => {
    try {
      const headers = new Headers();

      const response = await fetch(`/api/user`, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      setError('Something went wrong');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="card w-fit items-center justify-center bg-base-100 shadow-xl sm:w-80 md:w-full 
    md:flex-row lg:w-full xl:w-96 xl:flex-col"
    >
      {isLoading ? (
        <ProfileCardSkelton />
      ) : (
        <>
          {user ? (
            <>
              <figure
                className="px-10 pt-10 md:px-4 md:pt-0 lg:h-60 lg:w-60 lg:px-10 lg:pt-10
           xl:h-64 xl:w-64 xl:px-10 xl:pt-10"
              >
                {user?.image && (
                  <img
                    src={user?.image}
                    alt="user"
                    className="mask mask-squircle object-cover object-center"
                  />
                )}
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{user?.fullName ? user.fullName : user?.username}</h2>
                <div className="text-sm opacity-50">{user?.email}</div>
                <p className="text-sm">{user?.about}</p>
                <p></p>
              </div>
            </>
          ) : (
            <WelcomeCard />
          )}
        </>
      )}
    </div>
  );
};

export default HomeProfileCard;
