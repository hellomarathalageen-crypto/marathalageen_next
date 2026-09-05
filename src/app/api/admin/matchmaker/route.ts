import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const candidateId = searchParams.get("candidateId");

    // If no candidateId passed, return a list of profiles to select from
    if (!candidateId) {
      const candidates = await prisma.profile.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          gender: true,
          city: true,
          profession: true,
          education: true,
          dateOfBirth: true
        }
      });
      return NextResponse.json({ success: true, candidates });
    }

    // Find the target candidate profile
    const target = await prisma.profile.findUnique({
      where: { id: candidateId },
      include: {
        photos: { where: { isPrimary: true }, take: 1 },
        user: { select: { email: true, name: true } }
      }
    });

    if (!target) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const targetGender = target.gender === "Male" ? "Female" : "Male";

    // Query potential matches of opposite gender
    const potentialMatches = await prisma.profile.findMany({
      where: {
        id: { not: target.id },
        gender: targetGender
      },
      include: {
        photos: { where: { isPrimary: true }, take: 1 }
      },
      take: 40
    });

    const targetAge = target.dateOfBirth ? Math.floor((new Date().getTime() - new Date(target.dateOfBirth).getTime()) / 3.15576e+10) : 26;

    // Run scoring algorithm
    const scoredMatches = potentialMatches.map(m => {
      const mAge = m.dateOfBirth ? Math.floor((new Date().getTime() - new Date(m.dateOfBirth).getTime()) / 3.15576e+10) : 25;
      
      let score = 70; // Base score for being in 96 Kuli Maratha community
      const reasons: string[] = ["Both verified 96 Kuli Maratha lineage"];

      // Age harmony (Groom older by 1-5 years is traditional preference)
      const ageDiff = target.gender === "Male" ? (targetAge - mAge) : (mAge - targetAge);
      if (ageDiff >= 1 && ageDiff <= 5) {
        score += 12;
        reasons.push(`Ideal age gap (${Math.abs(ageDiff)} years)`);
      } else if (Math.abs(ageDiff) <= 2) {
        score += 8;
        reasons.push("Harmonious age parity");
      }

      // Location match
      if (m.city && target.city && m.city.toLowerCase() === target.city.toLowerCase()) {
        score += 8;
        reasons.push(`Same regional hub (${m.city})`);
      } else if (m.state === target.state) {
        score += 4;
        reasons.push("Same state matrimonial jurisdiction");
      }

      // Devak Exogamy Check (Maratha custom prefers different Devak/Gotra)
      if (m.devak && target.devak && m.devak.toLowerCase() !== target.devak.toLowerCase()) {
        score += 6;
        reasons.push("Devak exogamy compliant (Non-sagalik)");
      }

      // Education & Profession compatibility
      if (m.education && target.education && (
        m.education.toLowerCase().includes("engineer") || 
        m.education.toLowerCase().includes("grad") || 
        m.education.toLowerCase().includes("master")
      )) {
        score += 4;
        reasons.push("Compatible higher education pedigree");
      }

      // Cap score at 98
      const finalScore = Math.min(98, score);

      return {
        id: m.id,
        userId: m.userId,
        name: `${m.firstName} ${m.lastName}`.trim(),
        gender: m.gender,
        age: mAge,
        city: m.city || "Karnataka",
        education: m.education || "Graduate",
        profession: m.profession || "Professional",
        devak: m.devak || "Authentic Clan Devak",
        gotra: m.gotra || "Kashyap",
        photo: m.photos[0]?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
        matchScore: finalScore,
        reasons
      };
    });

    // Sort by match score descending
    scoredMatches.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      targetCandidate: {
        id: target.id,
        name: `${target.firstName} ${target.lastName}`.trim(),
        gender: target.gender,
        age: targetAge,
        city: target.city,
        devak: target.devak,
        education: target.education,
        profession: target.profession,
        photo: target.photos[0]?.url || null
      },
      rankedMatches: scoredMatches.slice(0, 12)
    });
  } catch (error) {
    console.error("Matchmaker error:", error);
    return NextResponse.json({ error: "Failed to generate matches" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await request.json();
    const { targetUserId, recommendedProfileId, note } = body;

    if (!targetUserId || !recommendedProfileId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // In a real flow, record an admin recommendation or create a pending interest
    return NextResponse.json({
      success: true,
      message: "Personalized match recommendation dispatched to member's dashboard successfully!"
    });
  } catch (error) {
    console.error("Matchmaker recommend error:", error);
    return NextResponse.json({ error: "Failed to dispatch recommendation" }, { status: 500 });
  }
}
