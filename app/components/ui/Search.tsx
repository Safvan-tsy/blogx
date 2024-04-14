'use client';
import React, { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { NAV_URL } from '@/lib/utils/constants';

const Search: React.FC = () => {
  const router = useRouter();

  const searchOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value;
    if (keyword == '') return;
    const url = `${NAV_URL.SEARCH}?page=1&limit=10&keyword=${keyword}`;
    router.push(url);
  };

  return (
    <form className="flex" onSubmit={searchOnSubmit}>
      <div className="input flex w-full items-center justify-between outline-none">
        <input
          type="text"
          placeholder="Search"
          id="keyword"
          name="keyword"
          className="w-full md:w-auto lg:w-[20rem] xl:w-[25rem]"
        />
        <button type="submit" className="">
          <FaSearch className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>
      </div>
    </form>
  );
};

export default Search;
