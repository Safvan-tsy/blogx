"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Select from "./ui/Select";
import BlogListSkeleton from "./ui/skeleton/BlogListSkeleton";
import { useSession } from "next-auth/react";
import Pagination from "./ui/Pagination";
import { Post } from "@prisma/client";
import AlertModal from "./ui/modal/AlertModal";

const BlogList: React.FC = () => {
  const { data: userData } = useSession();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Array<any>>([]);
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
    status?: string;
  }>({
    page: 1,
    limit: 5,
  });

  const selectProps = {
    title: "status",
    options: ["Draft", "Published"],
  };

  const fetchData = async () => {
    try {
      const headers = new Headers();
      headers.append("Authorization", userData?.user.username || "");
      const queryString = new URLSearchParams({
        page: query.page.toString(),
        limit: query.limit.toString(),
        status: query.status || "",
      }).toString(); // Serialize query object to query string

      const response = await fetch(`/api/admin/post?${queryString}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
    console.log(value);
    setIsLoading(true);
    setQuery({
      page: query.page,
      limit: query.limit,
      status:
        value == "Draft" ? "draft" : value == "Published" ? "published" : "",
    });
    fetchData();
  };

  const pageOnChange = async (page: number) => {
    setIsLoading(true);
    setQuery({ page: page, limit: query.limit });
    fetchData();
    console.log(page);
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
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full md:w-auto lg:w-[20rem] xl:w-[25rem]"
          />
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
              {posts.map((item: Post) => (
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
                      <div className="btn text-success">Published</div>
                    )}
                  </td>
                  <th>
                    <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                      <button className="btn btn-sm">
                        <FaEdit />
                      </button>
                      <AlertModal
                        text="Are you sure to delete this Post"
                        onYes={() => onDelete(item.id)}
                      />
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
