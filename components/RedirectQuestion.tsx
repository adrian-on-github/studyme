"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RedirectQuestion = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [_, setUserExists] = useState<boolean>(false);

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

      const data = await res.json();
      setUserExists(data.exists);
      if (!data.exists) {
        router.push("/get-started");
      }
      console.log(data.exists);
    };

    checkUserExists();
  }, [session, router]);

  return null;
};

export default RedirectQuestion;
