"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Loader from "./ui/Loader";
import * as z from "zod";
import ProfileFormSkeleton from "./ui/skeleton/ProfileFormSkeleton";
import { FaRegEdit } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import profilePic from "@/public/profile.jpg";

export const ErrorMessage = ({
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
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    fullName: "",
    about: "",
    image: "",
  });

  const fetchData = async () => {
    try {
      const headers = new Headers();
      headers.append("Authorization", userData?.user.username || "");

      const response = await fetch(`/api/admin`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      setEditMode(false);
      setUsername(data.user.username);
      setEmail(data.user.email);
      setAbout(data.user.about || "");
      setFullName(data.user.fullName || "");
      setImage(data.user.image || "");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (userData?.user) {
    fetchData();
    }
  }, [userData?.user]);

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
    const formData = {
      username: username,
      email: email,
      fullName: fullName,
      about: about,
      image: image,
    };
    try {
      const validated = userSchema.parse(formData);
      setValidationErrors({
        username: "",
        email: "",
        fullName: "",
        about: "",
        image: "",
      });
    } catch (error: any) {
      console.log(error);
      const validationErrorMessages: Record<string, string> = {};
      (error.errors || []).forEach((err: any) => {
        validationErrorMessages[err.path[0]] = err.message;
      });
      setValidationErrors({
        username: validationErrorMessages["username"] || "",
        email: validationErrorMessages["email"] || "",
        fullName: validationErrorMessages["fullName"] || "",
        about: validationErrorMessages["about"] || "",
        image: validationErrorMessages["image"] || "",
      });
      return;
    }

    try {
      setSubmitLoading(true);
      const data = JSON.stringify(formData);
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", userData?.user.username || "");

      const response = await fetch(`/api/admin`, {
        method: "PUT",
        headers: headers,
        body: data,
      });
      if (response.ok) {
        const data = await response.json();
        if (data.isUsernameChange == true) {
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
          });
        }
      } else {
        const responseData = await response.json();
        setError(responseData.message);
      }
      setSubmitLoading(false);
      fetchData();
    } catch (error: any) {
      console.log(error);
      setError("something went wrong");
      setSubmitLoading(false);
    }
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
      <p className="text-xl font-bold leading-tight tracking-tight md:text-2xl flex justify-center">
        Hello {userData?.user.username} 👋
      </p>
      {isLoading ? (
        <ProfileFormSkeleton />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
            <div className="w-full ">
              <div className="">
                <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 xl:gap-4">
                  <div>
                    <div className="p-2">
                      <label className="block mb-2 text-sm font-medium">
                        Username
                      </label>
                      <input
                        className="border sm:text-sm rounded-lg block w-full p-2.5 "
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        disabled={editMode ? false : true}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {validationErrors.username != "" && (
                        <ErrorMessage text={validationErrors.username} />
                      )}
                    </div>
                    <div className="p-2">
                      <label className="block mb-2 text-sm font-medium">
                        Email
                      </label>
                      <input
                        className="border sm:text-sm rounded-lg block w-full p-2.5 "
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        disabled={editMode ? false : true}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {validationErrors.email != "" && (
                        <ErrorMessage text={validationErrors.email} />
                      )}
                    </div>
                    <div className="p-2 ">
                      <label className="block mb-2 text-sm font-medium">
                        About
                      </label>
                      <textarea
                        className="border sm:text-sm rounded-lg block w-full p-2.5 h-32"
                        id="about"
                        name="about"
                        value={about}
                        disabled={editMode ? false : true}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                      {validationErrors.about != "" && (
                        <ErrorMessage text={validationErrors.about} />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="p-2">
                      <label className="block mb-2 text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        className="border sm:text-sm rounded-lg block w-full p-2.5 "
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={fullName}
                        disabled={editMode ? false : true}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      {validationErrors.fullName != "" && (
                        <ErrorMessage text={validationErrors.fullName} />
                      )}
                    </div>
                    <div className="p-2">
                      <label className="block mb-2 text-sm font-medium">
                        Profile
                      </label>
                      <div className="flex flex-row flex-wrap lg:flex-col items-center gap-2 md:justify-between lg:items-start">
                        <div className="w-64 carousel rounded-badge">
                          <div
                            className="carousel-item hover:-translate-y-2 group bg-neutral-50 duration-500 
                            h-fit w-fit flex text-neutral-600 flex-col justify-center items-center relative 
                          rounded-xl overflow-hidden shadow-md lg:mt-0 md:h-fit md:w-fit lg:w-fit lg:h-fit"
                          >
                            {image? (
                              <img
                                src={image}
                                alt="profile pic"
                                className="w-full object-cover "
                              />
                            ) : (
                              <Image
                                src={profilePic}
                                alt="profile pic"
                                className="w-full object-cover "
                              />
                            )}
                          </div>
                        </div>
                        {editMode && (
                          <input
                            type="text"
                            name="image"
                            value={image}
                            placeholder="paste image link here"
                            className="border sm:text-sm rounded-lg block w-full p-2.5 max-w-xs"
                            disabled={editMode ? false : true}
                            onChange={(e) => setImage(e.target.value)}
                          />
                        )}
                      </div>
                      {validationErrors.image != "" && (
                        <ErrorMessage text={validationErrors.image} />
                      )}
                    </div>
                  </div>
                </div>
                {editMode && (
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
