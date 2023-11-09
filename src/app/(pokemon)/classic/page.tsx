import { Pokemon } from "@/atoms/GameAtoms";
import ModeSwitch from "@/components/ModeSwitch";
import PokemonTypes from "@/components/PokemonTypes";
import Gamebox from "@/components/classic/Gamebox";
import MyComboBox from "@/components/ui/MyComboBox";
import { readJson } from "@/helpers/FileSystem";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export default async function Classic() {
  const pokedex = (await readJson("/data/pokedex.json")) as Pokemon[];
  return (
    <>
      <ModeSwitch href="/classic" />
      {pokedex && <Gamebox pokedex={pokedex} />}
      <MyComboBox />
      <PokemonTypes />
    </>
  );
}
