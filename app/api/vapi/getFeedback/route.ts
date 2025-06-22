import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing required field" },
      { status: 400 }
    );
  }

  try {
    const feedbackData = await prisma.feedback.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true, feedbackData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: error }, { status: 500 });
  }
}
