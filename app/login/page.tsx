"use client";
import React, { useEffect, useState } from "react";
import LoginCard from "../components/ui/card/Login";
import RegisterCard from "../components/ui/card/Register";
import LoadingPage from "../components/ui/LoadingPage";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user`);
        const data = await response.json();
        setIsUser(data.users);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (session && session.user) {
      router.push("/admin/dashboard");
    } else {
      fetchData();
    }
  }, [session, router]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen">
      {isUser ? <LoginCard /> : <RegisterCard />}
    </div>
  );
};

export default Login;
