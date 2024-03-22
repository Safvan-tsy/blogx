import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div>
        admin page {session.user.username}
      </div>
    );
  } else {
    redirect("/login");
  }
};

export default page;
