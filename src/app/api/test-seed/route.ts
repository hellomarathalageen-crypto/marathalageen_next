import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Test seeding is disabled in production." }, { status: 403 });
}
