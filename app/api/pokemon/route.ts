import { prisma } from "@/lib/prisma";

export async function GET() {
  const pokedex = await prisma.pokemon.findMany();
  return Response.json(pokedex);
}
