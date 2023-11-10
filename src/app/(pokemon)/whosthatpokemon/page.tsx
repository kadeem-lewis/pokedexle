import { Pokemon } from "@/atoms/GameAtoms";
import GameWrapper from "@/components/GameWrapper";
import ModeSwitch from "@/components/ModeSwitch";
import PokemonTypes from "@/components/PokemonTypes";
import MyComboBox from "@/components/ui/MyComboBox";
import Gamebox from "@/components/whosthatpokemon/Gamebox";
import { readJson } from "@/helpers/FileSystem";
import { prisma } from "@/lib/prisma";

type WhosThatPokemonProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};

export default async function WhosThatPokemon({
  searchParams,
}: WhosThatPokemonProps) {
  const pokedex = (await readJson("/data/pokedex.json")) as Pokemon[];
  const dailies = await prisma.daily.findUnique({
    where: {
      date: new Date(),
    },
  });
  return (
    <>
      <ModeSwitch href="/whosthatpokemon" searchParams={searchParams} />
      {dailies && <GameWrapper pokedex={pokedex} dailies={dailies} />}
      <PokemonTypes />
      <MyComboBox />
    </>
  );
}
