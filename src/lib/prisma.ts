import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

function sanitizeDatabaseUrl(rawUrl?: string): string {
  let url = rawUrl || process.env.DATABASE_URL || "";
  
  if (url.includes("db.nhyoklrxsllmgweswyck.supabase.co")) {
    url = url
      .replace("db.nhyoklrxsllmgweswyck.supabase.co:6543", "aws-0-ap-southeast-1.pooler.supabase.com:6543")
      .replace("db.nhyoklrxsllmgweswyck.supabase.co:5432", "aws-0-ap-southeast-1.pooler.supabase.com:6543")
      .replace("db.nhyoklrxsllmgweswyck.supabase.co", "aws-0-ap-southeast-1.pooler.supabase.com:6543")
      .replace("postgres:", "postgres.nhyoklrxsllmgweswyck:");
  }

  // Ensure pgbouncer is configured for transaction pooler
  if (url.includes("pooler.supabase.com:6543") && !url.includes("pgbouncer=true")) {
    url += (url.includes("?") ? "&" : "?") + "pgbouncer=true";
  }

  return url;
}

const connectionString = sanitizeDatabaseUrl();
process.env.DATABASE_URL = connectionString;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter, log: ["query", "error", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
