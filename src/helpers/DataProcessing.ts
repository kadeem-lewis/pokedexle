/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pokemon } from "@/atoms/GameAtoms";

export function updatePokemonData(pokemonData: Array<any>): Pokemon[] {
  return pokemonData
    .filter((pokemon) => pokemon.id < 10000)
    .map((pokemon) => {
      const name = !exceptions.includes(pokemon.name)
        ? pokemon.name.replaceAll("-", " ")
        : pokemon.name;
      const generation = pokemon.pokemon_v2_pokemonspecy.generation_id;
      const types = pokemon.pokemon_v2_pokemontypes.map(
        (type: any) => type.pokemon_v2_type.name,
      );
      if (types.length === 1) {
        types.push("none");
      }
      const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
      return {
        id: pokemon.id,
        name,
        generation,
        types,
        sprite,
        height: pokemon.height,
        weight: pokemon.weight,
      };
    });
}

const exceptions = [
  "ho-oh",
  "porygon-z",
  "kommo-o",
  "hakamo-o",
  "jangmo-o",
  "ting-lu",
  "chien-pao",
  "chi-yu",
];
