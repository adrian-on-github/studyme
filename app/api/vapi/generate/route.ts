import { NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return Response.json({ success: true, data: "Thank you" }, { status: 200 });
}

export async function POST(req: Request) {
  const {
    userId,
    additionalInformations,
    fullName,
    subject,
    learningMethod,
    aiPrompt,
  } = await req.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: aiPrompt,
    });

    const interview = {
      userId: userId,
      fullName,
      subject,
      learningMethod,
      additionalInformations,
      questions: JSON.parse(questions),
    };

    await prisma.interview.create({
      data: {
        fullName: interview.fullName,
        subject: interview.subject,
        learningMethod: interview.learningMethod,
        additionalInformations: interview.additionalInformations,
        questions: JSON.stringify(interview.questions),
        user: {
          connect: { userId: interview.userId },
        },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
