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
      const stateOne = localStorage.getItem("discoveryState");
      const stateTwo = localStorage.getItem("checkUserInformations");
      if (!data.exists || stateOne || stateTwo || data.user === null) {
        router.push(`/get-started/${id}`);
        console.log("no");
      } else if (data.exists && !stateOne && !stateTwo) {
        console.log("yes");
        router.push("/dashboard");
      }
    };

    checkUserExists();
  }, [session]);

  return null;
};

export default RedirectSession;
