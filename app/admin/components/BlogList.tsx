'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import { Post } from '@prisma/client';
import Link from 'next/link';
import Select from '@/app/components/ui/Select';
import Pagination from '@/app/components/ui/Pagination';
import AlertModal from '@/app/components/ui/modal/AlertModal';
import { BlogListSkeleton } from '@/app/components/ui/skeleton/Dashboard';

const BlogList: React.FC = () => {
  const { data: userData } = useSession();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPage, setTotalPage] = useState<number>();
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
    status?: string;
    keyword?: string;
  }>({
    page: 1,
    limit: 5,
  });

  const selectProps = {
    title: 'status',
    options: ['Draft', 'Published', 'All'],
  };

  const fetchData = async () => {
    try {
      const headers = new Headers();
      headers.append('Authorization', userData?.user.username || '');
      const queryString = new URLSearchParams({
        page: query.page.toString(),
        limit: query.limit.toString(),
        status: query.status || '',
        keyword: query.keyword || '',
      }).toString();

      const response = await fetch(`/api/admin/post?${queryString}`, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      setPosts(data.posts);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [query]);

  const deleteData = async (id: number) => {
    try {
      const headers = new Headers();
      headers.append('Authorization', userData?.user.username || '');

      const response = await fetch(`/api/admin/post/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      setIsLoading(false);
      setError('Something went wrong');
    }
  };

  const bulkDeleteData = async (ids: number[]) => {
    try {
      const headers = new Headers();
      headers.append('Authorization', userData?.user.username || '');

      const response = await fetch(`/api/admin/post/`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ ids }),
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      setIsLoading(false);
      setError('Something went wrong');
    }
  };

  const onDelete = async (id: number) => {
    setIsLoading(true);
    deleteData(id);
  };
  const onBulkDelete = async (ids: number[]) => {
    setIsLoading(true);
    bulkDeleteData(ids);
  };
  const selectOnChange = async (value: string) => {
    setIsLoading(true);
    if (value == 'All') value = '';
    setQuery((prevQuery) => ({
      ...prevQuery,
      status: value.toLowerCase(),
    }));
  };

  const pageOnChange = async (page: number) => {
    setIsLoading(true);
    setQuery((prevQuery) => ({
      ...prevQuery,
      page,
    }));
  };
  const searchOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value;
    // if (keyword == "") return;
    setIsLoading(true);
    setQuery((prevQuery) => ({
      ...prevQuery,
      keyword,
    }));
  };

  const togglePostSelection = (postId: number) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };

  useEffect(() => {
    if (userData?.user) {
      fetchData();
    }
  }, [userData?.user]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex flex-col flex-wrap items-stretch justify-center gap-3 
      md:flex-row md:items-center md:justify-between"
      >
        <div>
          <form className="flex" onSubmit={searchOnSubmit}>
            <div className="input input-bordered flex w-full items-center justify-between">
              <input
                type="text"
                placeholder="Search"
                id="keyword"
                name="keyword"
                className=" md:w-auto lg:w-[20rem] xl:w-[25rem]"
              />
              <button type="submit" className="">
                <FaSearch className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 items-center gap-2">
          <Select selected="All" options={selectProps.options} onChange={selectOnChange} />
          <Link href="/admin/dashboard/new">
            <button className="btn w-full">
              <FaPlus /> New
            </button>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <BlogListSkeleton numberOfRows={5} />
      ) : (
        <div className="mt-3 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(e) => {
                        if (e.target.checked == true) {
                          setSelectedPosts(
                            posts.map((item) => {
                              return item.id;
                            }),
                          );
                        } else {
                          setSelectedPosts([]);
                        }
                      }}
                    />
                  </label>
                </th>
                <th>Title</th>
                <th>Cover</th>
                <th>Status</th>
                <th>
                  {selectedPosts.length > 0 && (
                    <div className="tooltip tooltip-bottom" data-tip="Delete">
                      <AlertModal
                        text="Are you sure to delete"
                        onYes={() => {
                          onBulkDelete(selectedPosts);
                        }}
                      />
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((item: Post) => (
                <tr key={item.id}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedPosts.includes(item.id)}
                        onChange={() => togglePostSelection(item.id)}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold lg:text-lg">{item.title}</div>
                        {/* /// label <div className="text-sm opacity-50">United States</div> /// */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="h-16 w-36">
                        {item.image && (
                          <img src={item.image} alt="Cover" className="max-h-16 max-w-36" />
                        )}
                      </div>
                    </div>
                    {/* /// label /// <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
                  </td>
                  <td>
                    {item.status == 'draft' ? (
                      <div className="btn btn-sm text-warning">Draft</div>
                    ) : (
                      <div className="btn btn-sm text-success">Published</div>
                    )}
                  </td>
                  <th>
                    <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                      <div className="tooltip tooltip-bottom" data-tip="Edit Post">
                        <Link href={`/admin/dashboard/blogs/${item.id}`} className="btn btn-sm">
                          <FaEdit />
                        </Link>
                      </div>

                      <div className="tooltip tooltip-bottom" data-tip="Delete">
                        <AlertModal
                          text="Are you sure to delete this Post"
                          onYes={() => onDelete(item.id)}
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Cover</th>
                <th>Status</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
          <div className="m-1 flex justify-center p-2">
            <Pagination currentPage={query.page} onChange={pageOnChange} totalPage={totalPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
