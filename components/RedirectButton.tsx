"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface ButtonProps {
  icon: string | React.ReactNode;
  text: string;
}

const RedirectButton = ({ icon, text }: ButtonProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="w-full items-center justify-center flex flex-col gap-y-2">
      {session ? (
        <>
          <Button
            variant="outline"
            className="w-1/2 border-black/10 cursor-pointer text-black"
            onClick={() => router.push("/dashboard")}
            type="button"
          >
            <ChevronRight />
            Go to Dashboard
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            className="w-1/2 border-black/10 cursor-pointer text-black"
            type="submit"
          >
            {icon}
            {text}
          </Button>
          <p className="p text-sm/6 mt-1">Start with a 7-day Free Trial</p>
        </>
      )}
    </div>
  );
};

export default RedirectButton;
