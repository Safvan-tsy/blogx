import React from 'react';
import { BlogView } from '@/app/blog/components/BlogView';
import HomeProfileCard from '@/app/components/ui/card/HomeProfileCard';

const page: React.FC<{ params: any }> = ({ params }) => {
  return (
    <>
      <div
        className="m-auto flex min-h-screen flex-col justify-center gap-10 px-2 pb-4 
            pt-3 sm:px-8 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-10 lg:pt-5 xl:flex-row"
      >
        <div className="xl:w-[50rem]">
          <BlogView id={params.id} />
        </div>
        <div>
          <HomeProfileCard />
        </div>
      </div>
    </>
  );
};

export default page;
