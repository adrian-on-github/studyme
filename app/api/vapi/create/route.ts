import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const callId = new URL(req.url).searchParams.get("callId");
  const { assistantId, summarizedText, userId } = await req.json();

  if (!callId || !userId) {
    return NextResponse.json(
      { success: false, error: "Missing required field" },
      { status: 400 }
    );
  }

  try {
    const callData = await prisma.vapiCall.create({
      data: {
        id: callId,
        assistantId,
        summarizedText,
        user: { connect: { userId } },
      },
    });

    return NextResponse.json({ success: true, callData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
