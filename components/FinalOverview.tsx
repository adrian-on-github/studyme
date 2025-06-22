"use client";
import { UserData } from "@prisma/client";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  score: {
    label: "Score",
    color: "oklch(72.3% 0.219 149.579)",
  },
} satisfies ChartConfig;

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
        <h1 className="p text-5xl">Interview from {userData?.fullname}</h1>
        <ChartContainer config={chartConfig} className="w-[400px]">
          <AreaChart
            accessibilityLayer
            data={[
              {
                score: "beginningScore",
                scorePoints: InterviewData.scoreBeginning,
              },
              {
                score: "middleScore",
                scorePoints: InterviewData.scoreMiddle,
              },
              {
                score: "endScore",
                scorePoints: InterviewData.scoreEnd,
              },
            ]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="score"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="scorePoints"
              type="linear"
              fill="oklch(72.3% 0.219 149.579)"
              fillOpacity={0.4}
              stroke="oklch(72.3% 0.219 149.579)"
            />
          </AreaChart>
        </ChartContainer>

        <p className="p text-lg">
          <span className="underline text-xl">Summarized Interview:</span>{" "}
          {summary}
        </p>
        <p className="p text-lg">
          <span className="underline text-xl">User's strengths:</span>{" "}
          {InterviewData.strengths}
        </p>
        <p className="p text-lg">
          <span className="underline text-xl">Areas for improvement:</span>{" "}
          {InterviewData.areasForImprovement}
        </p>
        <div>
          <span className="underline text-xl">Interview Questions:</span>
          {InterviewData.questionFeedback.map((question, index) => (
            <div
              className="flex justify-start items-start flex-col gap-y-2"
              key={index}
            >
              <h3 className="p text-lg underline">{question.question}</h3>
              <div className="px-4">
                <p className="p text-base">{question.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalOverview;
