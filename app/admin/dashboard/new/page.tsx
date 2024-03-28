import Editor from "@/app/components/ui/editor/Editor";
import React from "react";

const page = () => {
  return (
    <>
      <div className="bg-base-200 rounded-md p-2 m-2 sm:m-3 md:m-4 lg:m-5 xl:m-6">
        <h3 className="flex justify-center font-medium">Create post</h3>
        <Editor />
      </div>
    </>
  );
};

export default page;
