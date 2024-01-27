import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { type Entry } from "@/lib/schema";

export async function GET(req: NextRequest) {
  const entries: Entry[] = await prisma.entry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(entries);
}
