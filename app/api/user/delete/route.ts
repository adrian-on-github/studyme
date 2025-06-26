import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID not found" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.feedback.deleteMany({ where: { userId: id } }),
      prisma.vapiCall.deleteMany({ where: { userId: id } }),
      prisma.userData.deleteMany({ where: { userId: id } }),
      prisma.user.delete({ where: { id } }),
    ]);

    return NextResponse.json(
      { data: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", data: error },
      { status: 500 }
    );
  }
}
