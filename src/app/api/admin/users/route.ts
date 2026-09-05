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
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const filter = searchParams.get("filter") || "all"; // all, verified, pending, admin
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { profile: { firstName: { contains: search, mode: "insensitive" } } },
        { profile: { lastName: { contains: search, mode: "insensitive" } } },
        { profile: { city: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (filter === "verified") {
      where.profile = { isVerified: true };
    } else if (filter === "pending") {
      where.profile = { isVerified: false };
    } else if (filter === "admin") {
      where.role = "ADMIN";
    }

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          profile: {
            include: {
              photos: {
                where: { isPrimary: true },
                take: 1
              }
            }
          },
          subscriptions: {
            take: 1,
            orderBy: { createdAt: "desc" }
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    const formattedUsers = users.map(u => ({
      id: u.id,
      name: u.name || `${u.profile?.firstName || "Member"} ${u.profile?.lastName || ""}`.trim(),
      email: u.email,
      role: u.role,
      profileId: u.profile?.id || null,
      gender: u.profile?.gender || "Not specified",
      city: u.profile?.city || "Karnataka",
      education: u.profile?.education || "Graduate",
      profession: u.profile?.profession || "Professional",
      isVerified: u.profile?.isVerified || false,
      plan: u.subscriptions[0]?.plan || (u.role === "ADMIN" ? "ADMIN" : "FREE"),
      photo: u.profile?.photos[0]?.url || u.image || null,
      createdAt: u.createdAt
    }));

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error("Admin users GET error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, isVerified, role } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Update role if provided
    if (role !== undefined) {
      await prisma.user.update({
        where: { id: userId },
        data: { role }
      });
    }

    // Update verification if provided
    if (isVerified !== undefined) {
      const userWithProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true }
      });

      if (userWithProfile?.profile) {
        await prisma.profile.update({
          where: { id: userWithProfile.profile.id },
          data: { isVerified: Boolean(isVerified) }
        });
      }
    }

    return NextResponse.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Admin users PUT error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Prevent admin from deleting themselves
    if (userId === (session.user as any)?.id) {
      return NextResponse.json({ error: "Cannot delete your own admin account" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin users DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
