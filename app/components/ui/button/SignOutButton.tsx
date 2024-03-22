"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const SignOutButton = () => {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
      className="w-full focus:ring-4 focus:outline-none rounded-lg text-sm  lg:text-lg"
      type="submit"
    >
      <FaSignOutAlt /> Sign out
    </button>
  );
};

export default SignOutButton;
