import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const { mediaId, userId, isVideo, caption } = await req.json();
  const media = await prisma.media.create({
    data: { publicId: mediaId, isVideo: isVideo },
  });
  const entry = await prisma.entry.create({
    data: {
      mediaId: media.id,
      caption: caption,
      userId: userId,
    },
  });
  const url = req.nextUrl.clone();
  url.pathname = "/gallery";
  return NextResponse.rewrite(url);
}
