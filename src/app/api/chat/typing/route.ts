import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// In-memory global store for active typing status across server instances
const globalTypingStore = globalThis as unknown as {
  activeTypingMap?: Map<string, number>;
};

if (!globalTypingStore.activeTypingMap) {
  globalTypingStore.activeTypingMap = new Map<string, number>();
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ isTyping: false });
    }

    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get("userId");
    if (!otherUserId) {
      return NextResponse.json({ isTyping: false });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });
    if (!currentUser) return NextResponse.json({ isTyping: false });

    // Key: otherUser is typing to currentUser
    const key = `${otherUserId}->${currentUser.id}`;
    const lastPing = globalTypingStore.activeTypingMap?.get(key);

    // If pinged within the last 3.5 seconds, other user is actively typing
    const isTyping = Boolean(lastPing && Date.now() - lastPing < 3500);

    return NextResponse.json({ isTyping });
  } catch (error) {
    return NextResponse.json({ isTyping: false });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { receiverId, isTyping } = await req.json();
    if (!receiverId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const sender = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });
    if (!sender) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const key = `${sender.id}->${receiverId}`;
    if (isTyping) {
      globalTypingStore.activeTypingMap?.set(key, Date.now());
    } else {
      globalTypingStore.activeTypingMap?.delete(key);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
