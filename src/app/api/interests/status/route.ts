import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return NextResponse.json({ status: "none" });

    const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!currentUser) return NextResponse.json({ status: "none" });

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("targetUserId");
    if (!targetUserId) return NextResponse.json({ status: "none" });

    const interest = await prisma.interest.findFirst({
      where: {
        OR: [
          { senderId: currentUser.id, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: currentUser.id }
        ]
      }
    });

    if (!interest) return NextResponse.json({ status: "none" });

    if (interest.status === "accepted") return NextResponse.json({ status: "accepted", interestId: interest.id });
    if (interest.senderId === currentUser.id) return NextResponse.json({ status: "sent", interestId: interest.id });
    return NextResponse.json({ status: "received", interestId: interest.id });

  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
