import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true }
    });

    if (!currentUser?.profile) return NextResponse.json({ message: "No profile" }, { status: 403 });

    const { id } = await req.json();

    // Verify ownership
    const photo = await prisma.photo.findUnique({ where: { id } });
    if (!photo || photo.profileId !== currentUser.profile.id) {
      return NextResponse.json({ message: "Not found" }, { status: 403 });
    }

    // Unset current primary
    await prisma.photo.updateMany({
      where: { profileId: currentUser.profile.id },
      data: { isPrimary: false }
    });

    // Set new primary
    await prisma.photo.update({
      where: { id },
      data: { isPrimary: true }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
