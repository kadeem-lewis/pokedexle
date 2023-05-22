"use client";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Pokemon, newGameAtom } from "@/atoms/GameAtoms";
import PokemonFeedback from "./PokemonFeedback";
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

  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Daily</Tab>
        <Tab>Unlimited</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>In Progress</Tab.Panel>
        <Tab.Panel>
          <PokemonFeedback correctAnswer={chosenItem} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
