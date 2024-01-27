import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const mediaId = req.nextUrl.searchParams.get("mediaId");
  if (!mediaId) {
    return new Response("Missing mediaId", { status: 400 });
  }
  const response = await prisma.media.findUnique({
    where: {
      id: mediaId,
    },
  });
  if (!response) {
    return new Response("Media not found", { status: 404 });
  }
  return NextResponse.json(response);
}
