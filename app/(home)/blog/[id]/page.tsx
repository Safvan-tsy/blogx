import React from 'react';
import HomeProfileCard from '@/app/components/ui/card/HomeProfileCard';
import { BlogView } from '../components/BlogView';

const page: React.FC<{ params: { id: string } }> = ({ params }) => {
  return (
    <div className="xl:w-[50rem]">
      <BlogView id={Number(params.id)} />
    </div>
  );
};

export default page;
