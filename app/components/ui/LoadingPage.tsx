import React from 'react';
import Loader from './Loader';

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen flex-wrap items-center justify-center">
      <Loader />
    </div>
  );
};

export default LoadingPage;
