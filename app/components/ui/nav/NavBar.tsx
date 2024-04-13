import Image from 'next/image';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import logo from '@/public/logo.png';
import ThemeSwitch from '../../ThemeSwitch';
import Search from '../Search';
import { GotoIcon } from './GoToIcon';

const NavBar = async () => {
  return (
    <div className="navbar bg-base-200 xl:px-16">
      <div className="flex-1">
        <Link href="/">
          <Image src={logo} alt="Blogs logo" className="max-h-32 max-w-32" />
        </Link>
      </div>
      <div className="flex-none gap-1 md:gap-2">
        <div className="form-control hidden md:block">
          <Search />
        </div>
        <div className="">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="w-8">
              <ThemeSwitch />
            </div>
          </div>
        </div>
        <GotoIcon />
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="w-8">
              <FaSearch className="h-full w-full" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="sm:22rem menu dropdown-content menu-sm z-[1] mt-3 w-[19rem] rounded-box bg-base-200 p-2 shadow"
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
