"use client";
import React, { useEffect, useState } from "react";
import LoginCard from "@/app/components/ui/card/Login";
import RegisterCard from "@/app/components/ui/card/Register";
import LoadingPage from "@/app/components/ui/LoadingPage";
import { fetchUserData, redirectToDashboard } from "@/lib/actions/login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setIsUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session && session.user) {
      redirectToDashboard(router);
    } else {
      fetchData();
    }
  }, [session]);

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
