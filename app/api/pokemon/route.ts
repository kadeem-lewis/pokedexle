import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const pokedex = await prisma.pokemon.findMany();
  return NextResponse.json(pokedex);
}
