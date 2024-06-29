'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center bg-white p-5">
      <div className="text-center">
        <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">Server error</h1>
        <p className="mt-5 text-slate-600 lg:text-lg">
          {process.env.NODE_ENV === 'production' ? 'Oops! something went wrong' : error.message}
        </p>
        <p className="mt-5 text-slate-600 lg:text-lg">
          Try to refresh this page or <br /> feel free to contact us if the problem presists.
        </p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="mt-5 rounded-lg border border-slate-800 bg-white px-4 py-2 text-base font-bold text-slate-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
