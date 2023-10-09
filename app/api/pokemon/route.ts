import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const pokedex = await prisma.pokemon.findMany();
  return Response.json(pokedex);
}
