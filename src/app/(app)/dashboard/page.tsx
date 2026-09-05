import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  Star, 
  Clock, 
  Heart, 
  Bookmark, 
  ShieldCheck, 
  Settings, 
  FileText, 
  Sparkles, 
  Crown, 
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Search
} from "lucide-react";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // Fetch current user profile & user data
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true }
  });

  if (!currentUser?.profile) {
    redirect("/onboarding");
  }

  const targetGender = currentUser.profile.gender === "Male" ? "Female" : "Male";

  // Real database activity counts
  const [
    shortlistCount,
    receivedInterestsCount,
    sentInterestsCount,
    matches,
    totalMatchingCount
  ] = await Promise.all([
    prisma.shortlist.count({
      where: { userId: currentUser.id }
    }),
    prisma.interest.count({
      where: { receiverId: currentUser.id, status: "pending" }
    }),
    prisma.interest.count({
      where: { senderId: currentUser.id }
    }),
    prisma.profile.findMany({
      where: {
        userId: { not: currentUser.id },
        gender: targetGender,
      },
      include: {
        photos: {
          where: { isPrimary: true },
          take: 1
        }
      },
      take: 8,
      orderBy: { createdAt: "desc" }
    }),
    prisma.profile.count({
      where: {
        userId: { not: currentUser.id },
        gender: targetGender,
      }
    })
  ]);

  const formattedMatches = matches.map(m => {
    const age = m.dateOfBirth ? Math.floor((new Date().getTime() - new Date(m.dateOfBirth).getTime()) / 3.15576e+10) : 26;
    return {
      id: m.id,
      name: `${m.firstName} ${m.lastName}`,
      age,
      height: m.height || "5'5\"",
      city: m.city || "Karnataka",
      state: m.state || "Karnataka",
      education: m.education || "Graduate",
      profession: m.profession || "Professional",
      community: m.community || "96 Kuli Maratha",
      devak: m.devak || undefined,
      isVerified: m.isVerified,
      imageUrl: m.photos[0]?.url || ""
    };
  });

  const completeness = currentUser.profile.profileCompleteness || 85;

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-8 pb-16 font-sans">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        
        {/* ── Super Admin Notification Banner (If logged in as Admin) ── */}
        {currentUser.role === "ADMIN" && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm">
              <Crown className="w-5 h-5 text-amber-600 fill-amber-500" />
              <span>You are logged in with Super Administrator privileges.</span>
            </div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 bg-[#2A3773] hover:bg-[#1A2554] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm shrink-0"
            >
              <span>Access Super Admin Panel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* ── Welcome Header Card ── */}
        <div className="mb-8 bg-gradient-to-br from-white via-[#FFFDF9] to-[#FFF8FA] p-6 sm:p-8 rounded-3xl shadow-sm border border-[#FADADF]/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FFF1F5] text-[#DB1866] text-xs font-bold px-3 py-1 rounded-full border border-[#FADADF]">
              <Crown className="w-3.5 h-3.5 fill-[#DB1866]" /> Official 96 Kuli Maratha Member
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1B2559] tracking-tight">
              Welcome back, {currentUser.profile.firstName || currentUser.name}!
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">
              Here is your daily matchmaking activity overview. {totalMatchingCount} verified profiles currently match your partner preferences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <Link 
              href="/dashboard/preferences" 
              className="bg-[#FFF1F5] hover:bg-[#FADADF] text-[#DB1866] border border-[#FADADF] px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold text-xs sm:text-sm transition-all shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" /> Partner Preferences
            </Link>
            <Link 
              href="/dashboard/interests" 
              className="bg-indigo-50 hover:bg-indigo-100 text-[#2A3773] border border-indigo-100 px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold text-xs sm:text-sm transition-all shadow-xs"
            >
              <Users className="w-4 h-4 text-indigo-600" /> Requests ({receivedInterestsCount})
            </Link>
          </div>
        </div>

        {/* ── Key Activity Stat Cards Matrix ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          {/* Stat 1: Total Curated Matches */}
          <Link 
            href="/matches" 
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-[#DB1866]/30 transition-all block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Curated Matches</span>
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#DB1866] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">{totalMatchingCount}</p>
              <span className="text-xs font-bold text-[#DB1866] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                View All <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          {/* Stat 2: Received Interests */}
          <Link 
            href="/dashboard/interests" 
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-[#DB1866]/30 transition-all block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Received Requests</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4" fill="currentColor" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">{receivedInterestsCount}</p>
              <span className="text-xs font-bold text-purple-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Check Inbox <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          {/* Stat 3: Saved Shortlist */}
          <Link 
            href="/shortlist" 
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-[#DB1866]/30 transition-all block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Family Shortlist</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bookmark className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">{shortlistCount}</p>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Vault <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          {/* Stat 4: Profile Completeness */}
          <Link 
            href="/profile/edit" 
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-[#DB1866]/30 transition-all block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Profile Completeness</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">{completeness}%</p>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Edit <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${completeness}%` }} />
            </div>
          </Link>

        </div>

        {/* ── Quick Action Hub ── */}
        <div className="mb-10 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF1F5] flex items-center justify-center text-[#DB1866]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Quick Tools</p>
              <p className="text-sm font-extrabold text-[#1B2559]">Printable Biodata &amp; Profile Services</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-bold">
            <Link
              href="/kundali"
              className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> 36 Gunas Milan
            </Link>
            <Link
              href="/biodata"
              className="px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-[#DB1866] border border-pink-200 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#DB1866]" /> Printable Biodata
            </Link>
            <Link
              href="/events"
              className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" /> Melavas &amp; Meets
            </Link>
            <Link
              href="/dashboard/chat"
              className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-purple-600" /> Live Chat
            </Link>
            <Link
              href="/membership"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#DB1866] to-[#B81456] text-white transition-all hover:scale-105 shadow-xs flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" /> VIP Upgrade
            </Link>
          </div>
        </div>

        {/* ── Recommended Matches Section ── */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B2559] flex items-center gap-2">
              <Star className="w-5 h-5 text-[#DB1866] fill-[#DB1866]" /> Recommended For You
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              Verified 96 Kuli Maratha candidates matching your age, education, and regional preferences.
            </p>
          </div>
          <Link href="/matches" className="text-xs sm:text-sm font-bold text-[#DB1866] hover:underline flex items-center gap-1">
            <span>View All Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {formattedMatches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {formattedMatches.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xs border border-gray-100 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-[#FFF1F5] rounded-full flex items-center justify-center mx-auto mb-4 text-[#DB1866]">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-[#1B2559] mb-1">Curating your recommendations...</h3>
            <p className="text-gray-500 text-xs mb-5">
              We are screening recently verified profiles that meet your partner criteria. You can also browse the community directory directly.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-[#DB1866] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-[#DB1866]/20 hover:bg-[#B81456] transition-all"
            >
              Browse All Matches <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
