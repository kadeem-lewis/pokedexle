import { prisma } from "@/lib/prisma";
import { startOfDay, subMinutes } from "date-fns";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dateString = url.searchParams.get("date");

    if (dateString === null) throw new Error("dateString is null");
    const date = startOfDay(new Date(dateString));
    console.log(date.getTimezoneOffset());
    const utcDate =
      date.getTimezoneOffset() > 0
        ? subMinutes(date, date.getTimezoneOffset())
        : date;
    console.log(utcDate);

    const dailies = await prisma.daily.findUnique({
      where: {
        date: utcDate,
      },
    });
    return Response.json(dailies);
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
