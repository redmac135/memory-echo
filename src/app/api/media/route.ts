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
