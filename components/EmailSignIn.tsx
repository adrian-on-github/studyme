"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Mail } from "lucide-react";

const EmailSignIn = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (
      trimmedEmail === "" ||
      trimmedEmail.length < 5 ||
      trimmedEmail.length > 50
    ) {
      return;
    }
    console.log(email);
    await signIn("resend", { email });
  };

  return (
    <div className="flex flex-col items-start gap-3 w-1/2 mt-6">
      <p className="p text-sm text-center text-gray-400">
        Use E-Mail to Sign in
      </p>
      <form onSubmit={handleSubmit} className="w-full gap-y-2 flex flex-col">
        <Input
          type="text"
          placeholder="Email"
          name="email"
          min={5}
          max={50}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          variant="outline"
          type="submit"
          className="w-full border-black/10 cursor-pointer text-black"
        >
          <Mail />
          Sign in with E-Mail
        </Button>
      </form>
    </div>
  );
};

export default EmailSignIn;
