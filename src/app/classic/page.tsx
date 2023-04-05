import { cache } from "react";
import MyComboBox from "@/components/ui/MyComboBox";
import OptionsBar from "@/components/layout/OptionsBar";
import Gamebox from "@/components/core/Gamebox";
import { updatePokemonData } from "@/helpers/DataProcessing";
import { Pokemon } from "@/stores/Store";

const query = `
query MyQuery {
  pokemon_v2_pokemon {
    name
    height
    weight
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonspecy {
      generation_id
    }
  }
}`;

const getPokemonList = cache(async () => {
  try {
    const res = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const pokemonData = await res.json();
    return updatePokemonData(pokemonData.data.pokemon_v2_pokemon);
  } catch (err) {
    console.error(err);
  }
});

export default async function Classic() {
  const pokemonList: Pokemon[] = (await getPokemonList()) || [];
  return (
    <div>
      <OptionsBar />
      {/* @ts-expect-error Async Server Component */}
      <Gamebox itemArray={pokemonList} />
      <MyComboBox data={pokemonList} />
    </div>
  );
}
