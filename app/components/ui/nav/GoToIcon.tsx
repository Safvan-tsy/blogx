import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FaSignOutAlt } from 'react-icons/fa';
import { authOptions } from '@/lib/auth';

export const GotoIcon = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="hidden cursor-pointer md:flex">
      {session && session.user && (
        <div className="tooltip tooltip-bottom" data-tip="Go to dashboard">
          <Link href="/admin/dashboard">
            <FaSignOutAlt className="h-6 w-6" />
          </Link>
        </div>
      )}
    </div>
  );
};
