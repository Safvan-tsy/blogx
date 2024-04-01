"use client";
import React from "react";

const LatestBlogsCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 bg-base-100 rounded-xl p-3 lg:p-4">
      <h2 className="card-title">Latest Blogs</h2>
      <div className="flex flex-col gap-2 lg:gap-4 lg:py-5">
        <div className="card md:card-side bg-base-100 shadow-xl border border-base-200
        hover:bg-base-200 p-2">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="Cover"
              className="mask object-cover object-center w-full md:w-40 h-28 md:h-20 rounded-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-lg lg:text-xl font-semibold tracking-wide">
            A Guide to Building CLI Tools in JavaScript
            </h2>
          </div>
        </div>
        <div className="card md:card-side bg-base-100 shadow-xl border border-base-200
        hover:bg-base-200 p-2">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="Cover"
              className="mask object-cover object-center w-full md:w-40 h-28 md:h-20 rounded-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-lg lg:text-xl font-semibold tracking-wide">
              2024 Mac Developer Toolbox: Essentials for Full-Stack Development
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogsCard;
