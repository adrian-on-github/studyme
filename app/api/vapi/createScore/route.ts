import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, score } = await req.json();

    if (!userId || !score) {
      return NextResponse.json({ message: "Not found" }, { status: 400 });
    }

    prisma.interviewScore.create({
      data: {
        overallScore: score,
        user: {
          connect: {
            userId,
          },
        },
      },
    });

    return NextResponse.json({ message: "Score created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
