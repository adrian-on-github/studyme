// /app/api/vapi/webcall/route.ts (Next.js App Router)
import { NextResponse } from "next/server";
import { vapiClient } from "@/lib/vapi";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user } = body;

    if (!user) {
      return NextResponse.json(
        { message: "Webcall failed", success: false },
        { status: 500 }
      );
    }

    const callData = await vapiClient.calls.create({
      workflowId: "eccfd543-fa18-458c-9b51-1b7a285fd191",
      assistantId: "68ad748b-d8d4-4b80-9325-26c14df2c267",
      phoneNumberId: "31598cda-73fe-4d12-8559-f3c73d1ce706",
      customer: {
        name: user.fullname, // optional, für Logging
        number: "+18709701569",
      },
      assistantOverrides: {
        variableValues: {
          fullname: user.fullname,
          userId: user.userId,
          language: user.language,
        },
      },
    });

    return NextResponse.json({ success: true, callData }, { status: 200 });
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
