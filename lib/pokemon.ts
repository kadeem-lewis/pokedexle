import { prisma } from "./prisma";

export const getPokedex = async () => {
  try {
    const pokedex = await prisma.pokemon.findMany();
    return { pokedex };
  } catch (error) {
    return { error };
  }
};
