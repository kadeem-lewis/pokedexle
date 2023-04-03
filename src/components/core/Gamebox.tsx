import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { itemAtom, guessAtom, Pokemon } from "@/stores/Store";
import { Item } from "@/stores/Store";
import PokemonFeedback from "./PokemonFeedback";

export default function Gamebox({ itemArray }: { itemArray: Array<Item> }) {
  const [item, setItem] = useAtom(itemAtom);
  const [guesses, setGuesses] = useAtom(guessAtom);
  useEffect(() => {
    const itemNumber = Math.floor(Math.random() * itemArray.length) + 1;
    const chosenItem = itemArray[itemNumber];
    async function getItem() {
      try {
        const res = await fetch(chosenItem.url);
        const data = await res.json();
        const res2 = await fetch(data.species.url);
        const data2 = await res2.json();
        const generation = data2.generation.name;
        const filteredData: Pokemon = {
          name: data.name,
          types: data.types,
          weight: data.weight,
          height: data.height,
          generation,
          sprite: data.sprites.front_default,
        };
        setItem(filteredData);
      } catch (e) {
        console.error(e);
      }
    }
    getItem();
  }, [itemArray, setItem]);
  //TODO function to deal with game being over is added here

  //TODO add modal to show when game is over
  console.log("Gamebox Rerendered");
  return (
    <div>
      <PokemonFeedback />
    </div>
  );
}
