"use client";
import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Pokemon, newGameAtom } from "@/atoms/GameAtoms";
import PokemonFeedback from "./PokemonFeedback";
import { useSetAtom } from "jotai";
import Link from "next/link";

function chooseRandomItem(itemArray: Pokemon[]): Pokemon {
  const itemNumber = Math.floor(Math.random() * itemArray.length);
  return itemArray[itemNumber];
}

export default function Gamebox({ itemArray }: { itemArray: Pokemon[] }) {
  const newGame = useSetAtom(newGameAtom);
  const [chosenItem, setChosenItem] = useState(() =>
    chooseRandomItem(itemArray)
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  //TODO add functionality to start a new game
  useEffect(() => {
    setChosenItem(chooseRandomItem(itemArray));
  }, [newGame, itemArray]);

  return (
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={(index) => {
        setSelectedIndex(index);
        //If index = 1 then add unlimited param to url
      }}
    >
      <Tab.List className="flex justify-center gap-2">
        <Tab as={Link} href={"/classic"}>
          {({ selected }) => (
            <button
              className={
                selected ? "bg-blue-500 text-white" : "bg-white text-black"
              }
            >
              Daily
            </button>
          )}
        </Tab>
        <Tab as={Link} href={`/classic/?unlimited`} shallow>
          {({ selected }) => (
            <button
              className={
                selected ? "bg-blue-500 text-white" : "bg-white text-black"
              }
            >
              Unlimited
            </button>
          )}
        </Tab>
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
