import { UserData } from "@prisma/client";
import React from "react";

type QuestionFeedback = {
  question: string;
  feedback: string;
  score: number;
};

interface InterviewData {
  scoreBeginning: number;
  scoreMiddle: number;
  scoreEnd: number;
  scoreOverall: number;
  strengths: string[];
  areasForImprovement: string[];
  questionFeedback: QuestionFeedback[];
}

const FinalOverview = ({
  InterviewData,
  summary,
  userData,
}: {
  InterviewData: InterviewData;
  summary: string;
  userData: UserData | null;
}) => {
  if (!InterviewData) return <p>Please try later again!</p>;

  return (
    <div className="w-full h-full flex justify-start items-start flex-col">
      <div className="flex flex-col max-w-6xl gap-y-5">
        <h1 className="p text-5xl">
          Interview from {userData?.fullname} - 06/22/2025
        </h1>
        {/* // AnalysisChart */}
        <div className="flex flex-col gap-y-3">
          Overall Score: {InterviewData.scoreOverall}
        </div>
        <p className="p text-lg">
          <span className="underline">Summarized Interview:</span> {summary}
        </p>
        <p className="p text-lg">
          <span className="underline">User's strengths:</span>
          {InterviewData.strengths}
        </p>
        <p className="p text-lg">
          <span className="underline">Areas for improvement:</span>
          {InterviewData.areasForImprovement}
        </p>
        <p className="p text-lg">
          <span className="underline">User's strengths:</span>
          {InterviewData.questionFeedback.map((question, index) => (
            <div className="flex justify-start items-start flex-col gap-y-2">
              <h3 className="p text-lg underline">{question.question}</h3>
              <div className="px-2">
                <p className="p text-base">{question.feedback}</p>
              </div>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default FinalOverview;
