// update
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Server Error. No userId found" },
        { status: 500 }
      );
    }

    const allowedFields = [
      "email",
      "image",
      "language",
      "fullname",
      "studyReason",
      "learningMethod",
      "subject",
      "goal",
      "educationalInstitution",
      "academicLevel",
      "additional_informations",
    ];

    const filteredData = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowedFields.includes(key))
    );

    const updatedUser = prisma.userData.update({
      where: {
        userId,
      },
      data: filteredData,
    });

    return NextResponse.json({ success: true, updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
