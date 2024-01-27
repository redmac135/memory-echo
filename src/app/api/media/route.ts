import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const mediaId = req.nextUrl.searchParams.get("mediaId");
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
  const { userId, publicId, caption, isVideo } = await req.json();
  const response = await prisma.media.create({
    data: {
      publicId: publicId,
      isVideo: isVideo,
    },
  });
  await prisma.entry.create({
    data: {
      caption: caption,
      user: {
        connect: {
          id: userId,
        },
      },
      media: {
        connect: {
          id: response.id,
        },
      },
    },
  });
  return NextResponse.json(response);
}
