import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data, user } = await req.json();

    if (!user) {
      return NextResponse.json({ status: 404 });
    }

    const createUser = await prisma.userData.create({
      data: {
        user: {
          connect: { id: user.userId },
        },
        language: data.language,
        fullname: data.fullname,
        learningMethod: data.learningMethod,
        subject: data.subject,
        goal: data.goal,
        educationalInstitution: data.educationalInstitution,
        academicLevel: data.academicLevel,
        email: data.email,
        image: data.image || "",
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
}
