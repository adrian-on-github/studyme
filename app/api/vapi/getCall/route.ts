export async function GET(req: Request) {
  const callId = new URL(req.url).searchParams.get("callId");

  const res = await fetch(`https://api.vapi.ai/call/${callId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
    },
  });

  const callData = await res.json();
  return Response.json({ callData }, { status: 200 });
}
