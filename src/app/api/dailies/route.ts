import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dateString = url.searchParams.get("date");

    if (dateString === null) throw new Error("dateString is null");

    const date = new Date(dateString);

    const dailies = await prisma.daily.findUnique({
      where: {
        date: date,
      },
    });
    return Response.json(dailies, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return Response.json({ error: "Error" }, { status: 500 });
  }
}
