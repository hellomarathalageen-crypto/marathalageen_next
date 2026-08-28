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

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        profile: {
          include: { photos: true }
        },
        preferences: true
      }
    });

    if (!currentUser || !currentUser.profile) {
      return NextResponse.json({ message: "Complete onboarding first" }, { status: 403 });
    }

    return NextResponse.json({ profile: currentUser.profile });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
