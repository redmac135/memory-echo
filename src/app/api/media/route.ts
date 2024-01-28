import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mediaId = searchParams.get("mediaId");
  if (!mediaId) {
    return NextResponse.json({ error: "mediaId is required" });
  }

  const response = await prisma.media.findUnique({
    where: {
      id: mediaId,
    },
  });
  if (!response) {
    return NextResponse.json({ error: "media not found" });
  }
  return NextResponse.json(response);
}

export async function POST(req: NextRequest) {
  const { file, isVideo } = await req.json();

  const media = await cloudinary.uploader.upload(file, {
    resource_type: isVideo ? "video" : "image",
  });

  const response = await prisma.media.create({
    data: {
      publicId: media.public_id,
      isVideo: isVideo,
    },
  });
  return NextResponse.json(response);
}
