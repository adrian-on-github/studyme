import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req: Request) => {
  const { userId } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({ status: 500 });
  }

  return NextResponse.json({ user, status: 200 });
};
