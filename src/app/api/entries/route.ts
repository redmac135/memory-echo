import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { type Entry } from "@/lib/schema";

export async function GET(req: NextRequest) {
  const entries: Entry[] = await prisma.entry.findMany({
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
  console.log(entry);
  return NextResponse.redirect("/gallery");
}
