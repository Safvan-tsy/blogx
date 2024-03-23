import React from "react";

const Button = ({ text }: { text: string }) => {
  return (
    <button
      className="w-full bg-base-200 hover:bg-base-300 focus:ring-4 focus:outline-none focus:ring-base-300
font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-base-600 "
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
