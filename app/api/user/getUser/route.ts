import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ status: 500, message: "Missing userId" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ status: 500, message: "User not found" });
    }

    const userData = await prisma.userData.findFirst({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ user, userData, status: 200 });
  } catch (error) {
    console.error("Error in getUser:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
