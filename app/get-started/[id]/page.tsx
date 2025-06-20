"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserForm from "@/components/UserForm";

const Page = () => {
  const [mount, setMount] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setMount(true);
      }
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  if (!mount || !params.id) return null;

  return (
    <>
      <section className="px-10 pt-8 h-full w-full flex justify-center items-center flex-col">
        <UserForm />
      </section>
    </>
  );
};

export default Page;
