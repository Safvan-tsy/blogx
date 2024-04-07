"use client";
import React, { useEffect, useState } from "react";
import { LatestBlogSkelton } from "../../components/ui/skeleton/Dashboard";
import { useSession } from "next-auth/react";
import { Post } from "@prisma/client";

const LatestBlogsCard: React.FC = () => {
  const { data: userData } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [post, setPost] = useState<Post[]>();

  const fetchData = async () => {
    try {
      const headers = new Headers();
      headers.append("Authorization", userData?.user.username || "");
      const queryString = new URLSearchParams({
        page: "1",
        limit: "2",
        status: "published",
      }).toString();

      const response = await fetch(`/api/admin/post?${queryString}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      setPost(data.posts);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (userData?.user) fetchData();
  }, [userData?.user]);

  return (
    <div className="flex flex-col gap-2 bg-base-100 rounded-xl p-3 lg:p-4">
      {isLoading ? (
        <LatestBlogSkelton />
      ) : (
        <>
          <h2 className="card-title">Latest Blogs</h2>
          <div className="flex flex-col gap-2 lg:gap-4 lg:py-5">
            {post?.map((item) => (
              <div
                key={item.id}
                className="card md:card-side bg-base-100 shadow-xl border border-base-200
                    hover:bg-base-200 p-2"
              >
                <figure>
                  <img
                    src={item.image ? item.image : ""}
                    alt="Cover"
                    className="mask object-cover object-center w-full md:w-40 h-28 md:h-20 rounded-xl"
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
        </>
      )}
    </div>
  );
};

export default LatestBlogsCard;
