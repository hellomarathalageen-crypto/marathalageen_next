import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true }
    });

    if (!currentUser || !currentUser.profile) {
      return NextResponse.json({ message: "Complete onboarding first" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("photo") as File;
    const isPrimary = formData.get("isPrimary") === "true";

    if (!file) {
      return NextResponse.json({ message: "No photo provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "File must be an image" }, { status: 400 });
    }

    const fileExtension = file.name.split(".").pop();
    const fileName = `${currentUser.profile.id}/${uuidv4()}.${fileExtension}`;
    
    // Read file array buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage (assuming bucket is 'photos')
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("photos")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ message: "Failed to upload image" }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("photos")
      .getPublicUrl(fileName);

    // Update existing photos if this one is primary
    if (isPrimary) {
      await prisma.photo.updateMany({
        where: { profileId: currentUser.profile.id },
        data: { isPrimary: false }
      });
    }

    // Check if it's the very first photo (if so, make it primary automatically)
    const existingPhotosCount = await prisma.photo.count({
      where: { profileId: currentUser.profile.id }
    });

    const shouldBePrimary = isPrimary || existingPhotosCount === 0;

    // Save to database
    const newPhoto = await prisma.photo.create({
      data: {
        url: publicUrl,
        isPrimary: shouldBePrimary,
        profileId: currentUser.profile.id
      }
    });

    return NextResponse.json({ photo: newPhoto });
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const photoId = searchParams.get("id");

    if (!photoId) {
      return NextResponse.json({ message: "Photo ID required" }, { status: 400 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true }
    });

    if (!currentUser || !currentUser.profile) {
      return NextResponse.json({ message: "Complete onboarding first" }, { status: 403 });
    }

    // Verify ownership
    const photo = await prisma.photo.findUnique({
      where: { id: photoId }
    });

    if (!photo || photo.profileId !== currentUser.profile.id) {
      return NextResponse.json({ message: "Not found or unauthorized" }, { status: 403 });
    }

    // Extract filename from URL to delete from storage
    // URL format: https://[project].supabase.co/storage/v1/object/public/photos/[profileId]/[uuid].[ext]
    const urlParts = photo.url.split("/");
    const fileName = `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`;

    await supabase.storage.from("photos").remove([fileName]);
    await prisma.photo.delete({ where: { id: photoId } });

    // If we deleted the primary photo, try to make another one primary
    if (photo.isPrimary) {
      const remainingPhoto = await prisma.photo.findFirst({
        where: { profileId: currentUser.profile.id }
      });
      
      if (remainingPhoto) {
        await prisma.photo.update({
          where: { id: remainingPhoto.id },
          data: { isPrimary: true }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Photo delete error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
