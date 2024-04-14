import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WelcomeImage from '@/public/start.svg';
import { NAV_URL } from '@/lib/utils/constants';

const WelcomeCard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <figure
        className="animate-spin-reverse px-10 pt-10 md:px-4 md:pt-0 lg:px-10
            lg:pt-10 xl:px-10 xl:pt-10"
      >
        <Image
          src={WelcomeImage}
          alt="welcome"
          className="mask mask-squircle object-cover object-center"
        />
      </figure>
      <div className="card-body items-center text-center">
        <Link href={NAV_URL.LOGIN}>
          <h2 className="btn btn-success card-title">Let&apos;s start Blogging</h2>
        </Link>
        <div className="text-sm opacity-50"></div>
        <p className="text-sm"></p>
        <p></p>
      </div>
    </div>
  );
};

export default WelcomeCard;
