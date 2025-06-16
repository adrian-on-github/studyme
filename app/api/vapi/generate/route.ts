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
    subject,
    learningMethod,
    goal,
    educationalInstitution,
    academicLevel,
  } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Missing required field" },
      { status: 400 }
    );
  }

  try {
    const interview = {
      userId: userId,
      subject: subject,
      learningMethod: learningMethod,
      additionalInformations: additionalInformations,
      goal: goal,
      educationalInstitution: educationalInstitution,
      academicLevel: academicLevel,
    };

    const { text: summarizedText } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `
            Hello Gemini! Please generate a concise, well-structured summary based on the following user interview data. The goal is to prepare an AI use case profile that includes relevant context about the user’s goals, background, and preferences. This summary should be informative, human-readable, and useful for educational or learning-related AI systems.
            
            User Information:
            - User ID: ${interview.userId}
            - Subject: ${interview.subject}
            - Preferred Learning Method: ${interview.learningMethod}
            - Additional Information: ${interview.additionalInformations}
            - Learning Goal: ${interview.goal}
            - Educational Institution: ${interview.educationalInstitution}
            - Academic Level: ${interview.academicLevel}
            
            Please ensure the result is:
            - In natural, fluent English
            - No longer than 5–7 sentences
            - Focused on the user’s motivation, learning context, and objectives
            
            Thank you! <3
            `,
    });

    await prisma.userData.update({
      where: {
        userId: userId,
      },
      data: {
        learningMethod: interview.learningMethod,
        subject: interview.subject,
        goal: interview.goal,
        educationalInstitution: interview.educationalInstitution,
        academicLevel: interview.academicLevel,
        additional_informations:
          summarizedText || interview.additionalInformations,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
