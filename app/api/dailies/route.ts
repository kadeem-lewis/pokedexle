import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dateString = url.searchParams.get("date");

    if (dateString === null) throw new Error("dateString is null");

    const date = new Date(dateString);
    console.log(date)

    const dailies = await prisma.daily.findUnique({
      where: {
        date: date,
      },
    });
    return Response.json(dailies);
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
