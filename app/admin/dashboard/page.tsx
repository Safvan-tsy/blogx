import CountCard from "@/app/components/ui/card/CountCard";
import LatestBlogsCard from "@/app/components/ui/card/LatestBlogs";
import ProfileCard from "@/app/components/ui/card/Profile";
import React from "react";

const page = async () => {
  return (
    <div
      className="bg-base-200 flex flex-col xl:flex-row gap-4 rounded-md p-2 pb-6 md:p-4 m-2 
    sm:m-3 md:m-4 lg:m-5 xl:m-6"
    >
      <div className="flex flex-col xl:flex-grow gap-4 lg:gap-6 lg:p-6">
        <CountCard />
        <LatestBlogsCard />
      </div>
      <div className="flex justify-center lg:p-6">
        <ProfileCard />
      </div>
    </div>
  );
};

export default page;
