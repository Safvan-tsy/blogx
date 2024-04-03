"use client";
import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Pagination from "./ui/Pagination";

const BlogListView = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
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
      setPosts(data.posts);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col gap-3">
      {posts.map((item, index) => (
        <div
          key={item.id}
          className={`card ${
            index !== 0 ? "md:card-side" : ""
          }  bg-base-100 shadow-xl border border-base-200 hover:bg-base-200 p-2 cursor-pointer`}
        >
          <figure>
            <img
              src={item.image ? item.image : ""}
              alt="Cover"
              className={`mask object-cover object-center w-full rounded-xl
              ${index == 0 ? "md:w-full h-80" : "md:w-40 h-28 md:h-20 "}`}
            />
          </figure>
          <div className="card-body">
            <h2 className="text-lg lg:text-xl font-semibold tracking-wide">
              {item.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogListView;
