'use client';
import { signOut } from 'next-auth/react';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const SignOutButton = () => {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
      className="w-full rounded-lg text-sm focus:outline-none focus:ring-4  lg:text-lg"
      type="submit"
    >
      <FaSignOutAlt /> Sign out
    </button>
  );
};

export default SignOutButton;
