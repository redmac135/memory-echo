import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(entries);
}
