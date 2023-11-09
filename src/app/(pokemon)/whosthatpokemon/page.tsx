import { Pokemon } from "@/atoms/GameAtoms";
import ModeSwitch from "@/components/ModeSwitch";
import PokemonTypes from "@/components/PokemonTypes";
import MyComboBox from "@/components/ui/MyComboBox";
import Gamebox from "@/components/whosthatpokemon/Gamebox";
import { readJson } from "@/helpers/FileSystem";

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};

export default async function WhosThatPokemon() {
  const pokedex = (await readJson("/data/pokedex.json")) as Pokemon[];
  return (
    <>
      <ModeSwitch href="/whosthatpokemon" />
      <Gamebox pokedex={pokedex} />
      <PokemonTypes />
      <MyComboBox />
    </>
  );
}
