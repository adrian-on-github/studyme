// update
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, user } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "Server Error. No userId found" },
        { status: 500 }
      );
    }

    const allowedFields = [
      "language",
      "fullname",
      "learningMethod",
      "subject",
      "goal",
      "educationalInstitution",
      "academicLevel",
      "additional_informations",
    ];

    const filteredData = Object.fromEntries(
      Object.entries(user).filter(([key]) => allowedFields.includes(key))
    );

    const updatedUser = await prisma.userData.update({
      where: {
        userId,
      },
      data: filteredData,
    });

    return NextResponse.json({ success: true, updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
