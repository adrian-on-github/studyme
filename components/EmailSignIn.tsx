"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EmailSignIn = () => {
  return (
    <div className="flex flex-col items-start gap-3 w-1/2 mt-6">
      <p className="p text-sm text-center text-gray-400">
        Use E-Mail to Sign in
      </p>
      <Input type="email" placeholder="Email" />
      <Button
        variant="outline"
        className="w-full border-black/10 cursor-pointer text-black"
        onClick={() => {}}
      >
        Sign in with E-Mail
      </Button>
    </div>
  );
};

export default EmailSignIn;
