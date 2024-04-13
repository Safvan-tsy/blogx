import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="h-6 w-6 animate-bounce rounded-full bg-blue-700"></div>
      <div className="h-6 w-6 animate-bounce rounded-full bg-blue-700 [animation-delay:-.3s]"></div>
      <div className="h-6 w-6 animate-bounce rounded-full bg-blue-700 [animation-delay:-.5s]"></div>
    </div>
  );
};

export default Loader;
