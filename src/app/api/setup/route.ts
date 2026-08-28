import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "admin@maratha.com";
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin user already exists" }, { status: 200 });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    const adminUser = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: email,
        password: hashedPassword,
        role: "ADMIN"
      }
    });

    return NextResponse.json({ 
      message: "Admin user created successfully!",
      email: adminUser.email,
      role: adminUser.role 
    }, { status: 201 });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ message: "Error creating admin user" }, { status: 500 });
  }
}
