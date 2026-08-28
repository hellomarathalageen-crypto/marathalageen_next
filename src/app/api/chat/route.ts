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
    const otherUserId = searchParams.get("userId");
    
    if (!otherUserId) return NextResponse.json({ message: "Missing userId" }, { status: 400 });

    // Verify they are accepted matches
    const interest = await prisma.interest.findFirst({
      where: {
        status: "accepted",
        OR: [
          { senderId: currentUser.id, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: currentUser.id }
        ]
      }
    });

    if (!interest) {
      return NextResponse.json({ message: "Must be a match to chat" }, { status: 403 });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUser.id, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: currentUser.id }
        ]
      },
      orderBy: { createdAt: "asc" }
    });

    // Mark received messages as read
    const unreadIds = messages.filter(m => m.receiverId === currentUser.id && !m.isRead).map(m => m.id);
    if (unreadIds.length > 0) {
      await prisma.message.updateMany({
        where: { id: { in: unreadIds } },
        data: { isRead: true }
      });
    }

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { receiverId, content } = await req.json();
    if (!receiverId || !content) return NextResponse.json({ message: "Missing data" }, { status: 400 });

    const sender = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!sender) return NextResponse.json({ message: "Not found" }, { status: 404 });

    // Verify they are accepted matches
    const interest = await prisma.interest.findFirst({
      where: {
        status: "accepted",
        OR: [
          { senderId: sender.id, receiverId },
          { senderId: receiverId, receiverId: sender.id }
        ]
      }
    });

    if (!interest) {
      return NextResponse.json({ message: "Must be a match to chat" }, { status: 403 });
    }

    const message = await prisma.message.create({
      data: {
        senderId: sender.id,
        receiverId,
        content
      }
    });

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ message: "Error sending message" }, { status: 500 });
  }
}
