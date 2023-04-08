import { Pokemon, Move } from "@/atoms/GameAtoms";
interface Item {
  name: string;
  url: string;
  formName?: string;
  formInfo?: string;
}
const demonymValues: { [key: string]: string } = {
  mega: "Mega",
  galar: "Galarian",
  alola: "Alolan",
  hisui: "Hisuian",
  paldea: "Paldean",
};
const exceptions = ["ho-oh", "porygon-z", "kommo-o"];
export function pokemonCleanse(data: Item[]): Item[] {
  const cleanedArray = data
    .filter(({ name }) => name.includes("-"))
    .map(({ name, url }) => {
      const nameParts = name.split("-");
      const pokemonName = nameParts[0];
      const formParts = nameParts.slice(1);
      const formName = formParts[0];
      const formInfo = formParts.slice(1).join(" ");

      const formDemonym =
        demonymValues[formName.toLowerCase()] ||
        formName.charAt(0).toUpperCase() + formName.slice(1);

      return {
        name: formDemonym + " " + pokemonName + " " + formInfo,
        url,
      };
    });

  const unprocessedArray = data.filter(({ name }) => !name.includes("-"));

  return [
    ...cleanedArray,
    ...unprocessedArray.map(({ name, url }) => ({ name, url })),
  ];
}

export function moveCleanse() {}

export function updatePokemonData(pokemonData: Array<any>): Pokemon[] {
  return pokemonData.map((pokemon) => {
    const generation = pokemon.pokemon_v2_pokemonspecy.generation_id;
    const types = pokemon.pokemon_v2_pokemontypes.map(
      (type: any) => type.pokemon_v2_type.name
    );
    if (types.length === 1) {
      types.push("None");
    }
    return {
      name: pokemon.name,
      generation,
      types,
      height: pokemon.height,
      weight: pokemon.weight,
    };
  });
}
export function updateMoveData(moveData: Array<any>): Move[] {
  return moveData.map((move) => {
    const moveClass = move.pokemon_v2_movedamageclass.name;
    const moveType = move.pokemon_v2_type.name;
    return {
      name: move.name,
      power: move.power,
      pp: move.pp,
      generation: move.generation_id,
      class: moveClass,
      type: moveType,
      accuracy: move.accuracy,
    };
  });
}
