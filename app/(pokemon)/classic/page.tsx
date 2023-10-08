import Gamebox from "@/components/core/Gamebox";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Pokedexle | Classic",
  description: "Guess Pokemon based on hints from previous guesses",
};

export default async function Classic() {
  const pokedex = await prisma.pokemon.findMany();
  const dailies = await prisma.daily.findMany({
    orderBy: {
      date: "desc",
    },
    take: 2,
  });
  return (
    <div>
      {pokedex && dailies && <Gamebox pokedex={pokedex} dailies={dailies} />}
    </div>
  );
}
