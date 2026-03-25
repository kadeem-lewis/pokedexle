import { updatePokemonData } from "@/helpers/DataProcessing";
import { promises as fs } from "fs";

const query = `
query MyQuery {
  pokemon {
    name
    id
    height
    weight
    pokemontypes {
      type {
        name
      }
    }
    pokemonspecy {
      generation_id
    }
  }
}`;

async function fetchPokemonData() {
  try {
    const res = await fetch("https://graphql.pokeapi.co/v1beta2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const { data } = await res.json();

    if (data && data.pokemon) {
      const transformedData = updatePokemonData(data.pokemon);
      await fs.writeFile(
        "./src/data/pokedex.json",
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
