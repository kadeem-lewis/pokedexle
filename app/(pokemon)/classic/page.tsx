import Gamebox from "@/components/core/Gamebox";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Classic",
  description: "Guess Pokemon based on hints from previous guesses",
};

export default async function Classic() {
  const pokedex = await prisma.pokemon.findMany();
  return <div>{pokedex && <Gamebox pokedex={pokedex} />}</div>;
}
