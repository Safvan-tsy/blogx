import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";

export const GotoIcon = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="hidden md:flex cursor-pointer">
      {session && session.user && (
        <div className="tooltip tooltip-bottom" data-tip="Go to dashboard">
          <Link href="/admin/dashboard">
            <FaSignOutAlt className="w-6 h-6" />
          </Link>
        </div>
      )}
    </div>
  );
};
