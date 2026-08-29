import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProfileView } from "@/components/ui/shared";

export default async function ProfileDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

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

  // Format data for the client component
  const age = profile.dateOfBirth ? Math.floor((new Date().getTime() - new Date(profile.dateOfBirth).getTime()) / 3.15576e+10) : 0;
  
  const profileData = {
    id: profile.id,
    userId: profile.userId,
    name: `${profile.firstName} ${profile.lastName}`,
    age,
    height: profile.height || "Not specified",
    maritalStatus: profile.maritalStatus || "Not specified",
    community: profile.community || "Not specified",
    manglik: "Not specified",
    religion: profile.religion || "Not specified",
    motherTongue: "Not specified",
    city: profile.city || "Not specified",
    state: profile.state || "Not specified",
    country: profile.country || "Not specified",
    education: profile.education || "Not specified",
    college: "Not specified",
    profession: profile.profession || "Not specified",
    company: "Not specified",
    income: profile.annualIncome || "Not specified",
    diet: "Not specified",
    drinking: "Not specified",
    smoking: "Not specified",
    familyType: "Not specified",
    familyValues: "Not specified",
    fatherStatus: "Not specified",
    motherStatus: "Not specified",
    brothers: "Not specified",
    sisters: "Not specified",
    about: "No bio provided.",
    matchPercent: 85,
    isVerified: profile.isVerified,
    lastActive: "Recently active",
    photos: profile.photos.length > 0 ? profile.photos.map(p => p.url) : ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"]
  };

  return <ProfileView initialData={profileData} />;
}
