import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ exists: false });
  }

  const user = prisma.user.findUnique({
    where: { email },
  });

  return NextResponse.json({ exists: !!user });
};
