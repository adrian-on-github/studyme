import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { user, callId, assistantId, text } = await req.json();

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Missing required field" },
      { status: 400 }
    );
  }

  try {
    await prisma.userData.update({
      where: {
        userId: user.userId,
      },
      data: {
        additional_informations: text,
      },
    });

    await prisma.vapiCall.create({
      data: {
        id: callId,
        assistantId,
        summarizedText: text,
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
