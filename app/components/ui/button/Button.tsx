import React from 'react';

const Button = ({ text }: { text: string }) => {
  return (
    <button
      className="focus:ring-base-600 w-full rounded-lg bg-base-200 px-5 py-2.5
text-center text-sm font-medium hover:bg-base-300 focus:outline-none focus:ring-4 focus:ring-base-300 "
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
