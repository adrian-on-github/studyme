import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/app/api/auth/handler/auth";

interface ButtonProps {
  text: string;
  icon?: string | React.ReactNode;
}

// useSession handler/ auth session for button dashboard

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
        <Button
          variant="outline"
          className="w-1/2 border-black/10 cursor-pointer text-black"
          type="submit"
        >
          {icon}
          {text}
        </Button>
      </form>
    </>
  );
};

export default SignInButton;
