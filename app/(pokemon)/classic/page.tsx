import Gamebox from "@/components/classic/Gamebox";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export default async function Classic() {
  const pokedex = await prisma.pokemon.findMany();
  return <>{pokedex && <Gamebox pokedex={pokedex} />}</>;
}
