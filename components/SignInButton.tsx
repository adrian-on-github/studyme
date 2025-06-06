"use client";
import React from "react";
import { Button } from "./ui/button";

interface ButtonProps {
  text: string;
  click: string;
  icon?: string | React.ReactNode;
}

const SignInButton = ({ text, click, icon }: ButtonProps) => {
  return (
    <Button
      variant="outline"
      className="w-1/2 border-black/10 cursor-pointer text-black"
      onClick={
        click === "google"
          ? () => {}
          : click === "linkedin"
          ? () => {}
          : () => {}
      }
    >
      {icon}
      {text}
    </Button>
  );
};

export default SignInButton;
