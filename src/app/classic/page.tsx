import MyComboBox from "@/components/ui/MyComboBox";
import OptionsBar from "@/components/layout/OptionsBar";
import Gamebox from "@/components/core/Gamebox";
import { Item } from "@/stores/Store";
async function getPokemonList() {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const pokemonData = await res.json();
    return pokemonData.results;
  } catch (err) {
    console.error(err);
  }
}

export default async function Classic() {
  const pokemonList = await getPokemonList();
  return (
    <div>
      <OptionsBar />
      {/* @ts-expect-error Async Server Component */}
      <Gamebox itemArray={pokemonList} />
      <MyComboBox data={pokemonList} />
    </div>
  );
}
