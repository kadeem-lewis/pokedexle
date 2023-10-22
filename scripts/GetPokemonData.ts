import { updatePokemonData, updateMoveData } from "../helpers/DataProcessing";
import fs from "fs/promises";

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

const moveQuery = `
query MyQuery {
  pokemon_v2_move {
    name
    id
    generation_id
    pokemon_v2_movedamageclass {
      name
    }
    power
    pp
    accuracy
    pokemon_v2_type {
      name
    }
  }
}
`;

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
        "../data/pokedex.json",
        JSON.stringify(transformedData, null, 2),
      );

      console.log("Pokemon data added");
    } else {
      console.error("Failed to fetch Pokemon data");
    }
  } catch (err) {
    console.error(err);
  }
  //move data
  try {
    const moveRes = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: moveQuery }), // make sure to use moveQuery here
    });

    const moveData = await moveRes.json();

    if (moveData && moveData.data && moveData.data.pokemon_v2_move) {
      const transformedMoveData = updateMoveData(moveData.data.pokemon_v2_move);
      await fs.writeFile(
        "../data/movedex.json",
        JSON.stringify(transformedMoveData, null, 2),
      );

      console.log("Moves seeded!");
    } else {
      console.error("Failed to fetch Move data");
    }
  } catch (err) {
    console.error(err);
  }
}

fetchPokemonData();
