import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const entries = await prisma.entry.findMany({
    where: { userId: "tmp-user" },
    orderBy: { createdAt: "desc" },
    include: {
      media: true,
    },
  });
  return NextResponse.json(entries);
}
