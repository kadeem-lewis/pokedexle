import { updatePokemonData } from "@/helpers/DataProcessing";
import { promises as fs } from "fs";

const query = `
query MyQuery {
  pokemon_v2_pokemon {
    name
    id
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

async function fetchPokemonData() {
  try {
    const res = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const { data } = await res.json();

    if (data && data.pokemon_v2_pokemon) {
      const transformedData = updatePokemonData(data.pokemon_v2_pokemon);
      await fs.writeFile(
        "../src/data/pokedex.json",
        JSON.stringify(transformedData, null, 2),
      );

      console.log("Pokemon data added");
    } else {
      console.error("Failed to fetch Pokemon data");
    }
  } catch (err) {
    console.error(err);
  }
}

fetchPokemonData();
