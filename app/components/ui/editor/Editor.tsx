"use client";
import React, { useEffect, useState } from "react";
import Tiptap from "./Tiptap";
import Loader from "../Loader";

const Editor = () => {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleContentChange = (text: any) => {
    setContent(text);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(content);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <div className="w-full ">
          <div className="">
            <div className="grid grid-cols-1 grid-rows-1 xl:gap-4">
                <div className="p-2">
                  <label className="block mb-2 text-sm font-medium">
                    Title
                  </label>
                  <input
                    className="border sm:text-sm rounded-lg block w-full p-2.5"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter post title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {/* {validationErrors.username != "" && (
                  <ErrorMessage text={validationErrors.username} />
                )} */}
                </div>
                <div className="p-2">
                <label className="block mb-2 text-sm font-medium">
                    Content
                  </label>
                  <Tiptap
                    content={content}
                    onChange={(newContent: string) =>
                      handleContentChange(newContent)
                    }
                  />
                </div>
            </div>

            <div className="w-full mt-4 pt-2 md:mt-1 lg:mt-4">
              {submitLoading ? (
                <Loader />
              ) : (
                <button
                  className="w-full bg-base-100 hover:bg-base-300 focus:ring-4 focus:outline-none
                         focus:ring-base-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-base-600 "
                  type="submit"
                >
                  Submit
                </button>
              )}
              {/* {error && (
                      <ErrorMessage text={error} classes="text-center" />
                    )} */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Editor;
