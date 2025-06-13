import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return NextResponse.json({ exists: false });
  }

  const userData = await prisma.userData.findUnique({
    where: { userId: user.id },
  });

  return NextResponse.json({
    exists: !!userData,
    user: userData,
    userId: user.id,
  });
};
