import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfDay, subMinutes } from "date-fns";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dateString = url.searchParams.get("date");

    if (dateString === null) throw new Error("dateString is null");
    const date = startOfDay(new Date(dateString));
    const utcDate = subMinutes(date, date.getTimezoneOffset());

    const dailies = await prisma.daily.findUnique({
      where: {
        date: utcDate,
      },
    });
    return NextResponse.json(dailies);
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
