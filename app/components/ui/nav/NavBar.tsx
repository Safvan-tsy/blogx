import ThemeSwitch from "../../ThemeSwitch";
import Search from "../Search";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { GotoIcon } from "./GoToIcon";

const NavBar = async () => {
  return (
    <div className="navbar bg-base-200 xl:px-16">
      <div className="flex-1">
        <Link href="/">
          <Image src={logo} alt="Blogs logo" className="max-w-32 max-h-32" />
        </Link>
      </div>
      <div className="flex-none gap-1 md:gap-2">
        <div className="form-control hidden md:block">
          <Search />
        </div>
        <div className="">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-8">
              <ThemeSwitch />
            </div>
          </div>
        </div>
        <GotoIcon />
        <div className="md:hidden dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-8">
              <FaSearch className="w-full h-full" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-[19rem] sm:22rem"
          >
            <li>
              <div className="form-control md:hidden">
                <Search />
              </div>
            </li>
          </ul>
        </div>
        {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
