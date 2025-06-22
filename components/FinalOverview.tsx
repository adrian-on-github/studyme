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
}: {
  InterviewData: InterviewData;
  summary: string;
}) => {
  if (!InterviewData) return <p>Please try later again!</p>;

  return <div className="w-full h-full">SUCCESS!🥳🥳🥳</div>;
};

export default FinalOverview;
