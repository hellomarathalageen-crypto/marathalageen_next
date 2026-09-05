import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendMatrimonyAlert } from "@/lib/notifications";

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

    const sender = await prisma.user.findUnique({ 
      where: { email: session.user.email },
      include: { profile: true }
    });
    if (!sender) return NextResponse.json({ message: "Sender not found" }, { status: 404 });

    let targetUserId = receiverId;
    let receiver = await prisma.user.findUnique({ 
      where: { id: targetUserId },
      include: { profile: true }
    });

    if (!receiver) {
      const targetProfile = await prisma.profile.findUnique({
        where: { id: receiverId },
        select: { userId: true }
      });
      if (targetProfile) {
        targetUserId = targetProfile.userId;
        receiver = await prisma.user.findUnique({
          where: { id: targetUserId },
          include: { profile: true }
        });
      }
    }

    if (!receiver) return NextResponse.json({ message: "Receiver not found" }, { status: 404 });
    if (sender.id === targetUserId) return NextResponse.json({ message: "Cannot send interest to yourself" }, { status: 400 });

    // Check if interest already exists
    const existing = await prisma.interest.findFirst({
      where: {
        OR: [
          { senderId: sender.id, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: sender.id }
        ]
      }
    });

    if (existing) {
      return NextResponse.json({ message: "Interest already exists" }, { status: 400 });
    }

    const interest = await prisma.interest.create({
      data: {
        senderId: sender.id,
        receiverId: targetUserId,
        status: "pending"
      }
    });

    // Notify receiver via email
    if (receiver && receiver.email) {
      const senderDisplayName = sender.profile ? `${sender.profile.firstName} ${sender.profile.lastName}` : (sender.name || "A member");
      const receiverDisplayName = receiver.profile ? `${receiver.profile.firstName}` : (receiver.name || "Member");

      sendMatrimonyAlert({
        type: "INTEREST_RECEIVED",
        recipientEmail: receiver.email,
        recipientName: receiverDisplayName,
        actorName: senderDisplayName,
        actorProfileId: sender.profile?.id,
      }).catch(console.error);
    }

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

    const user = await prisma.user.findUnique({ 
      where: { email: session.user.email },
      include: { profile: true }
    });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const interest = await prisma.interest.findUnique({ 
      where: { id: interestId },
      include: {
        sender: { include: { profile: true } }
      }
    });
    if (!interest) return NextResponse.json({ message: "Interest not found" }, { status: 404 });

    if (interest.receiverId !== user.id) {
      return NextResponse.json({ message: "Unauthorized to update this interest" }, { status: 403 });
    }

    const updated = await prisma.interest.update({
      where: { id: interestId },
      data: { status }
    });

    if (status === "accepted" && interest.sender && interest.sender.email) {
      const accepterName = user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : (user.name || "Member");
      const senderName = interest.sender.profile ? interest.sender.profile.firstName : (interest.sender.name || "Member");

      sendMatrimonyAlert({
        type: "INTEREST_ACCEPTED",
        recipientEmail: interest.sender.email,
        recipientName: senderName,
        actorName: accepterName,
        actorProfileId: user.profile?.id,
      }).catch(console.error);
    }

    return NextResponse.json({ interest: updated });
  } catch (error) {
    return NextResponse.json({ message: "Error updating interest" }, { status: 500 });
  }
}
