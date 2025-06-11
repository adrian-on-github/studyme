import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { user } = await req.json();

    if (!user) {
      return NextResponse.json({ status: 404 });
    }

    const createUser = await prisma.userData.create({
      data: {
        userId: user.userId,
        email: user.email,
        image: user.image || null,
        fullname: user.fullname,
        age: user.age,
        language: user.language,
        reason: user.reason,
        method: user.method,
        subject: user.subject,
        additional_context: user.additional_context,
      },
    });

    return NextResponse.json(
      { success: true, user: createUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in create user:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
