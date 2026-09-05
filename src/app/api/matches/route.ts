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
      include: { profile: true, preferences: true }
    });

    if (!currentUser || !currentUser.profile) {
      return NextResponse.json({ message: "Complete onboarding first" }, { status: 403 });
    }

    let targetGender = currentUser.profile.gender === "Male" ? "Female" : "Male";
    let currentUserId: string = currentUser.id;
    let minAge = currentUser.preferences?.minAge || 20;
    let maxAge = currentUser.preferences?.maxAge || 40;

    const today = new Date();
    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

    const whereClause: any = {
      gender: targetGender,
      dateOfBirth: {
        gte: minDate,
        lte: maxDate
      }
    };

    if (currentUserId) {
      whereClause.userId = { not: currentUserId };
    }

    const matches = await prisma.profile.findMany({
      where: whereClause,
      include: {
        photos: {
          where: { isPrimary: true },
          take: 1
        }
      },
      orderBy: { createdAt: "desc" },
      take: 30
    });

    const formattedMatches = matches.map(m => {
      const age = m.dateOfBirth
        ? Math.floor((new Date().getTime() - new Date(m.dateOfBirth).getTime()) / 3.15576e+10)
        : 26;

      return {
        id: m.id,
        userId: m.userId,
        name: `${m.firstName} ${m.lastName}`,
        age,
        height: m.height || "5'5\"",
        city: m.city || "Karnataka",
        state: m.state || "Karnataka",
        education: m.education || "Graduate",
        profession: m.profession || "Professional",
        community: m.community || "96 Kuli Maratha",
        devak: m.devak || "Not specified",
        isVerified: m.isVerified,
        imageUrl: m.photos[0]?.url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
      };
    });

    return NextResponse.json({ matches: formattedMatches });
  } catch (error) {
    console.error("Matches API error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
