import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const minAge = parseInt(searchParams.get("minAge") || "18");
    const maxAge = parseInt(searchParams.get("maxAge") || "60");

    // Get current user to determine opposite gender
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true }
    });

    if (!currentUser || !currentUser.profile) {
      return NextResponse.json({ message: "Complete onboarding first" }, { status: 403 });
    }

    const targetGender = currentUser.profile.gender === "Male" ? "Female" : "Male";

    // Calculate birth date ranges
    const today = new Date();
    const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

    const matches = await prisma.profile.findMany({
      where: {
        userId: { not: currentUser.id },
        gender: targetGender,
        dateOfBirth: {
          gte: minDate,
          lte: maxDate
        }
      },
      include: {
        photos: {
          where: { isPrimary: true },
          take: 1
        }
      },
      take: 20
    });

    // Map to frontend format
    const formattedMatches = matches.map(m => {
      const age = m.dateOfBirth ? Math.floor((new Date().getTime() - new Date(m.dateOfBirth).getTime()) / 3.15576e+10) : 0;
      return {
        id: m.id,
        name: `${m.firstName} ${m.lastName}`,
        age,
        height: m.height || "Unknown",
        city: m.city || "Unknown",
        state: m.state || "Unknown",
        education: m.education || "Unknown",
        profession: m.profession || "Unknown",
        imageUrl: m.photos[0]?.url || ""
      };
    });

    return NextResponse.json({ matches: formattedMatches });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
