import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { mediaId, promptId, happiness } = await req.json();

  const entry = await prisma.entry.update({
    where: { id: promptId },
    data: {
      happiness: happiness,
    },
  });

  const hume = await prisma.hume.create({
    data: {
      entryId: entry.id,
      mediaId: mediaId,
    },
  });
}

export async function GET(req: NextRequest) {
  // choose a prompt using the following options
  // 1. the least number of reflections
  // 2. the happiest reflection

  const entries = await prisma.entry.findMany({
    include: {
      _count: {
        select: { Hume: true },
      },
    },
    orderBy: {
      happiness: "desc",
    },
  });
  if (entries.length === 0) {
    return NextResponse.json({ error: "no entries found" });
  }
  let leastReflections = entries[0]._count.Hume;
  let listToReduce: any = [];
  entries.forEach((entry) => {
    if (entry._count.Hume < leastReflections) {
      listToReduce = [entry];
      leastReflections = entry._count.Hume;
    } else if (entry._count.Hume === leastReflections) {
      listToReduce.push(entry);
    } else {
      return;
    }
  });
  const randomIndex = Math.floor(Math.random() * listToReduce.length);
  return NextResponse.json(listToReduce[randomIndex]);
}
