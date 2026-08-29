import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { preferences: true }
    });

    return NextResponse.json({ preferences: user?.preferences || null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updated = await prisma.partnerPreference.upsert({
      where: { userId: user.id },
      update: {
        minAge: Number(body.minAge) || 18,
        maxAge: Number(body.maxAge) || 45,
        minHeight: body.minHeight || null,
        maxHeight: body.maxHeight || null,
        maritalStatus: body.maritalStatus || null,
        communities: body.communities || null,
        education: body.education || null,
        profession: body.profession || null,
        city: body.city || null,
      },
      create: {
        userId: user.id,
        minAge: Number(body.minAge) || 18,
        maxAge: Number(body.maxAge) || 45,
        minHeight: body.minHeight || null,
        maxHeight: body.maxHeight || null,
        maritalStatus: body.maritalStatus || null,
        communities: body.communities || null,
        education: body.education || null,
        profession: body.profession || null,
        city: body.city || null,
      }
    });

    return NextResponse.json({ success: true, preferences: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
