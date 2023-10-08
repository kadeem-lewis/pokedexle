import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addDays, startOfDay } from "date-fns";

export async function GET(request: Request) {
  try {
    const dailies = await prisma.daily.findMany({
      orderBy: {
        date: "desc",
      },
      take: 2,
    });
    return NextResponse.json(dailies);
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
