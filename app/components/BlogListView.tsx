"use client";
import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Pagination from "./ui/Pagination";
import { BlogListViewSkelton } from "./ui/skeleton/Home";
import Link from "next/link";

const BlogListView = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 5,
  });

  const fetchData = async () => {
    try {
      const headers = new Headers();
      const queryString = new URLSearchParams({
        page: query.page.toString(),
        limit: query.limit.toString(),
        status: "published",
      }).toString();

      const response = await fetch(`/api/post?${queryString}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      const postsWithDate = data.posts.map((post: Post) => ({
        ...post,
        updatedAt: new Date(post.updatedAt),
      }));

      setPosts(postsWithDate);
      setTotalPage(data.totalPage);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const pageOnChange = async (page: number) => {
    setIsLoading(true);
    setQuery((prevQuery) => ({
      ...prevQuery,
      page,
    }));
  };

  // Function to calculate the time difference between two dates
  const calculateTimeDifference = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <BlogListViewSkelton />
      ) : (
        <>
          {posts.map((item, index) => (
            <Link key={item.id} href={`/blog/${item.id}`}>
              <div
                className={`card ${
                  index !== 0 ? "md:card-side" : ""
                }  bg-base-100 shadow-xl border border-base-200 hover:bg-base-200 p-2 cursor-pointer`}
              >
                <figure>
                  <img
                    src={item.image ? item.image : ""}
                    alt="Cover"
                    className={`mask object-cover object-center w-full rounded-xl
              ${
                index == 0 ? "md:w-full h-60 xl:h-80" : "md:w-40 h-28 md:h-20 "
              }`}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="text-lg lg:text-xl font-semibold tracking-wide">
                    {item.title}
                  </h2>
                  <div className="badge badge-md">
                    {item.updatedAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    ({calculateTimeDifference(item.updatedAt)})
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex justify-center p-2 m-1">
            <Pagination
              currentPage={query.page}
              onChange={pageOnChange}
              totalPage={totalPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BlogListView;
