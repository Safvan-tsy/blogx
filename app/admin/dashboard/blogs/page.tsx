import BlogList from "@/app/components/BlogList";
import React from "react";

const page = () => {
  return (
    <>
      <div className=" p-2 m-2 sm:m-3 md:m-4 lg:m-5 xl:m-6">
        <BlogList />
      </div>
    </>
  );
};

export default page;
