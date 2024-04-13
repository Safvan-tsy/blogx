'use client';
import React, { useState } from 'react';
import { FormEvent } from 'react';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Loader from '../Loader';

const RegisterCard = () => {
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userSchema = z
    .object({
      username: z.string().min(1, 'Username is required').max(20, 'maximum 20 characters only'),
      email: z.string().min(1, 'Email is required').email('Invalid email'),
      password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password should have than 6 characters'),
      confirmPassword: z.string().min(1, 'This field is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget.confirmPassword.value,
    };

    try {
      const validated = userSchema.parse(formData);
      setValidationErrors({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      const validationErrorMessages: Record<string, string> = {};
      (error.errors || []).forEach((err: any) => {
        validationErrorMessages[err.path[0]] = err.message;
      });
      setValidationErrors({
        username: validationErrorMessages['username'] || '',
        email: validationErrorMessages['email'] || '',
        password: validationErrorMessages['password'] || '',
        confirmPassword: validationErrorMessages['confirmPassword'] || '',
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = JSON.stringify(formData);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers,
        body: data,
      });
      if (response.ok) {
        const signInData = await signIn('credentials', {
          username: formData.username,
          password: formData.password,
        });
        if (signInData?.error) {
          setError('Incorrect username or password');
          setIsLoading(false);
        } else {
          router.refresh();
          router.push('/admin/dashboard');
        }
      } else {
        const responseData = await response.json();
        setError(responseData.message);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setError('something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
          <div className="w-full sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <p className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                Create your account
              </p>
              <div>
                <label className="mb-2 block text-sm font-medium">username</label>
                <input
                  placeholder="JohnDoe"
                  className="block w-full rounded-lg border p-2.5 sm:text-sm "
                  id="username"
                  name="username"
                  type="text"
                />
                {validationErrors.username != '' && (
                  <p className="text-sm text-red-600">{validationErrors.username}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium  ">Email</label>
                <input
                  placeholder="johndoe@gmail.com"
                  className="block w-full
                    rounded-lg border border-base-300 p-2.5 sm:text-sm"
                  id="email"
                  type="email"
                  name="email"
                />
                {validationErrors.email != '' && (
                  <p className="text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium ">Password</label>
                <input
                  className=" block w-full rounded-lg border-base-300 p-2.5 sm:text-sm"
                  placeholder="••••••••"
                  id="password"
                  type="password"
                  name="password"
                />
                {validationErrors.password != '' && (
                  <p className="text-sm text-red-600">{validationErrors.password}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium ">Confirm Password</label>
                <input
                  className="bg-base-50 block w-full rounded-lg border border-base-300 p-2.5 sm:text-sm"
                  placeholder="••••••••"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                />
                {validationErrors.confirmPassword != '' && (
                  <p className="text-sm text-red-600">{validationErrors.confirmPassword}</p>
                )}
              </div>
              <div className="w-full">
                {isLoading ? (
                  <Loader />
                ) : (
                  <button
                    className="focus:ring-base-600 w-full rounded-lg bg-base-200 px-5 py-2.5
                text-center text-sm font-medium hover:bg-base-300 focus:outline-none focus:ring-4 focus:ring-base-300 "
                    type="submit"
                  >
                    Let&apos;s start Blogging
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

export default RegisterCard;
