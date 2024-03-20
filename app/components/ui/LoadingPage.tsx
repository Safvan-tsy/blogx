import React from "react";
import Loader from "./Loader";

const LoadingPage = () => {
  return (
    <div className="flex justify-center flex-wrap items-center min-h-screen">
      <Loader />
    </div>
  );
};

export default LoadingPage;
