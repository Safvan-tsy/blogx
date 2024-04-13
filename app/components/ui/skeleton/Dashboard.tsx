import React from 'react';

interface BlogListSkeletonProps {
  numberOfRows: number;
}

export const BlogListSkeleton: React.FC<BlogListSkeletonProps> = ({ numberOfRows }) => {
  const generateSkeletonRow = () => (
    <tr key={Math.random()}>
      <th>
        <label>
          <div className="skeleton h-4 w-4"></div>
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="skeleton h-6 w-[12rem]"></div>
          </div>
        </div>
      </td>
      <td>
        <div className="skeleton h-16 w-36"></div>
      </td>
      <td>
        <div className="skeleton h-6 w-32"></div>
      </td>
      <th>
        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="skeleton h-6 w-6"></div>
          <div className="skeleton h-6 w-6"></div>
        </div>
      </th>
    </tr>
  );

  // Generating multiple skeleton rows
  const skeletonRows = Array.from({ length: numberOfRows }, () => generateSkeletonRow());

  return (
    <div className="mt-3 overflow-x-auto">
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
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 ">
        <div className="w-full ">
          <div className="">
            <div className="grid grid-cols-1 grid-rows-1 xl:gap-4">
              <div className="p-2">
                <div className="skeleton mb-2 block h-9 w-[50%]"></div>
                <div className="skeleton flex h-24 w-[25%] flex-row flex-wrap gap-2 p-2.5 lg:flex-col"></div>
              </div>
              <div className="p-2">
                <div className="skeleton mb-2 block h-9 w-full rounded-lg p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="skeleton mb-2 block h-[25rem] w-full rounded-lg p-2.5"></div>
              </div>
            </div>
            <div className="mt-4 w-full pt-2 md:mt-1 lg:mt-4">
              <div className="skeleton mb-2 block h-9 w-full rounded-lg p-2.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileFormSkeleton = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 ">
      <div className="h-full w-full">
        <div className="">
          <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 xl:gap-4">
            <div>
              <div className="p-2">
                <div className="skeleton mb-2 block h-9 w-full rounded-lg p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="skeleton mb-2 block h-9 w-full rounded-lg p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="skeleton mb-2 block h-32 w-full rounded-lg p-2.5"></div>
              </div>
            </div>
            <div>
              <div className="p-2">
                <div className="skeleton mb-2 block h-9 w-full rounded-lg p-2.5"></div>
              </div>
              <div className="p-2">
                <div className="flex flex-row flex-wrap items-center gap-2 md:justify-between lg:flex-col lg:items-start">
                  <div className="skeleton h-32 w-40"></div>
                  <div className="file-input skeleton h-9 w-full max-w-xs"></div>
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
          className="card border border-base-200 bg-base-100 p-2 shadow-xl
        md:card-side hover:bg-base-200"
        >
          <figure>
            <div className="mask skeleton h-28 w-full rounded-xl md:h-20 md:w-40"></div>
          </figure>
          <div className="card-body">
            <h2 className="skeleton text-lg font-semibold tracking-wide text-transparent lg:text-xl">
              * ***** ** ******* *** ***** ** *****
            </h2>
          </div>
        </div>
        <div
          className="card border border-base-200 bg-base-100 p-2 shadow-xl
        md:card-side hover:bg-base-200"
        >
          <figure>
            <div className="mask skeleton h-28 w-full rounded-xl md:h-20 md:w-40"></div>
          </figure>
          <div className="card-body">
            <h2 className="skeleton text-lg font-semibold tracking-wide text-transparent lg:text-xl">
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
        <div className=" mask mask-squircle skeleton h-32 w-36 xl:h-64 xl:w-64"></div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="w-50 skeleton h-5 rounded-md sm:w-64"></h2>
        <div className="w-50 skeleton h-3 opacity-50 sm:w-56"></div>
        <p className="skeleton h-3 w-44 rounded-md sm:w-60"></p>
        <p className="w-50 skeleton h-3 rounded-md sm:w-64"></p>
        <p className="skeleton h-3 w-48 rounded-md sm:w-56"></p>
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
