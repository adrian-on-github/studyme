"use client";
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const LoginButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="w-1/2 border-black/10 cursor-pointer"
      onClick={() => {
        router.push("/onboarding");
      }}
    >
      <GraduationCap />
      Start studying today
    </Button>
  );
};

export default LoginButton;
