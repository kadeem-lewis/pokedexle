export interface Item {
  name: string;
  url: string;
}
export interface Pokemon {
  name: string;
  types: string[];
  height: number;
  weight: number;
  generation: number;
  sprite?: string;
}

import { atom } from "jotai";
export const gameOver = atom(false);
export const newGame = atom(null, (get, set) => {
  set(guessedItemsAtom, []);
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
