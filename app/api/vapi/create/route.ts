// /app/api/vapi/webcall/route.ts (Next.js App Router)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, callData } = body;

    if (!user || !callData) {
      return NextResponse.json(
        { message: "Webcall failed", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Webcall Error:", error);

    return NextResponse.json(
      {
        message: "Server Error",
        error: error?.message || JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
