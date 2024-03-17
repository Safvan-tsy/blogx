"use client";
import React, { useState } from "react";
import { FormEvent } from "react";
import * as z from "zod";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterCard = () => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userSchema = z
    .object({
      username: z
        .string()
        .min(1, "Username is required")
        .max(20, "maximum 20 characters only"),
      email: z.string().min(1, "Email is required").email("Invalid email"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must have than 6 characters"),
      confirmPassword: z.string().min(1, "This field is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget.confirmPassword.value,
    };

    try {
      const validated = userSchema.parse(formData);
      setValidationErrors({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      const validationErrorMessages: Record<string, string> = {};
      (error.errors || []).forEach((err: any) => {
        validationErrorMessages[err.path[0]] = err.message;
      });
      setValidationErrors({
        username: validationErrorMessages["username"] || "",
        email: validationErrorMessages["email"] || "",
        password: validationErrorMessages["password"] || "",
        confirmPassword: validationErrorMessages["confirmPassword"] || "",
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = JSON.stringify(formData);
      const key = process.env.NEXT_PUBLIC_APP_KEY;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("app-key", key || "");

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: headers,
        body: data,
      });
      if (response.ok) {
        const signInData = await signIn("credentials", {
          username: e.currentTarget.username.value,
          password: e.currentTarget.password.value,
        });
        if (signInData?.error) {
          setError("Incorrect username or password");
          setIsLoading(false);
        } else {
          router.refresh();
          router.push("/admin");
        }
      } else {
        const responseData = await response.json();
        setError(responseData.message);
      }
      setIsLoading(false);
    } catch (error: any) {
      setError("something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div
            className="w-full bg-white dark:bg-inherit rounded-lg shadow border border-gray-300
           dark:border-gray-700 md:mt-0 sm:max-w-md xl:p-0"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-100">
                Create your account
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  username
                </label>
                <input
                  placeholder="JohnDoe"
                  className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                   text-gray-900 dark:text-gray-100 sm:text-sm rounded-lg block w-full p-2.5"
                  id="username"
                  name="username"
                  type="text"
                />
                {validationErrors.username != "" && (
                  <p className="text-sm text-red-600">
                    {validationErrors.username}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Email
                </label>
                <input
                  placeholder="johndoe@gmail.com"
                  className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                   text-gray-900 dark:text-gray-100 sm:text-sm rounded-lg block w-full p-2.5"
                  id="email"
                  type="email"
                  name="email"
                />
                {validationErrors.email != "" && (
                  <p className="text-sm text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Password
                </label>
                <input
                  className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                   text-gray-900 dark:text-gray-100 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="password"
                  type="password"
                  name="password"
                />
                {validationErrors.password != "" && (
                  <p className="text-sm text-red-600">
                    {validationErrors.password}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Confirm Password
                </label>
                <input
                  className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                   text-gray-900 dark:text-gray-100 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                />
                {validationErrors.confirmPassword != "" && (
                  <p className="text-sm text-red-600">
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="w-full">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    className="w-full bg-blue-500 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 dark:focus:ring-blue-300 text-white"
                    type="submit"
                  >
                    Let&apos;s start Blogging
                  </button>
                )}
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;
