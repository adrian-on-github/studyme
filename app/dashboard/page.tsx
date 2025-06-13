"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { UserData } from "@prisma/client";

const Dashboard = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!session?.user?.email) {
          return;
        }
        const res = await fetch("/api/user/user-exists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }),
        });
        const data = await res.json();
        console.log(data.user);
        console.log("hi");
        if (data.exists && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
    setMount(true);
  }, [session]);

  if (!mount) return null;
  return (
    <>
      <div className="p-7 flex items-start justify-start flex-col gap-y-12 w-full relative">
        <h1 className="text-3xl lg:text-5xl p font-bold">
          Welcome back {user?.fullname}!👋
        </h1>
        <div className="max-w-7xl mx-auto"></div>
      </div>
    </>
  );
};

export default Dashboard;
