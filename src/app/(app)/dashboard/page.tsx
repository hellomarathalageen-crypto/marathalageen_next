import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { redirect } from "next/navigation";
import { Users, Star, Clock } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // Fetch current user profile
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true }
  });

  if (!currentUser?.profile) {
    redirect("/onboarding");
  }

  const targetGender = currentUser.profile.gender === "Male" ? "Female" : "Male";

  // Fetch Recommended Matches
  const matches = await prisma.profile.findMany({
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
    take: 6,
    orderBy: { createdAt: 'desc' }
  });

  const formattedMatches = matches.map(m => {
    const age = m.dateOfBirth ? Math.floor((new Date().getTime() - new Date(m.dateOfBirth).getTime()) / 3.15576e+10) : 0;
    return {
      id: m.id,
      name: `${m.firstName} ${m.lastName}`,
      age,
      height: m.height || "Unknown",
      city: m.city || "Unknown",
      state: m.state || "Unknown",
      education: m.education || "Unknown",
      profession: m.profession || "Unknown",
      imageUrl: m.photos[0]?.url || ""
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        
        <div className="mb-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold font-sans text-[#2A3773]">Welcome back, {currentUser.name}!</h1>
            <p className="text-gray-500 mt-1">Here is a quick overview of your profile activity.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="/dashboard/preferences" 
              className="bg-[#FFF1F5] hover:bg-[#FADADF] text-[#DB1866] border border-[#FADADF] px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm transition-colors"
            >
              Partner Preferences
            </a>
            <a 
              href="/dashboard/interests" 
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-100 px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm transition-colors"
            >
              <Users className="w-4 h-4" /> Inbox & Interests
            </a>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-sans text-[#2A3773] flex items-center gap-2">
            <Star className="w-6 h-6 text-[#DB1866]" fill="#DB1866" /> Recommended Matches
          </h2>
          <a href="/search" className="text-sm font-bold text-[#DB1866] hover:underline">View All</a>
        </div>

        {formattedMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {formattedMatches.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold font-sans text-[#2A3773] mb-2">Finding your matches...</h3>
            <p className="text-gray-500">We are currently looking for profiles that match your preferences. Check back later!</p>
          </div>
        )}

      </div>
    </div>
  );
}
