"use client";
import React, { useState } from "react";
import { FormEvent } from "react";
import * as z from "zod";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginCard = () => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userSchema = z.object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "maximum 20 characters only"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must have than 6 characters"),
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const validated = userSchema.parse(formData);
      setValidationErrors({
        username: "",
        password: "",
      });
    } catch (error: any) {
      const validationErrorMessages: Record<string, string> = {};
      (error.errors || []).forEach((err: any) => {
        validationErrorMessages[err.path[0]] = err.message;
      });
      setValidationErrors({
        username: validationErrorMessages["username"] || "",
        password: validationErrorMessages["password"] || "",
      });
      return;
    }

    try {
      setIsLoading(true);
      const signInData = await signIn("credentials", {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
        redirect: false,
      });
      if (signInData?.error) {
        setError("Incorrect username or password");
        setIsLoading(false);
      } else {
        router.refresh();
        router.push("/admin");
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
                Login to your account
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Your username
                </label>
                <input
                  placeholder="JohnDoe"
                  className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                   text-gray-900 dark:text-gray-100 sm:text-sm rounded-lg block w-full p-2.5"
                  name="username"
                  id="username"
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
                  Password
                </label>
                <input
                  className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                   text-gray-900 dark:text-gray-100 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  name="password"
                  id="password"
                  type="password"
                />
                {validationErrors.password != "" && (
                  <p className="text-sm text-red-600">
                    {validationErrors.password}
                  </p>
                )}
              </div>
              {/* <div className="flex items-start">
            <div className="flex items-center h-5">
              <input className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" type="checkbox" aria-describedby="terms" id="terms">
            </div>
            <div className="ml-3 text-sm">
              <label className="font-light text-gray-500 text-gray-300">
                I accept the
                <a href="#" className="font-medium text-primary-600 hover:underline text-primary-500">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div> */}
              <div className="w-full">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    className="w-full bg-blue-500 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 dark:focus:ring-blue-300 text-white"
                    type="submit"
                  >
                    Login
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

export default LoginCard;
