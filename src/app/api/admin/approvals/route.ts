import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const pendingProfiles = await prisma.profile.findMany({
      where: { isVerified: false },
      take: 50,
      orderBy: { updatedAt: "desc" },
      include: {
        user: {
          select: { id: true, email: true, name: true, createdAt: true }
        },
        photos: {
          orderBy: { isPrimary: "desc" }
        }
      }
    });

    const formatted = pendingProfiles.map(p => {
      const age = p.dateOfBirth ? Math.floor((new Date().getTime() - new Date(p.dateOfBirth).getTime()) / 3.15576e+10) : 26;
      return {
        id: p.id,
        userId: p.userId,
        name: `${p.firstName} ${p.lastName}`.trim() || p.user?.name || "Candidate",
        email: p.user?.email || "No email",
        gender: p.gender,
        age,
        city: p.city || "Karnataka",
        state: p.state || "Karnataka",
        community: p.community || "96 Kuli Maratha",
        devak: p.devak || "Not specified",
        gotra: p.gotra || "Not specified",
        education: p.education || "Graduate",
        profession: p.profession || "Professional",
        income: p.annualIncome || "Confidential",
        photo: p.photos[0]?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
        allPhotos: p.photos.map(ph => ph.url),
        submittedAt: p.updatedAt || p.createdAt
      };
    });

    return NextResponse.json({
      success: true,
      pendingCount: formatted.length,
      profiles: formatted
    });
  } catch (error) {
    console.error("Admin approvals GET error:", error);
    return NextResponse.json({ error: "Failed to fetch pending approvals" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await request.json();
    const { profileId, action } = body; // action: 'approve' | 'reject'

    if (!profileId || !action) {
      return NextResponse.json({ error: "profileId and action are required" }, { status: 400 });
    }

    if (action === "approve") {
      await prisma.profile.update({
        where: { id: profileId },
        data: { isVerified: true }
      });
      return NextResponse.json({ success: true, message: "Profile approved and marked verified" });
    } else {
      // Reject action can leave isVerified false
      await prisma.profile.update({
        where: { id: profileId },
        data: { isVerified: false }
      });
      return NextResponse.json({ success: true, message: "Profile rejected" });
    }
  } catch (error) {
    console.error("Admin approvals POST error:", error);
    return NextResponse.json({ error: "Failed to process approval" }, { status: 500 });
  }
}
