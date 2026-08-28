import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Upsert the profile
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        maritalStatus: data.maritalStatus,
        city: data.city,
        state: data.state,
        country: data.country,
        religion: data.religion,
        community: data.community,
        education: data.education,
        profession: data.profession,
        annualIncome: data.annualIncome,
        height: data.height,
        profileCompleteness: 80,
      },
      create: {
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        maritalStatus: data.maritalStatus,
        city: data.city,
        state: data.state,
        country: data.country,
        religion: data.religion,
        community: data.community,
        education: data.education,
        profession: data.profession,
        annualIncome: data.annualIncome,
        height: data.height,
        profileCompleteness: 80,
      }
    });

    return NextResponse.json({ message: "Profile created", profile }, { status: 201 });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
