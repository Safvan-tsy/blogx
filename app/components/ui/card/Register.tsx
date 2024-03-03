"use client";
import React from "react";
import { FormEvent } from "react";

const RegisterCard = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/admin/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
      }),
    });
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
              </div>
              <button
                className="w-full bg-blue-500 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 dark:focus:ring-blue-300 text-white"
                type="submit"
              >
                Let&apos;s start Blogging
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;
