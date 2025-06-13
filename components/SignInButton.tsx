import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/app/api/auth/handler/auth";
import RedirectButton from "./RedirectButton";

interface ButtonProps {
  text: string;
  icon?: string | React.ReactNode;
}

const SignInButton = async ({ text, icon }: ButtonProps) => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
        className="w-full flex items-center justify-center"
      >
        <RedirectButton text={text} icon={icon} />
      </form>
    </>
  );
};

export default SignInButton;
