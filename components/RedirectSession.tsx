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
      const id = data.userId;
      const userSession = localStorage.getItem("session");
      if ((!data.exists || data.user === null) && !userSession) {
        router.push(`/get-started/${id}`);
      } else if (data.exists && userSession) {
        router.push("/dashboard");
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
