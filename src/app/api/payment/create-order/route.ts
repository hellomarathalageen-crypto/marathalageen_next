import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Please log in to upgrade", requireLogin: true }, { status: 401 });
    }

    const { plan } = await req.json(); // "PREMIUM" | "PREMIUM_PLUS"
    const isPlus = plan === "PREMIUM_PLUS";
    const amount = isPlus ? 1999 : 999;
    const planName = isPlus ? "Premium Plus (3 Months)" : "Premium (3 Months)";

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true }
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      // Direct Razorpay REST API call (zero SDK overhead)
      const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // paise
          currency: "INR",
          receipt: `rcpt_${Date.now()}_${user.id.slice(-4)}`,
          notes: { userId: user.id, plan }
        })
      });

      if (!response.ok) {
        throw new Error("Razorpay API order creation failed");
      }

      const orderData = await response.json();

      return NextResponse.json({
        orderId: orderData.id,
        amount: amount,
        currency: "INR",
        keyId,
        plan,
        planName,
        user: { name: user.name, email: user.email }
      });
    } else {
      // Seamless Simulator / Direct Checkout Mode
      const mockOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      return NextResponse.json({
        orderId: mockOrderId,
        amount: amount,
        currency: "INR",
        keyId: "rzp_test_simulator",
        plan,
        planName,
        isSimulated: true,
        user: { name: user.name, email: user.email }
      });
    }
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ message: "Failed to initiate payment" }, { status: 500 });
  }
}
