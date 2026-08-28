import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProfileView from "./ProfileView";

export default async function ProfileDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

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
  
  
  return <ProfileView initialData={profileData} />;
}
