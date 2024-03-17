"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
      className="w-full bg-red-500 dark:bg-red-800 hover:bg-red-700 dark:hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-red-800 dark:focus:ring-red-300 text-white"
      type="submit"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
