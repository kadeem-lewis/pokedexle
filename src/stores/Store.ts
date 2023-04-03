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

import { atom } from "jotai";
export const guessAtom = atom(8);
export const itemAtom = atom<Pokemon | null>(null);
export const guessedItemsAtom = atom<Pokemon[]>([]);
