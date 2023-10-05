import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  generation: number;
  sprite: string;
}
export interface Move {
  name: string;
  power: number;
  pp: number;
  type: string;
  class: string;
  accuracy: number;
}

//TODO: have atom that stores the pokemon collection

//TODO: have atom that connects to localstorage and stores all the game stats

//?: Maybe each game type should have its own atom so that the current results for each game mode is saved between sessions. It needs to check

//!: Should probably keep the whole atom responsible for resetting everything and making a new game

export function chooseRandomItem(itemArray: Pokemon[]): Pokemon {
  const itemNumber = Math.floor(Math.random() * itemArray.length);
  return itemArray[itemNumber];
}

export const pokedexAtom = atom<Pokemon[]>([]);
export const pokemonToGuessAtom = atom<Pokemon>((get) =>
  chooseRandomItem(get(pokedexAtom))
);

export const gameOverAtom = atom(false);
export const newGameAtom = atom(null, (get, set) => {
  set(guessedItemsAtom, []);
  set(guessAtom, 8);
  set(gameOverAtom, false);
});
export const guessAtom = atom(8);
export const guessedItemsAtom = atom<Pokemon[]>([]);
export const addGuessedItemAtom = atom(null, (get, set, newItem: Pokemon) => {
  const array = get(guessedItemsAtom);
  set(guessedItemsAtom, [...get(guessedItemsAtom), newItem]);
});

/*
when user submits an answer clear the selected value,
add the value to the guessedAnswer array and then run
a function to get the api data of the pokemon and 
check if the stats were correct or not
*/
