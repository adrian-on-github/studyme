"use client";
import React from "react";
import { useParams } from "next/navigation";
import InterviewAssistant from "@/components/assistants/InterviewAssistant";

const Page = () => {
  const params = useParams<{ assistantName: string; id: string }>();
  console.log(params.assistantName);
  return (
    <div>
      {params.assistantName === "homeworkAnalyst" ? (
        <>homeworkAnalyst</>
      ) : params.assistantName === "learningAssistant" ? (
        <>learningAssistant</>
      ) : params.assistantName === "interviewCoach" ? (
        <div className="w-full">
          <InterviewAssistant userId={params.id} />
        </div>
      ) : (
        <>404</>
      )}
    </div>
  );
};

export default Page;
