"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Select from "./ui/Select";
import { useSession } from "next-auth/react";
import Pagination from "./ui/Pagination";
import { Post } from "@prisma/client";
import AlertModal from "./ui/modal/AlertModal";
import { BlogListSkeleton } from "./ui/skeleton/Dashboard";

const BlogList: React.FC = () => {
  const { data: userData } = useSession();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Array<any>>([]);
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
    status?: string;
    keyword?: string;
  }>({
    page: 1,
    limit: 5,
  });

  const selectProps = {
    title: "status",
    options: ["Draft", "Published", "All"],
  };

  const fetchData = async () => {
    try {
      const headers = new Headers();
      headers.append("Authorization", userData?.user.username || "");
      const queryString = new URLSearchParams({
        page: query.page.toString(),
        limit: query.limit.toString(),
        status: query.status || "",
        keyword: query.keyword || "",
      }).toString();

      const response = await fetch(`/api/admin/post?${queryString}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [query]);

  const deleteData = async (id: number) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", userData?.user.username || "");

      const response = await fetch(`/api/admin/post/${id}`, {
        method: "DELETE",
        headers,
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong");
    }
  };

  const onDelete = async (id: number) => {
    setIsLoading(true);
    deleteData(id);
  };
  const selectOnChange = async (value: string) => {
    setIsLoading(true);
    if (value == "All") value = "";
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: value.toLowerCase(),
    }));
  };

  const pageOnChange = async (page: number) => {
    setIsLoading(true);
    setQuery((prevQuery) => ({
      ...prevQuery,
      page,
    }));
  };
  const searchOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value;
    // if (keyword == "") return;
    setIsLoading(true);
    setQuery((prevQuery) => ({
      ...prevQuery,
      keyword,
    }));
  };

  useEffect(() => {
    if (userData?.user) {
      fetchData();
    }
  }, [userData?.user]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center 
      justify-center md:justify-between gap-3"
      >
        <div>
          <form className="flex" onSubmit={searchOnSubmit}>
            <div className="input input-bordered flex items-center justify-between w-full">
              <input
                type="text"
                placeholder="Search"
                id="keyword"
                name="keyword"
                className=" md:w-auto lg:w-[20rem] xl:w-[25rem]"
              />
              <button type="submit" className="">
                <FaSearch className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-rows-1 grid-cols-2 items-center gap-2">
          <Select
            selected="All"
            options={selectProps.options}
            onChange={selectOnChange}
          />
          <Link href="/admin/dashboard/new">
            <button className="btn w-full">
              <FaPlus /> New
            </button>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <BlogListSkeleton numberOfRows={5} />
      ) : (
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
              {posts?.map((item: Post) => (
                <tr key={item.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold lg:text-lg">{item.title}</div>
                        {/* /// label <div className="text-sm opacity-50">United States</div> /// */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="w-36 h-16">
                        <img
                          src={item.image ? item.image : ""}
                          alt="Cover"
                          className="max-w-36 max-h-16"
                        />
                      </div>
                    </div>
                    {/* /// label /// <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
                  </td>
                  <td>
                    {item.status == "draft" ? (
                      <div className="btn btn-sm text-warning">Draft</div>
                    ) : (
                      <div className="btn btn-sm text-success">Published</div>
                    )}
                  </td>
                  <th>
                    <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip="Edit Post"
                      >
                        <Link
                          href={`/admin/dashboard/blogs/${item.id}`}
                          className="btn btn-sm"
                        >
                          <FaEdit />
                        </Link>
                      </div>

                      <div className="tooltip tooltip-bottom" data-tip="Delete">
                        <AlertModal
                          text="Are you sure to delete this Post"
                          onYes={() => onDelete(item.id)}
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              ))}
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
          <div className="flex justify-center p-2 m-1">
            <Pagination currentPage={query.page} onChange={pageOnChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
