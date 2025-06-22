import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const callId = new URL(req.url).searchParams.get("callId");
  const { userId, context } = await req.json();

  if (!callId || !userId) {
    return NextResponse.json(
      { success: false, error: "Missing required field" },
      { status: 400 }
    );
  }

  try {
    const feedbackData = await prisma.feedback.create({
      data: {
        context,
        userData: { connect: { userId } },
        vapiCall: { connect: { id: callId } },
      },
    });

    return NextResponse.json({ success: true, feedbackData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
