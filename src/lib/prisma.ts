import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

function getEffectiveConnectionString(): string {
  let url = process.env.DATABASE_URL || "";
  
  // If the URL is the direct IPv6 Supabase host (which fails on Vercel AWS Lambda serverless runtime),
  // automatically transform it into the IPv4 Supabase connection pooler host!
  if (url.includes("db.nhyoklrxsllmgweswyck.supabase.co")) {
    url = url
      .replace("db.nhyoklrxsllmgweswyck.supabase.co:6543", "aws-0-ap-southeast-1.pooler.supabase.com:6543")
      .replace("db.nhyoklrxsllmgweswyck.supabase.co:5432", "aws-0-ap-southeast-1.pooler.supabase.com:6543")
      .replace("db.nhyoklrxsllmgweswyck.supabase.co", "aws-0-ap-southeast-1.pooler.supabase.com:6543")
      .replace("postgres:", "postgres.nhyoklrxsllmgweswyck:");
  }

  return url;
}

const connectionString = getEffectiveConnectionString();

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
  new PrismaClient({ adapter, log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
