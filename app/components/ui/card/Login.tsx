'use client';
import React, { useState } from 'react';
import { FormEvent } from 'react';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Loader from '../Loader';

const LoginCard = () => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userSchema = z.object({
    username: z.string().min(1, 'Username is required').max(20, 'maximum 20 characters only'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must have than 6 characters'),
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const validated = userSchema.parse(formData);
      setValidationErrors({
        username: '',
        password: '',
      });
    } catch (error: any) {
      const validationErrorMessages: Record<string, string> = {};
      (error.errors || []).forEach((err: any) => {
        validationErrorMessages[err.path[0]] = err.message;
      });
      setValidationErrors({
        username: validationErrorMessages['username'] || '',
        password: validationErrorMessages['password'] || '',
      });
      return;
    }

    try {
      setIsLoading(true);
      const signInData = await signIn('credentials', {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
        redirect: false,
      });
      if (signInData?.error) {
        setError('Incorrect username or password');
        setIsLoading(false);
      } else {
        router.refresh();
        router.push('/admin/dashboard');
      }
      setIsLoading(false);
    } catch (error: any) {
      setError('something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
          <div className="w-full  rounded-lg sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <p className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Login to your account
              </p>
              <div>
                <label className="mb-2 block text-sm font-medium ">Your username</label>
                <input
                  placeholder="JohnDoe"
                  className=" block w-full rounded-lg border p-2.5 sm:text-sm"
                  name="username"
                  id="username"
                  type="text"
                />
                {validationErrors.username != '' && (
                  <p className="text-sm text-red-600">{validationErrors.username}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium ">Password</label>
                <input
                  className=" block w-full rounded-lg border p-2.5 sm:text-sm"
                  placeholder="••••••••"
                  name="password"
                  id="password"
                  type="password"
                />
                {validationErrors.password != '' && (
                  <p className="text-sm text-red-600">{validationErrors.password}</p>
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
                    className="focus:ring-base-600 w-full rounded-lg bg-base-200 px-5 py-2.5
                    text-center text-sm font-medium hover:bg-base-300 focus:outline-none focus:ring-4 focus:ring-base-300 "
                    type="submit"
                  >
                    Login
                  </button>
                )}
                {error && <p className="text-center text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
