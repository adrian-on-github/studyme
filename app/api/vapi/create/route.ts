import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId, fullname, language } = await req.json();

    if (!userId || !fullname || !language) {
      return NextResponse.json(
        { message: "Variables are missing" },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.vapi.ai/call/web", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VAPI_KEY}`,
      },
      body: JSON.stringify({
        workflowId: "eccfd543-fa18-458c-9b51-1b7a285fd191",
      }),
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { message: "Fetch Error", error },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
