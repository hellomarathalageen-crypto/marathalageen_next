import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
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
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !user.password) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) {
          return null;
        }
        return user;
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
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
};
