import { PrismaClient } from "@prisma/client";
import { updatePokemonData } from "../src/helpers/DataProcessing";
const prisma = new PrismaClient();

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

async function main() {
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
      await prisma.pokemon.createMany({ data: transformedData });

      console.log("Pokemons seeded!");
    } else {
      console.error("Failed to fetch Pokemon data");
    }
  } catch (err) {
    console.error(err);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
