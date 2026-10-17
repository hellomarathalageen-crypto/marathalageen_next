import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { 
  getAllPreRegistrations, 
  getPreRegistrationStats, 
  generatePreRegistrationsCsv
} from "@/lib/preregistration";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized administrator access" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");
    const query = searchParams.get("query")?.toLowerCase().trim();
    const district = searchParams.get("district");
    const gender = searchParams.get("gender");
    const caste = searchParams.get("caste");

    let records = getAllPreRegistrations();

    // Filters
    if (query) {
      records = records.filter((r) => {
        const name = `${r.fullName || ""} ${r.surname || ""}`.toLowerCase();
        const mob = (r.mobile || "").toLowerCase();
        const wa = (r.whatsapp || "").toLowerCase();
        const pass = (r.priorityPass || "").toLowerCase();
        const dist = (r.district || "").toLowerCase();
        const email = (r.email || "").toLowerCase();
        return (
          name.includes(query) ||
          mob.includes(query) ||
          wa.includes(query) ||
          pass.includes(query) ||
          dist.includes(query) ||
          email.includes(query)
        );
      });
    }

    if (district && district !== "All") {
      records = records.filter(r => r.district?.toLowerCase() === district.toLowerCase());
    }

    if (gender && gender !== "All") {
      records = records.filter(r => r.gender?.toLowerCase() === gender.toLowerCase());
    }

    if (caste && caste !== "All") {
      records = records.filter(r => r.caste?.toLowerCase() === caste.toLowerCase());
    }

    // CSV Direct Download
    if (format === "csv") {
      const csv = generatePreRegistrationsCsv(records);
      const filename = `maratha_preregistrations_${new Date().toISOString().slice(0, 10)}.csv`;

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    const stats = getPreRegistrationStats();

    return NextResponse.json({
      success: true,
      stats,
      totalCount: records.length,
      records,
    });
  } catch (error: any) {
    console.error("Admin preregistrations API error:", error);
    return NextResponse.json({ error: "Failed to fetch pre-registrations" }, { status: 500 });
  }
}
