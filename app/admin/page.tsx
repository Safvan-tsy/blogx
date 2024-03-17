import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import SignOutButton from "../components/ui/button/SignOutButton";

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div>
        admin page {session.user.username}
        <SignOutButton />
      </div>
    );
  } else {
    return <div>please Login</div>;
  }
};

export default Admin;
