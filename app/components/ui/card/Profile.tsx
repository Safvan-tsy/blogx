"use client";
import React from "react";

const ProfileCard: React.FC = () => {
  return (
    <div className="card md:flex-row xl:flex-col w-80 md:w-full xl:w-96 
    bg-base-100 shadow-xl justify-center items-center">
      <figure className="px-10 pt-10 md:px-4 md:pt-0 xl:px-10 xl:pt-10 xl:w-64 xl:h-64">
        <img
          src="https://www.safvan.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain.62eedf82.jpg&w=384&q=75"
          alt="Shoes"
          className="mask mask-squircle object-cover object-center"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Muhammed Safvan</h2>
        <div className="text-sm opacity-50">safvanmanikulath@gmail.com</div>
        <p className="text-sm">
          I'm Safvan, a seasoned software developer from India proficient in
          Node.js backend development. I also excel in frontend development
          incorporating various technologies With strong emphasis on delivering
          high-quality solutions.
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default ProfileCard;
