import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { calculateDistanceKm, getCityCoordinates, findNearestCity } from "@/lib/geo";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);

    // Flexible age and birth date parameters
    const minAgeParam = searchParams.get("minAge");
    const maxAgeParam = searchParams.get("maxAge");
    const birthYearMinParam = searchParams.get("birthYearMin");
    const birthYearMaxParam = searchParams.get("birthYearMax");
    const dobMinParam = searchParams.get("dobMin");
    const dobMaxParam = searchParams.get("dobMax");

    const genderParam = searchParams.get("gender");
    const cityParam = searchParams.get("city");
    const communityParam = searchParams.get("community");
    const maritalStatusParam = searchParams.get("maritalStatus");
    const educationParam = searchParams.get("education");

    // Geo Live Location Parameters
    const userLatParam = searchParams.get("userLat");
    const userLngParam = searchParams.get("userLng");
    const userLat = userLatParam ? parseFloat(userLatParam) : null;
    const userLng = userLngParam ? parseFloat(userLngParam) : null;
    const maxDistanceParam = searchParams.get("maxDistanceKm");
    const maxDistanceKm = maxDistanceParam ? parseFloat(maxDistanceParam) : null;

    let currentUserId: string | null = null;
    let targetGender: string | null = genderParam;

    if (session?.user?.email) {
      const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { profile: true }
      });
      if (currentUser) {
        currentUserId = currentUser.id;
        if (!targetGender && currentUser.profile?.gender) {
          targetGender = currentUser.profile.gender === "Male" ? "Female" : "Male";
        }
      }
    }

    // Default to Female if neither specified nor inferred
    if (!targetGender) {
      targetGender = "Female";
    }

    // Calculate birth date ranges from DOB, birth year, or age
    const today = new Date();
    let minDate: Date;
    let maxDate: Date;

    if (dobMinParam && dobMaxParam) {
      minDate = new Date(dobMinParam);
      maxDate = new Date(dobMaxParam);
    } else if (birthYearMinParam && birthYearMaxParam) {
      minDate = new Date(parseInt(birthYearMinParam), 0, 1);
      maxDate = new Date(parseInt(birthYearMaxParam), 11, 31);
    } else {
      const minAge = parseInt(minAgeParam || "18");
      const maxAge = parseInt(maxAgeParam || "70");
      minDate = new Date(today.getFullYear() - maxAge - 1, today.getMonth(), today.getDate());
      maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    }

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

    // Filter by city if specified and not "all" / "live"
    if (cityParam && cityParam !== "all" && cityParam !== "Any" && !cityParam.startsWith("live:")) {
      whereClause.city = { contains: cityParam, mode: "insensitive" };
    }

    if (communityParam && communityParam !== "all" && communityParam !== "Any") {
      whereClause.community = { contains: communityParam, mode: "insensitive" };
    }

    if (maritalStatusParam && maritalStatusParam !== "all" && maritalStatusParam !== "Any") {
      whereClause.maritalStatus = { contains: maritalStatusParam, mode: "insensitive" };
    }

    if (educationParam && educationParam !== "all" && educationParam !== "Any") {
      whereClause.education = { contains: educationParam, mode: "insensitive" };
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
      take: 50
    });

    let formattedMatches = matches.map(m => {
      const age = m.dateOfBirth
        ? Math.floor((new Date().getTime() - new Date(m.dateOfBirth).getTime()) / 3.15576e+10)
        : 26;

      let distanceKm: number | undefined;

      // Compute live distance if user coordinates provided
      if (userLat !== null && userLng !== null && !isNaN(userLat) && !isNaN(userLng)) {
        const cityCoords = getCityCoordinates(m.city);
        if (cityCoords) {
          distanceKm = calculateDistanceKm(userLat, userLng, cityCoords.lat, cityCoords.lng);
        } else {
          // Default distance fallback if city unmapped
          distanceKm = 45;
        }
      }

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
        imageUrl: m.photos[0]?.url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
        distanceKm
      };
    });

    // Proximity Sorting Algorithm: If live GPS coordinates exist, sort by nearest distance first
    if (userLat !== null && userLng !== null && !isNaN(userLat) && !isNaN(userLng)) {
      formattedMatches.sort((a, b) => {
        const distA = a.distanceKm !== undefined ? a.distanceKm : Infinity;
        const distB = b.distanceKm !== undefined ? b.distanceKm : Infinity;
        return distA - distB;
      });

      // Filter by max distance if requested
      if (maxDistanceKm && !isNaN(maxDistanceKm)) {
        formattedMatches = formattedMatches.filter(
          m => m.distanceKm !== undefined && m.distanceKm <= maxDistanceKm
        );
      }
    }

    const nearestHub = (userLat !== null && userLng !== null && !isNaN(userLat) && !isNaN(userLng))
      ? findNearestCity(userLat, userLng)
      : null;

    return NextResponse.json({
      matches: formattedMatches,
      locationContext: nearestHub ? {
        userLat,
        userLng,
        nearestCity: nearestHub.cityName,
        distanceToHubKm: nearestHub.distanceKm,
        state: nearestHub.state
      } : null
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

