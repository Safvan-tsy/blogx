"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBloggerB, FaCubes, FaHouseUser, FaUserCog } from "react-icons/fa";
import SignOutButton from "../button/SignOutButton";

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <ul
      className="menu p-4 w-60 min-h-full bg-base-200 text-base-content list-none 
    flex flex-col gap-3 md:text-md lg:text-lg lg:pt-8"
    >
      <li>
        <Link
          className={`link ${
            pathname === "/admin/dashboard" ? "bg-base-300" : ""
          } no-underline`}
          href="/admin/dashboard"
        >
          <FaCubes /> Home
        </Link>
      </li>
      <li>
        <Link
          className={`link ${
            pathname === "/admin/dashboard/blogs" ? "bg-base-300" : ""
          } no-underline`}
          href="/admin/blogs"
        >
          <FaBloggerB /> Blogs
        </Link>
      </li>
      <li>
        <Link
          className={`link ${
            pathname === "/admin/dashboard/settings" ? "bg-base-300" : ""
          } no-underline active:bg-base-300`}
          href="/admin/dashboard/settings"
        >
          <FaUserCog />
          Settings
        </Link>
      </li>
      <li>
        <Link
          className={`link ${
            pathname === "/admin/dashboard/profile" ? "bg-base-300" : ""
          } no-underline active:bg-base-300`}
          href="/admin/dashboard/profile"
        >
          <FaHouseUser />
          My Profile
        </Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
};

export const Swap = () => {
  return (
    <label
      htmlFor="my-drawer-2"
      className=" w-9 h-9 swap swap-rotate lg:hidden"
    >
      <input type="checkbox" />
      <svg
        className="swap-off fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 512 512"
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>
      <svg
        className="swap-on fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 512 512"
      >
        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
      </svg>
    </label>
  );
};
export default AdminNav;
