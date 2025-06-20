import { NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { prisma } from "@/lib/prisma";

export async function GET() {
  return Response.json({ success: true, data: "Thank you" }, { status: 200 });
}

export async function POST(req: Request) {
  const { user, callId, assistantId } = await req.json();

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Missing required field" },
      { status: 400 }
    );
  }

  try {
    const { text: summarizedText } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `
            Hello Gemini! Please generate a concise, well-structured summary based on the following user interview data. The goal is to prepare an AI use case profile that includes relevant context about the user’s goals, background, and preferences. This summary should be informative, human-readable, and useful for educational or learning-related AI systems.
            
            User Information:
            - Subject: ${user.subject}
            - Preferred Learning Method: ${user.learningMethod}
            - Learning Goal: ${user.goal}
            - Educational Institution: ${user.educationalInstitution}
            - Academic Level: ${user.academicLevel}
            - Additional Information: ${user.additionalInformations} (remove all unnessescarry information which dont complain to the topic: studying)
            
            Please ensure the result is:
            - In natural, fluent English
            - No longer than 5–7 sentences
            - Focused to use in further AI prompts
            
            Thank you! <3
            `,
    });

    await prisma.userData.update({
      where: {
        userId: user.userId,
      },
      data: {
        additional_informations: summarizedText || user.additionalInformations,
      },
    });

    await prisma.vapiCall.create({
      data: {
        id: callId,
        assistantId,
        summarizedText,
        created_at: new Date().toISOString(),
        user: {
          connect: { userId: user.userId },
        },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
