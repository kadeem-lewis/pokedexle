import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const firstDate = await prisma.daily.findUnique({
      where: {
        day: 1,
      },
    });
    return Response.json(firstDate);
  } catch (error) {
    return Response.json({ error: "Error" }, { status: 500 });
  }
}
