'use client';
import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@/app/admin/components/ProfileForm';
import Tiptap from './Tiptap';
import Loader from '../ui/Loader';
import { EditorSkeleton } from '../ui/skeleton/Dashboard';
import Select from '../ui/Select';

const Editor = ({ id }: { id?: number }) => {
  const router = useRouter();
  const { data: userData } = useSession();
  const [content, setContent] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState({
    title: '',
    content: '',
    image: '',
  });

  const fetchData = async (id: number) => {
    try {
      setIsLoading(true);
      const headers = new Headers();
      const response = await fetch(`/api/post/${id}`, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      console.log(data);
      setTitle(data.post.title);
      setContent(data.post.content || '');
      setImage(data.post.image || '');
      setStatus(data.post.status || '');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const clearData = async () => {
    setIsLoading(true);
    setTitle('');
    setContent('');
    setImage('');
    setStatus('');

    setIsLoading(false);
  };
  const selectOnChange = (value: string) => {
    setStatus(value.toLowerCase());
  };
  const updatePost = async (
    id: number,
    formData: {
      id: number;
      status: string;
      title: string;
      content: string;
      image: string;
    },
  ) => {
    try {
      setSubmitLoading(true);
      const data = JSON.stringify(formData);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', userData?.user.username || '');

      const response = await fetch(`/api/admin/post`, {
        method: 'PUT',
        headers,
        body: data,
      });
      if (response.ok) {
        setSubmitLoading(false);
        clearData();
        router.push('/admin/dashboard/blogs');
      } else {
        const responseData = await response.json();
        setError(responseData.message);
      }
    } catch (error: any) {
      console.log(error);
      setError('something went wrong');
      setSubmitLoading(false);
    }
  };
  const createPost = async (formData: { title: string; content: string; image: string }) => {
    try {
      setSubmitLoading(true);
      const data = JSON.stringify(formData);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', userData?.user.username || '');

      const response = await fetch(`/api/admin/post`, {
        method: 'POST',
        headers,
        body: data,
      });
      if (response.ok) {
        setSubmitLoading(false);
        clearData();
        router.push('/admin/dashboard/blogs');
      } else {
        const responseData = await response.json();
        setError(responseData.message);
      }
    } catch (error: any) {
      setError('something went wrong');
      setSubmitLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const formSchema = z.object({
    title: z.string().min(1, 'title is required').max(100, 'maximum 100 characters only'),
    content: z.string().min(1, 'content is required'),
    image: z.string(),
  });

  const handleContentChange = (text: any) => {
    setContent(text);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      title,
      content,
      image,
    };
    try {
      const validated = formSchema.parse(formData);
      setValidationErrors({
        title: '',
        content: '',
        image: '',
      });
    } catch (error: any) {
      const validationErrorMessages: Record<string, string> = {};
      (error.errors || []).forEach((err: any) => {
        validationErrorMessages[err.path[0]] = err.message;
      });
      setValidationErrors({
        title: validationErrorMessages['title'] || '',
        content: validationErrorMessages['content'] || '',
        image: validationErrorMessages['image'] || '',
      });
      return;
    }

    if (id) {
      console.group(content);
      const data = { id, status, ...formData };
      await updatePost(id, data);
    } else {
      await createPost(formData);
    }
  };
  return (
    <div>
      {isLoading ? (
        <EditorSkeleton />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 ">
            <div className="w-full ">
              <div className="">
                <div className="grid grid-cols-1 grid-rows-1 xl:gap-4">
                  <div className="p-2">
                    <label className="mb-2 block text-sm font-medium">Cover photo</label>
                    <div className="flex flex-row flex-wrap items-center gap-2 md:justify-between lg:flex-col lg:items-start">
                      <div className="carousel w-64 ">
                        {image != '' && (
                          <div
                            className="group carousel-item relative flex h-fit 
                          w-fit flex-col items-center justify-center overflow-hidden bg-neutral-50 text-neutral-600 shadow-md 
                         duration-500 hover:-translate-y-2 md:h-fit md:w-fit lg:mt-0 lg:h-fit lg:w-fit"
                          >
                            <img src={image} alt="cover" className="w-full object-cover " />
                          </div>
                        )}
                      </div>

                      <input
                        type="text"
                        name="image"
                        value={image}
                        placeholder="paste image link here"
                        className="block w-full max-w-xs rounded-lg p-2.5 outline-none sm:text-sm"
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>
                    {validationErrors.image != '' && <ErrorMessage text={validationErrors.image} />}
                  </div>
                  <div className="p-2">
                    <label className="mb-2 block text-sm font-medium">Title</label>
                    <input
                      className="block w-full rounded-lg p-2.5 outline-none sm:text-sm"
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Enter post title here"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {validationErrors.title != '' && <ErrorMessage text={validationErrors.title} />}
                  </div>
                  {id && (
                    <div className="p-2">
                      <Select
                        selected={status == 'draft' ? 'Draft' : 'Published'}
                        title="Status"
                        onChange={selectOnChange}
                        options={['Published', 'Draft']}
                      />
                    </div>
                  )}
                  <div className="p-2">
                    <label className="mb-2 block text-sm font-medium">Content</label>
                    <Tiptap
                      onChange={(newContent: string) => handleContentChange(newContent)}
                      content={content}
                    />
                  </div>
                </div>
                <div className="mt-4 w-full pt-2 md:mt-1 lg:mt-4">
                  {submitLoading ? (
                    <Loader />
                  ) : (
                    <button
                      className="focus:ring-base-600 w-full rounded-lg bg-base-100 px-5
                       py-2.5 text-center text-sm font-medium hover:bg-base-300 focus:outline-none focus:ring-4 focus:ring-base-300 "
                      type="submit"
                    >
                      {id ? 'Update post' : 'Save Draft'}
                    </button>
                  )}
                  {error && <ErrorMessage text={error} classes="text-center" />}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Editor;
