"use client";
import { GraduationCap } from "lucide-react";
import React, { useState, useEffect } from "react";

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="bg-white p-2 rounded-md w-full flex flex-row items-start text-start">
      <p className="p">
        <GraduationCap className="size-5" />
        {displayedText}
      </p>
    </div>
  );
};

export default Typewriter;
