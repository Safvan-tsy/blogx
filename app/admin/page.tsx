import { redirect } from "next/navigation";
import React from "react";

const Page: React.FC = () => {
  return redirect("/admin/dashboard");
};

export default Page;
