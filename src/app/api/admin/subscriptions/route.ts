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

    const subscriptions = await prisma.subscription.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: {
              select: { firstName: true, lastName: true, city: true }
            }
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      subscriptions: subscriptions.map(s => ({
        id: s.id,
        userId: s.userId,
        userName: s.user?.name || `${s.user?.profile?.firstName || "Member"} ${s.user?.profile?.lastName || ""}`.trim(),
        userEmail: s.user?.email,
        plan: s.plan,
        status: s.status,
        amount: s.amount,
        startDate: s.startDate,
        endDate: s.endDate,
        createdAt: s.createdAt
      }))
    });
  } catch (error) {
    console.error("Admin subscriptions GET error:", error);
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, plan, amount, durationMonths } = body;

    if (!userId || !plan) {
      return NextResponse.json({ error: "userId and plan are required" }, { status: 400 });
    }

    const months = durationMonths || 6;
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        status: "ACTIVE",
        amount: amount || 4999,
        startDate: new Date(),
        endDate
      }
    });

    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    console.error("Admin subscriptions POST error:", error);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
