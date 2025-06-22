import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { interviewSummary, summary } = await req.json();

  if (!interviewSummary || !summary) {
    return NextResponse.json(
      { success: false, error: "Missing required field" },
      { status: 400 }
    );
  }

  try {
    const data = await prisma.interviewData.create({
      data: {
        scoreBeginning: interviewSummary.scoreBeginning,
        scoreMiddle: interviewSummary.scoreMiddle,
        scoreEnd: interviewSummary.scoreEnd,
        scoreOverall: interviewSummary.scoreOverall,
        strengths: interviewSummary.strengths,
        areasForImprovement: interviewSummary.areasForImprovement,
        summary: summary,
        questionFeedback: interviewSummary.questionFeedback,
      },
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
