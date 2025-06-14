import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  return Response.json({ success: true, data: "Thank you" }, { status: 200 });
}

export async function POST(req: Request) {
  const {
    userId,
    additionalInformations,
    subject,
    learningMethod,
    goal,
    educationalInstitution,
    academicLevel,
  } = await req.json();

  try {
    const interview = {
      userId: userId,
      subject,
      learningMethod,
      additionalInformations,
      goal,
      educationalInstitution,
      academicLevel,
    };

    await prisma.userData.update({
      where: {
        userId: userId,
      },
      data: {
        learningMethod: interview.learningMethod,
        subject: interview.subject,
        goal: interview.goal,
        educationalInstitution: interview.educationalInstitution,
        academicLevel: interview.academicLevel,
        additional_informations: interview.additionalInformations,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
