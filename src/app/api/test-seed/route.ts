import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "priya.test@maratha.com";
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Test profile already exists!" });
    }

    const hashedPassword = await bcrypt.hash("Password123", 10);
    
    const user = await prisma.user.create({
      data: {
        name: "Priya Patil",
        email: email,
        password: hashedPassword,
        role: "USER",
        profile: {
          create: {
            firstName: "Priya",
            lastName: "Patil",
            gender: "Female",
            dateOfBirth: new Date("1998-05-15"),
            maritalStatus: "never-married",
            city: "Pune",
            state: "Maharashtra",
            country: "India",
            religion: "Hindu",
            community: "96-kuli",
            education: "Masters",
            profession: "Software Engineer",
            annualIncome: "7L-15L",
            height: "5'5\"",
            profileCompleteness: 100,
          }
        }
      }
    });

    return NextResponse.json({ message: "Test profile created successfully", email: user.email });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create test profile" }, { status: 500 });
  }
}
