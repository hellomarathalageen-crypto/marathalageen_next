import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendMatrimonyAlert } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { plan = "PREMIUM", paymentId = "pay_test_direct", orderId } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true }
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isPlus = plan === "PREMIUM_PLUS";
    const amount = isPlus ? 1999 : 999;
    const durationDays = 90; // 3 months

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + durationDays);

    // Create or update subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: plan,
        status: "ACTIVE",
        amount: amount,
        startDate: startDate,
        endDate: endDate,
      }
    });

    // Also mark profile as verified if Premium Plus
    if (isPlus && user.profile) {
      await prisma.profile.update({
        where: { id: user.profile.id },
        data: { isVerified: true }
      });
    }

    // Send Welcome Email Notification
    if (user.email) {
      sendMatrimonyAlert({
        type: "WELCOME_PREMIUM",
        recipientEmail: user.email,
        recipientName: user.profile ? user.profile.firstName : (user.name || "Member"),
      }).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      message: "Subscription activated successfully!",
      subscription: {
        id: subscription.id,
        plan: subscription.plan,
        endDate: subscription.endDate
      }
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ message: "Payment verification failed" }, { status: 500 });
  }
}
