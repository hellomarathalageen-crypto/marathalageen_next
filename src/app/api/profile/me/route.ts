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
      include: { 
        profile: {
          include: { photos: { orderBy: { isPrimary: "desc" } } }
        },
        preferences: true
      }
    });

    if (!currentUser || !currentUser.profile) {
      return NextResponse.json({ message: "Complete onboarding first" }, { status: 403 });
    }

    return NextResponse.json({ 
      profile: {
        ...currentUser.profile,
        email: currentUser.email,
        phone: currentUser.profile.mobile || null,
      }
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true }
    });

    if (!currentUser || !currentUser.profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    const body = await req.json();

    const updatedProfile = await prisma.profile.update({
      where: { id: currentUser.profile.id },
      data: {
        firstName: body.firstName ?? currentUser.profile.firstName,
        lastName: body.lastName ?? currentUser.profile.lastName,
        height: body.height ?? currentUser.profile.height,
        maritalStatus: body.maritalStatus ?? currentUser.profile.maritalStatus,
        city: body.city ?? currentUser.profile.city,
        state: body.state ?? currentUser.profile.state,
        country: body.country ?? currentUser.profile.country,
        nativePlace: body.nativePlace ?? currentUser.profile.nativePlace,
        community: body.community ?? currentUser.profile.community,
        subCommunity: body.subCommunity ?? currentUser.profile.subCommunity,
        devak: body.devak ?? currentUser.profile.devak,
        gotra: body.gotra ?? currentUser.profile.gotra,
        kuldaivat: body.kuldaivat ?? currentUser.profile.kuldaivat,
        rashi: body.rashi ?? currentUser.profile.rashi,
        nakshatra: body.nakshatra ?? currentUser.profile.nakshatra,
        manglik: body.manglik ?? currentUser.profile.manglik,
        religion: body.religion ?? currentUser.profile.religion,
        motherTongue: body.motherTongue ?? currentUser.profile.motherTongue,
        education: body.education ?? currentUser.profile.education,
        college: body.college ?? currentUser.profile.college,
        profession: body.profession ?? currentUser.profile.profession,
        company: body.company ?? currentUser.profile.company,
        annualIncome: body.annualIncome ?? currentUser.profile.annualIncome,
        diet: body.diet ?? currentUser.profile.diet,
        familyType: body.familyType ?? currentUser.profile.familyType,
        familyValues: body.familyValues ?? currentUser.profile.familyValues,
        fatherOccupation: body.fatherOccupation ?? currentUser.profile.fatherOccupation,
        motherOccupation: body.motherOccupation ?? currentUser.profile.motherOccupation,
        brothersCount: body.brothersCount !== undefined ? Number(body.brothersCount) : currentUser.profile.brothersCount,
        sistersCount: body.sistersCount !== undefined ? Number(body.sistersCount) : currentUser.profile.sistersCount,
        about: body.about ?? currentUser.profile.about,
      }
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}