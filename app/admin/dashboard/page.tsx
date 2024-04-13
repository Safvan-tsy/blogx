import React from 'react';
import CountCard from '@/app/admin/components/CountCard';
import LatestBlogsCard from '@/app/admin/components/LatestBlogs';
import ProfileCard from '@/app/admin/components/Profile';

const page = async () => {
  return (
    <div
      className="m-2 flex flex-col gap-4 rounded-md bg-base-200 p-2 pb-6 sm:m-3 md:m-4 
    md:p-4 lg:m-5 xl:m-6 xl:flex-row"
    >
      <div className="flex flex-col gap-4 lg:gap-6 lg:p-6 xl:flex-grow">
        <CountCard />
        <LatestBlogsCard />
      </div>
      <div className="flex justify-center lg:px-6 lg:pb-6">
        <ProfileCard />
      </div>
    </div>
  );
};

export default page;
