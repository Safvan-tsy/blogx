import React from "react";

const EditorSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full ">
          <div className="">
            <div className="grid grid-cols-1 grid-rows-1 xl:gap-4">
              <div className="p-2">
                <div className="block mb-2 skeleton w-[50%] h-9"></div>
                <div className="skeleton w-[25%] flex flex-row flex-wrap lg:flex-col gap-2 h-24 p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="skeleton mb-2 h-9 rounded-lg block w-full p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="skeleton mb-2 h-[25rem] rounded-lg block w-full p-2.5"></div>
              </div>
            </div>
            <div className="w-full mt-4 pt-2 md:mt-1 lg:mt-4">
              <div className="skeleton mb-2 h-9 rounded-lg block w-full p-2.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSkeleton;
