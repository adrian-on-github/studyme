// /app/api/vapi/webcall/route.ts (Next.js App Router)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, fullname, language } = body.user;

    const res = await fetch("https://api.vapi.ai/call/web", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VAPI_KEY}`,
      },
      body: JSON.stringify({
        workflowId: "eccfd543-fa18-458c-9b51-1b7a285fd191",
        workflowOverrides: {
          variableValues: {
            fullname,
            language,
            userId,
          },
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: "Webcall failed", data, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data, callId: data.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
