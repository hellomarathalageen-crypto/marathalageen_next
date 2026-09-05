import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const shortlists = await prisma.shortlist.findMany({
      where: { userId: currentUser.id },
      include: {
        targetProfile: {
          include: {
            photos: {
              where: { isPrimary: true },
              take: 1
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const formatted = shortlists.map((s) => {
      const p = s.targetProfile;
      const age = p.dateOfBirth
        ? Math.floor((new Date().getTime() - new Date(p.dateOfBirth).getTime()) / 3.15576e+10)
        : 26;

      return {
        id: p.id,
        shortlistId: s.id,
        name: `${p.firstName} ${p.lastName}`,
        age,
        height: p.height || "5'5\"",
        city: p.city || "Karnataka",
        state: p.state || "Karnataka",
        education: p.education || "Graduate",
        profession: p.profession || "Professional",
        community: p.community || "96 Kuli Maratha",
        devak: p.devak || undefined,
        isVerified: p.isVerified,
        imageUrl: p.photos[0]?.url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
      };
    });

    return NextResponse.json({ shortlists: formatted });
  } catch (error) {
    console.error("Shortlist GET error:", error);
    return NextResponse.json({ message: "Error fetching shortlists" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { profileId } = await req.json();
    if (!profileId) {
      return NextResponse.json({ message: "Missing profileId" }, { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existing = await prisma.shortlist.findUnique({
      where: {
        userId_targetProfileId: {
          userId: currentUser.id,
          targetProfileId: profileId
        }
      }
    });

    if (existing) {
      await prisma.shortlist.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ shortlisted: false, message: "Removed from shortlist" });
    } else {
      await prisma.shortlist.create({
        data: {
          userId: currentUser.id,
          targetProfileId: profileId
        }
      });
      return NextResponse.json({ shortlisted: true, message: "Added to shortlist" });
    }
  } catch (error) {
    console.error("Shortlist POST error:", error);
    return NextResponse.json({ message: "Error toggling shortlist" }, { status: 500 });
  }
}
