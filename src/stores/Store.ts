export interface Item {
  name: string;
  url: string;
}
export interface Pokemon {
  name: string;
  types: string[];
  height: number;
  weight: number;
  generation: string;
  sprite: string;
}
function addGuessedAnswer(items: Item[], guessedItem: Item) {}
import { atom } from "jotai";
export const gameOver = atom(false);
export const guessAtom = atom(8);
export const itemAtom = atom<Pokemon | null>(null);
export const guessedItemsAtom = atom<Pokemon[]>([]);
export const addGuessedItem = atom(null, (get, set) => {});
/*
when user submits an answer clear the selected value,
add the value to the guessedAnswer array and then run
a function to get the api data of the pokemon and 
check if the stats were correct or not
*/
