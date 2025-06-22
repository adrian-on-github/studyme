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
  summary: string;
}

const FinalOverview = ({ InterviewData }: { InterviewData: InterviewData }) => {
  if (!InterviewData) return <p>Please try later again!</p>;

  return <div>SUCCESS!🥳🥳🥳</div>;
};

export default FinalOverview;
