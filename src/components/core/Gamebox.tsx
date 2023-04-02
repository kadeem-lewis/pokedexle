import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import PokemonFeedback from "./PokemonFeedback";
interface Item {
  name: string;
  url: string;
}
export const guessAtom = atom(8);
export const itemAtom = atom({});
export default function Gamebox({ itemArray }: { itemArray: Array<Item> }) {
  const [item, setItem] = useAtom(itemAtom);
  const [guesses, setGuesses] = useAtom(guessAtom);
  useEffect(() => {
    const itemNumber = Math.floor(Math.random() * itemArray.length);
    const chosenItem = itemArray[itemNumber];
    async function getItem() {
      try {
        const res = await fetch(chosenItem.url);
        const data = await res.json();
        console.log(data);
        setItem(data);
      } catch (e) {
        console.error(e);
      }
    }
    getItem();
  }, [itemArray, setItem]);
  //TODO function to deal with game being over is added here

  //TODO add modal to show when game is over
  return (
    <div>
      <PokemonFeedback />
    </div>
  );
}
