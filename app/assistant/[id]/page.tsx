"use client";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ id: string }>();
  console.log(params.name);
  return <div>{params.name}</div>;
};

export default Page;
