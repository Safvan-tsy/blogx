import React from "react";

interface BlogListSkeletonProps {
  numberOfRows: number;
}

export const BlogListSkeleton: React.FC<BlogListSkeletonProps> = ({
  numberOfRows,
}) => {
  const generateSkeletonRow = () => (
    <tr key={Math.random()}>
      <th>
        <label>
          <div className="skeleton w-4 h-4"></div>
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="skeleton w-[12rem] h-6"></div>
          </div>
        </div>
      </td>
      <td>
        <div className="skeleton w-36 h-16"></div>
      </td>
      <td>
        <div className="skeleton w-32 h-6"></div>
      </td>
      <th>
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="skeleton w-6 h-6"></div>
          <div className="skeleton w-6 h-6"></div>
        </div>
      </th>
    </tr>
  );

  // Generating multiple skeleton rows
  const skeletonRows = Array.from({ length: numberOfRows }, () =>
    generateSkeletonRow()
  );

  return (
    <div className="overflow-x-auto mt-3">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Title</th>
            <th>Cover</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{skeletonRows}</tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Cover</th>
            <th>Status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export const EditorSkeleton = () => {
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

export const ProfileFormSkeleton = () => {
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

export const LatestBlogSkelton = () => {
  return (
    <>
      <h2 className="skeleton h-5 w-36 rounded-md"></h2>
      <div className="flex flex-col gap-2 lg:gap-4 lg:py-5">
        <div
          className="card md:card-side bg-base-100 shadow-xl border border-base-200
        hover:bg-base-200 p-2"
        >
          <figure>
            <div className="skeleton mask w-full md:w-40 h-28 md:h-20 rounded-xl"></div>
          </figure>
          <div className="card-body">
            <h2 className="text-lg lg:text-xl font-semibold tracking-wide skeleton text-transparent">
              * ***** ** ******* *** ***** ** *****
            </h2>
          </div>
        </div>
        <div
          className="card md:card-side bg-base-100 shadow-xl border border-base-200
        hover:bg-base-200 p-2"
        >
          <figure>
            <div className="skeleton mask w-full md:w-40 h-28 md:h-20 rounded-xl"></div>
          </figure>
          <div className="card-body">
            <h2 className="text-lg lg:text-xl font-semibold tracking-wide skeleton text-transparent">
              * ***** ** ******* *** ***** ** *****
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
export const ProfileCardSkelton = () => {
  return (
    <>
      <figure className="px-10 pt-10 md:px-4 md:pt-0 xl:px-10 xl:pt-10 ">
        <div className=" h-32 w-36 xl:w-64 xl:h-64 mask mask-squircle skeleton"></div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="skeleton h-5 w-50 sm:w-64 rounded-md"></h2>
        <div className="opacity-50 skeleton h-3 w-50 sm:w-56"></div>
        <p className="skeleton h-3 w-44 sm:w-60 rounded-md"></p>
        <p className="skeleton h-3 w-50 sm:w-64 rounded-md"></p>
        <p className="skeleton h-3 w-48 sm:w-56 rounded-md"></p>
        <p></p>
      </div>
    </>
  );
};
export const CounterCardSkelton = () => {
  return (
    <>
      <div className="w-full">
        <div className="card w-full bg-base-100">
          <div className="card-body items-center text-center">
            <div className="skeleton h-9 w-8 rounded-md"></div>
            <div className="skeleton h-6 w-14 sm:w-20"></div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="card w-full  bg-base-100">
          <div className="card-body items-center text-center">
            <div className="skeleton h-9 w-8 rounded-md"></div>
            <div className="skeleton h-6 w-14 sm:w-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};
