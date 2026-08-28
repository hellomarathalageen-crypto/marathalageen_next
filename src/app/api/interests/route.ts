import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!currentUser) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "received"; // 'received', 'sent', 'accepted'

    let whereClause = {};
    if (type === "received") {
      whereClause = { receiverId: currentUser.id, status: "pending" };
    } else if (type === "sent") {
      whereClause = { senderId: currentUser.id, status: "pending" };
    } else if (type === "accepted") {
      whereClause = {
        OR: [
          { receiverId: currentUser.id, status: "accepted" },
          { senderId: currentUser.id, status: "accepted" }
        ]
      };
    }

    const interests = await prisma.interest.findMany({
      where: whereClause,
      include: {
        sender: { include: { profile: { include: { photos: { where: { isPrimary: true }, take: 1 } } } } },
        receiver: { include: { profile: { include: { photos: { where: { isPrimary: true }, take: 1 } } } } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ interests });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching interests" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { receiverId } = await req.json();
    if (!receiverId) return NextResponse.json({ message: "Missing receiver ID" }, { status: 400 });

    const sender = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!sender) return NextResponse.json({ message: "Sender not found" }, { status: 404 });

    if (sender.id === receiverId) return NextResponse.json({ message: "Cannot send interest to yourself" }, { status: 400 });

    // Check if interest already exists
    const existing = await prisma.interest.findFirst({
      where: {
        OR: [
          { senderId: sender.id, receiverId },
          { senderId: receiverId, receiverId: sender.id }
        ]
      }
    });

    if (existing) {
      return NextResponse.json({ message: "Interest already exists" }, { status: 400 });
    }

    const interest = await prisma.interest.create({
      data: {
        senderId: sender.id,
        receiverId,
        status: "pending"
      }
    });

    return NextResponse.json({ interest });
  } catch (error) {
    return NextResponse.json({ message: "Error sending interest" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { interestId, status } = await req.json(); // status: 'accepted' or 'rejected'
    if (!interestId || !status) return NextResponse.json({ message: "Missing data" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const interest = await prisma.interest.findUnique({ where: { id: interestId } });
    if (!interest) return NextResponse.json({ message: "Interest not found" }, { status: 404 });

    if (interest.receiverId !== user.id) {
      return NextResponse.json({ message: "Unauthorized to update this interest" }, { status: 403 });
    }

    const updated = await prisma.interest.update({
      where: { id: interestId },
      data: { status }
    });

    return NextResponse.json({ interest: updated });
  } catch (error) {
    return NextResponse.json({ message: "Error updating interest" }, { status: 500 });
  }
}
