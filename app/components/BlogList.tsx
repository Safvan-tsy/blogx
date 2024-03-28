"use client";
import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import Select from "./ui/Select";

const BlogList = () => {
  const selectProps = {
    title: "status",
    options: ["Draft", "Published"],
  };
  const selectOnChange = async (value: string) => {
    console.log(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center justify-center md:justify-between gap-3">
        <div>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full md:w-auto lg:w-[20rem] xl:w-[25rem]"
          />
        </div>
        <div className="grid grid-rows-1 grid-cols-2 items-center gap-2">
          <Select options={selectProps.options} onChange={selectOnChange} />
          <Link href="/admin/dashboard/new">
            <button className="btn w-full">
              <FaPlus /> New
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Cover</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">Use the IntersectionObserver API in React</div>
                    {/* /// label <div className="text-sm opacity-50">United States</div> /// */}
                  </div>
                </div>
              </td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <Image
                      src={logo}
                      alt="Blogs logo"
                      className="max-w-32 max-h-32"
                    />
                  </div>
                </div>
                {/* /// label /// <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Cover</th>
              <th>Status</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
