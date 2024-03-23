"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Loader from "./ui/Loader";
import * as z from "zod";
import ProfileFormSkelton from "./ui/ProfileFormSkelton";
import { FaRegEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";

const ErrorMessage = ({
  text,
  classes,
}: {
  text: string;
  classes?: string;
}) => {
  return <p className={`text-sm text-red-500 ${classes}`}>{text}</p>;
};

const ProfileForm = () => {
  const { data: userData } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    fullName: "",
    about: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const userSchema = z.object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "maximum 20 characters only"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    fullName: z.string(),
    image: z.string(),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
  };

  return (
    <div className="relative xl:p-1">
      <div className="absolute top-0 right-0">
        <div
          className="tooltip tooltip-bottom cursor-pointer"
          data-tip="Edit profile"
        >
          <FaRegEdit
            className="w-6 h-6 xl:w-7 xl:h-7"
            onClick={() => setEditMode(!editMode)}
          />
        </div>
      </div>
      <p className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
        Hello {userData?.user.username} 👋
      </p>
      {isLoading ? (
        <ProfileFormSkelton />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full ">
              <div className="">
                <div className="grid grid-cols-2 grid-rows-2 xl:gap-4">
                  <div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Username
                      </label>
                      <input
                        placeholder="JohnDoe"
                        className="border sm:text-sm rounded-lg block w-full p-2.5 "
                        id="username"
                        name="username"
                        type="text"
                        disabled={editMode ? false : true}
                      />
                      {validationErrors.username != "" && (
                        <ErrorMessage text={validationErrors.username} />
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Email
                      </label>
                      <input
                        placeholder="doe@gmail.com"
                        className="border sm:text-sm rounded-lg block w-full p-2.5 "
                        id="email"
                        name="email"
                        type="email"
                        disabled={editMode ? false : true}
                      />
                      {validationErrors.email != "" && (
                        <ErrorMessage text={validationErrors.email} />
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        placeholder="John Doe"
                        className="border sm:text-sm rounded-lg block w-full p-2.5 "
                        id="fullName"
                        name="fullName"
                        type="text"
                        disabled={editMode ? false : true}
                      />
                      {validationErrors.fullName != "" && (
                        <ErrorMessage text={validationErrors.fullName} />
                      )}
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        About
                      </label>
                      <input
                        placeholder="JohnDoe"
                        className="border sm:text-sm rounded-lg block w-full p-2.5 "
                        id="about"
                        name="about"
                        type="textarea"
                        disabled={editMode ? false : true}
                      />
                      {validationErrors.about != "" && (
                        <ErrorMessage text={validationErrors.about} />
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Profile
                      </label>
                      <input
                        type="file"
                        className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                        disabled={editMode ? false : true}
                      />
                      {validationErrors.image != "" && (
                        <ErrorMessage text={validationErrors.image} />
                      )}
                    </div>
                  </div>
                </div>
                {editMode && (
                  <div className="w-full">
                    {submitLoading ? (
                      <Loader />
                    ) : (
                      <button
                        className="w-full bg-base-200 hover:bg-base-300 focus:ring-4 focus:outline-none
                         focus:ring-base-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-base-600 "
                        type="submit"
                      >
                        Submit
                      </button>
                    )}
                    {error && (
                      <ErrorMessage text={error} classes="text-center" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;
