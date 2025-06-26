"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RedirectSession = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    const checkUserExists = async () => {
      const res = await fetch("/api/user/user-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      });

      if (!res.ok) {
        console.error("POST Request Failed!");
      }
      const data = await res.json();
      const userSession = localStorage.getItem("session");

      if (!data.exists && !userSession) {
        router.push(`/get-started/${data.userId}`);
      } else if (data.exists && userSession) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    };

    checkUserExists();
  }, [session]);

  useEffect(() => {
    const interval = setInterval(() => {
      const userSession = localStorage.getItem("session");
      if (userSession) {
        router.push("/dashboard");
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default RedirectSession;
