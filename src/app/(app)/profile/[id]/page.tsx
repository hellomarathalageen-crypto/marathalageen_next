import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ProfileView } from "@/components/ui/shared";

export default async function ProfileDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect(`/login?from=${encodeURIComponent(`/profile/${id}`)}`);
  }

  // Verify viewer has completed profile setup
  const viewer = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { 
      role: true, 
      name: true,
      profile: { 
        select: { 
          id: true,
          firstName: true,
          lastName: true,
          gender: true,
          rashi: true,
          nakshatra: true,
          gotra: true,
          devak: true,
          kuldaivat: true,
          manglik: true,
          city: true,
          state: true,
          dateOfBirth: true,
          education: true,
          profession: true
        } 
      } 
    }
  });

  if (!viewer?.profile && viewer?.role !== "ADMIN") {
    redirect("/onboarding");
  }

  // Find profile and include photos and user details
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: {
      photos: { orderBy: { isPrimary: 'desc' } },
      user: { select: { name: true, email: true } }
    }
  });

  if (!profile) {
    notFound();
  }

  // Calculate age from dateOfBirth
  const age = profile.dateOfBirth ? Math.floor((new Date().getTime() - new Date(profile.dateOfBirth).getTime()) / 3.15576e+10) : 26;

  const profileData = {
    id: profile.id,
    userId: profile.userId,
    name: `${profile.firstName} ${profile.lastName}`,
    age,
    height: profile.height || "Not specified",
    maritalStatus: profile.maritalStatus || "Never Married",
    community: profile.community || "96 Kuli Maratha",
    devak: profile.devak || "Not specified",
    gotra: profile.gotra || "Not specified",
    kuldaivat: profile.kuldaivat || "Not specified",
    nativePlace: profile.nativePlace || profile.city || "Not specified",
    rashi: profile.rashi || "Not specified",
    nakshatra: profile.nakshatra || "Not specified",
    manglik: profile.manglik || "Non-Manglik",
    religion: profile.religion || "Hindu",
    motherTongue: profile.motherTongue || "Marathi",
    city: profile.city || "Karnataka",
    state: profile.state || "Karnataka",
    country: profile.country || "India",
    education: profile.education || "Graduate",
    college: profile.college || "Reputed University",
    profession: profile.profession || "Professional",
    company: profile.company || "Private Organization",
    income: profile.annualIncome || "Confidential",
    diet: profile.diet || "Non-Veg",
    drinking: profile.drinking || "No",
    smoking: profile.smoking || "No",
    familyType: profile.familyType || "Nuclear Family",
    familyValues: profile.familyValues || "Moderate & Traditional",
    fatherStatus: profile.fatherOccupation || "Business / Employed",
    motherStatus: profile.motherOccupation || "Homemaker",
    brothers: profile.brothersCount ? `${profile.brothersCount} (${profile.brothersMarried || 0} married)` : "None",
    sisters: profile.sistersCount ? `${profile.sistersCount} (${profile.sistersMarried || 0} married)` : "None",
    about: profile.about || "Hello, thank you for visiting my profile. Looking for an educated, understanding Maratha partner with strong family values.",
    matchPercent: 88,
    isVerified: profile.isVerified,
    mobile: profile.mobile || undefined,
    photoPrivacy: profile.photoPrivacy || "all",
    lastActive: "Recently active",
    photos: profile.photos.length > 0 ? profile.photos.map(p => p.url) : ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"]
  };

  const viewerProfileData = viewer?.profile ? {
    id: viewer.profile.id,
    name: `${viewer.profile.firstName} ${viewer.profile.lastName}`,
    gender: viewer.profile.gender,
    rashi: viewer.profile.rashi,
    nakshatra: viewer.profile.nakshatra,
    gotra: viewer.profile.gotra,
    devak: viewer.profile.devak,
    manglik: viewer.profile.manglik,
    city: viewer.profile.city,
    state: viewer.profile.state,
    dateOfBirth: viewer.profile.dateOfBirth ? viewer.profile.dateOfBirth.toISOString() : null,
    education: viewer.profile.education,
    profession: viewer.profile.profession
  } : null;

  return (
    <ProfileView 
      initialData={profileData} 
      viewerProfile={viewerProfileData}
      viewerName={viewer?.name || "Verified Member"} 
    />
  );
}
