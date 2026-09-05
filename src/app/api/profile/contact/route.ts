import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

function maskPhone(phone: string): string {
  if (!phone) return "+91 98••••••12";
  const clean = phone.replace(/[^0-9]/g, "");
  if (clean.length < 8) return "+91 98••••••12";
  const prefix = clean.slice(0, 2);
  const suffix = clean.slice(-2);
  return `+91 ${prefix}••••••${suffix}`;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Please log in to view contact details", requireLogin: true }, { status: 401 });
    }

    const { targetProfileId } = await req.json();
    if (!targetProfileId) {
      return NextResponse.json({ message: "Missing target profile ID" }, { status: 400 });
    }

    const viewer = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
        subscriptions: {
          where: { status: "ACTIVE" },
          orderBy: { createdAt: "desc" },
          take: 1
        }
      }
    });

    if (!viewer) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const targetProfile = await prisma.profile.findUnique({
      where: { id: targetProfileId },
      include: { user: { select: { email: true, name: true } } }
    });

    if (!targetProfile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    // 1. If viewer is viewing their own profile
    const isOwner = viewer.profile?.id === targetProfile.id;

    // 2. Check if active paid subscription exists
    const hasActiveSub = viewer.subscriptions.length > 0 && viewer.subscriptions[0].plan !== "FREE";

    // 3. Check if mutual accepted interest exists
    const mutualInterest = await prisma.interest.findFirst({
      where: {
        OR: [
          { senderId: viewer.id, receiverId: targetProfile.userId, status: "accepted" },
          { senderId: targetProfile.userId, receiverId: viewer.id, status: "accepted" }
        ]
      }
    });

    const isUnlocked = isOwner || hasActiveSub || !!mutualInterest;

    if (isUnlocked) {
      return NextResponse.json({
        unlocked: true,
        mobile: targetProfile.mobile || "+91 98220 98765",
        email: targetProfile.user?.email || "family.contact@marathalageen.com",
        name: `${targetProfile.firstName} ${targetProfile.lastName}`,
        reason: isOwner ? "owner" : hasActiveSub ? "premium" : "accepted_interest"
      });
    }

    return NextResponse.json({
      unlocked: false,
      maskedMobile: maskPhone(targetProfile.mobile || "9822098765"),
      maskedEmail: "••••••@marathalageen.com",
      requireUpgrade: true,
      message: "Unlock verified family contact number with Premium Membership"
    });
  } catch (error) {
    console.error("Contact shield error:", error);
    return NextResponse.json({ message: "Error retrieving contact information" }, { status: 500 });
  }
}
