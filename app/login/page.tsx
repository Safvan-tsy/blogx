"use client";
import React, { useEffect, useState } from "react";
import LoginCard from "../components/ui/card/Login";
import RegisterCard from "../components/ui/card/Register";

const Login = () => {
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setIsUser(data.users && data.users.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="min-h-screen">
      {isUser ? <LoginCard /> : <RegisterCard />}
    </div>
  );
};

export default Login;
