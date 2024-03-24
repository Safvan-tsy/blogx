import React from "react";

const ProfileFormSkelton = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
      <div className="w-full h-full">
        <div className="">
          <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 xl:gap-4">
            <div>
              <div className="p-2">
                <div className="skeleton mb-2 h-9 rounded-lg block w-full p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="skeleton mb-2 h-9 rounded-lg block w-full p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="skeleton mb-2 h-32 rounded-lg block w-full p-2.5"></div>
              </div>
            </div>
            <div>
              <div className="p-2">
                <div className="skeleton mb-2 h-9 rounded-lg block w-full p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="flex flex-row flex-wrap lg:flex-col items-center gap-2 md:justify-between lg:items-start">
                  <div className="skeleton h-32 w-40"></div>
                  <div className="skeleton h-9 file-input w-full max-w-xs"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormSkelton;
