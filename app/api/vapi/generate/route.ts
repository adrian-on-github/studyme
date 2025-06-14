import { NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return Response.json({ success: true, data: "Thank you" }, { status: 200 });
}

export async function POST(req: Request) {
  const { userId, additionalInformations, fullName, subject, learningMethod } =
    await req.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `
      You are a personal teacher. 
      Your focus is to collect all important informations. You can remove every unimportant information.
      The username is: ${fullName}.
      The users worst subject is: ${subject}.
      The learningMethod is: ${learningMethod}
      The additionalInformations are: ${additionalInformations}
      All the informations you collect will be used later with an ai voice assistant, so do not use "/" or "*" or any other special characters which might break the voice assistant.
      Please return some important questions you need as a teacher.
      Return the questions formatted like this:
      ["Question 1", "Question 2", "Question 3"]

      Thank you! <3 
      `,
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
