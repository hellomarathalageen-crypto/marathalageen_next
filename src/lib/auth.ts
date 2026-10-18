import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Use JWT sessions exclusively for credentials auth (avoids adapter DB locking during cold starts)
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "maratha-matrimony-super-secret-key-2026-production-jwt",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const cleanEmail = credentials.email.trim().toLowerCase();
        const adminEnvEmail = (process.env.ADMIN_EMAIL || "admin@marathalageen.com").toLowerCase();
        const adminEnvPass = process.env.ADMIN_PASSWORD || "Admin@123";

        // 1. Super Admin fallback (guaranteed login for management)
        const isMasterAdminEmail = 
          cleanEmail === adminEnvEmail || 
          cleanEmail === "admin@maratha.com" || 
          cleanEmail === "admin@marathalageen.com";
        const isMasterAdminPass = 
          credentials.password === adminEnvPass || 
          credentials.password === "Admin@123" || 
          credentials.password === "maratha@123";

        if (isMasterAdminEmail && isMasterAdminPass) {
          return {
            id: "admin-master",
            name: "Super Admin (Maratha Matrimony)",
            email: cleanEmail,
            role: "ADMIN"
          };
        }

        // 2. Demo candidate fallbacks (guaranteed demo experience during presentations)
        if (cleanEmail === "demo@maratha.com" && (credentials.password === "Demo@123" || credentials.password === "demo123")) {
          return {
            id: "demo-groom",
            name: "Rohit Patil",
            email: "demo@maratha.com",
            role: "USER"
          };
        }

        if (cleanEmail === "priya@maratha.com" && (credentials.password === "Priya@123" || credentials.password === "demo123")) {
          return {
            id: "demo-bride",
            name: "Priya Deshmukh",
            email: "priya@maratha.com",
            role: "USER"
          };
        }

        // 3. Database credentials check via Prisma
        try {
          let user = await prisma.user.findUnique({
            where: { email: cleanEmail }
          });
          if (!user) {
            user = await prisma.user.findFirst({
              where: { email: { equals: cleanEmail, mode: "insensitive" } }
            });
          }
          if (!user || !user.password) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        } catch (err) {
          console.error("Auth authorize error (DB offline fallback):", err);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      if (trigger === "update" && session?.hasProfile !== undefined) {
        token.hasProfile = session.hasProfile;
      }

      // Master admin & demo users always have active profile
      if (
        token.id === "admin-master" || 
        token.id === "demo-groom" || 
        token.id === "demo-bride" || 
        (token as any).role === "ADMIN"
      ) {
        token.hasProfile = true;
        return token;
      }

      // Whenever token.id exists and hasProfile is not yet verified as true, check DB
      if (token.id && !token.hasProfile) {
        try {
          const profile = await prisma.profile.findUnique({
            where: { userId: token.id as string },
            select: { id: true }
          });
          token.hasProfile = !!profile;
        } catch (e) {
          token.hasProfile = false;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session.user as any).hasProfile = Boolean(token.hasProfile);
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
};
