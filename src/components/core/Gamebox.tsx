"use client";
import { Pokemon, newGameAtom } from "@/atoms/GameAtoms";
import PokemonFeedback from "./PokemonFeedback";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";

function chooseRandomItem(itemArray: Pokemon[]): Pokemon {
  const itemNumber = Math.floor(Math.random() * itemArray.length);
  return itemArray[itemNumber];
}

export default function Gamebox({ itemArray }: { itemArray: Pokemon[] }) {
  const newGame = useSetAtom(newGameAtom);
  const [chosenItem, setChosenItem] = useState(() =>
    chooseRandomItem(itemArray)
  );

  //TODO add functionality to start a new game
  useEffect(() => {
    setChosenItem(chooseRandomItem(itemArray));
  }, [newGame, itemArray]);
  //TODO function to deal with game being over is added here

  //TODO add modal to show when game is over
  return (
    <div>
      <PokemonFeedback correctAnswer={chosenItem} />
    </div>
  );
}
