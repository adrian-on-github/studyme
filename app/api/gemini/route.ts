import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
    });

    return NextResponse.json({ success: true, text }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
