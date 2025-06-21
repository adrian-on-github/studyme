import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { interviewBody, userId } = await req.json();
    if (!interviewBody || !userId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const userInterview = await prisma.interview.create({
      data: {
        user: {
          connect: { userId: userId },
        },
        context: interviewBody.context,
        topic: interviewBody.topic,
      },
    });

    return NextResponse.json({ success: true, userInterview }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
