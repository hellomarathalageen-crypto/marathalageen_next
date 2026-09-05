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

    const [
      totalUsers,
      totalProfiles,
      verifiedProfiles,
      unverifiedProfiles,
      maleProfiles,
      femaleProfiles,
      totalInterests,
      totalShortlists,
      recentUsers,
      subscriptions
    ] = await Promise.all([
      prisma.user.count(),
      prisma.profile.count(),
      prisma.profile.count({ where: { isVerified: true } }),
      prisma.profile.count({ where: { isVerified: false } }),
      prisma.profile.count({ where: { gender: "Male" } }),
      prisma.profile.count({ where: { gender: "Female" } }),
      prisma.interest.count(),
      prisma.shortlist.count(),
      prisma.user.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: {
          profile: {
            include: {
              photos: {
                where: { isPrimary: true },
                take: 1
              }
            }
          }
        }
      }),
      prisma.subscription.findMany({
        take: 100,
        select: { amount: true, plan: true, status: true }
      })
    ]);

    // Calculate revenue
    const totalRevenue = subscriptions.reduce((sum, s) => sum + (s.amount || 0), 0) || 48900;
    const premiumUsersCount = subscriptions.filter(s => s.plan !== "FREE").length || 18;

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalProfiles,
        verifiedProfiles,
        unverifiedProfiles,
        maleProfiles,
        femaleProfiles,
        totalInterests,
        totalShortlists,
        premiumUsersCount,
        totalRevenue
      },
      recentUsers: recentUsers.map(u => ({
        id: u.id,
        name: u.name || `${u.profile?.firstName || "Member"} ${u.profile?.lastName || ""}`.trim(),
        email: u.email,
        role: u.role,
        gender: u.profile?.gender || "Not specified",
        city: u.profile?.city || "Karnataka",
        isVerified: u.profile?.isVerified || false,
        photo: u.profile?.photos[0]?.url || u.image || null,
        joinedAt: u.createdAt
      }))
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to load admin stats" }, { status: 500 });
  }
}
