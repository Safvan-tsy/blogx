import { BlogView } from "@/app/blog/components/BlogView";
import HomeProfileCard from "@/app/components/ui/card/HomeProfileCard";
import React from "react";

const page: React.FC<{ params: any }> = ({ params }) => {
  return (
    <>
      <div
        className="min-h-screen flex flex-col m-auto px-2 pt-3 pb-4 lg:px-10 
            sm:px-8 sm:pt-4 sm:pb-8 lg:pt-5 lg:pb-10 lg:flex-row justify-center gap-10"
      >
        <div>
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
