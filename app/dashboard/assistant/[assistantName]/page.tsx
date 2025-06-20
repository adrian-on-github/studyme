"use client";
import React from "react";
import { useParams } from "next/navigation";
import CallPage from "@/components/CallPage";

const Page = () => {
  const params = useParams<{ assistantName: string }>();
  console.log(params.assistantName);
  return (
    <div>
      {params.assistantName === "homeworkAnalyst" ? (
        <>homeworkAnalyst</>
      ) : params.assistantName === "learningAssistant" ? (
        <>learningAssistant</>
      ) : params.assistantName === "interviewCoach" ? (
        <div className="w-full">
          <CallPage />
          call page
        </div>
      ) : (
        <>404</>
      )}
    </div>
  );
};

export default Page;
