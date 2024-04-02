"use client";
import React, { useState } from "react";
import { CounterCardSkelton } from "../skeleton/Dashboard";

const CountCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-between md:justify-center lg:justify-start gap-3 lg:gap-5">
      {isLoading ? (
        <CounterCardSkelton />
      ) : (
        <>
          <div className="w-full">
            <div className="card w-full  bg-base-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title">10</h2>
                <p>Blogs</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="card w-full  bg-base-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title">25</h2>
                <p>Views</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountCard;
