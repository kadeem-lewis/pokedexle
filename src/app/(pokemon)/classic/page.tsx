import { Pokemon } from "@/atoms/GameAtoms";
import GameWrapper from "@/components/GameWrapper";
import ModeSwitch from "@/components/ModeSwitch";
import PokemonTypes from "@/components/PokemonTypes";
import MyComboBox from "@/components/ui/MyComboBox";
import { readJson } from "@/helpers/FileSystem";
import { prisma } from "@/lib/prisma";

type ClassicProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export default async function Classic({ searchParams }: ClassicProps) {
  const pokedex = (await readJson("/data/pokedex.json")) as Pokemon[];
  const dailies = await prisma.daily.findUnique({
    where: {
      date: new Date(),
    },
  });

  return (
    <>
      <ModeSwitch href="/classic" searchParams={searchParams} />
      {dailies && <GameWrapper pokedex={pokedex} dailies={dailies} />}
      <MyComboBox />
      <PokemonTypes />
    </>
  );
}
