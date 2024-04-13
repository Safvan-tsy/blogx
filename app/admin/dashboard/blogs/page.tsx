import React from 'react';
import BlogList from '@/app/admin/components/BlogList';

const page = () => {
  return (
    <>
      <div className=" m-2 p-2 sm:m-3 md:m-4 lg:m-5 xl:m-6">
        <BlogList />
      </div>
    </>
  );
};

export default page;
