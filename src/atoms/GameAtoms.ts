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

export function chooseRandomItem(itemArray: Pokemon[]): Pokemon {
  const itemNumber = Math.floor(Math.random() * itemArray.length);
  return itemArray[itemNumber];
}

export const gameOverAtom = atom(false);
export const itemArrayAtom = atom<Pokemon[]>([]);
export const newGameAtom = atom(null, (get, set) => {
  set(guessedItemsAtom, []);
  set(guessAtom, 8);
  set(gameOverAtom, false);
  set(itemAtom, chooseRandomItem(get(itemArrayAtom)));
});
export const guessAtom = atom(8);
export const itemAtom = atom<Pokemon | null>(null);
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
