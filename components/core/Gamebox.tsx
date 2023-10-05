"use client";
import { useState } from "react";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { useHydrateAtoms } from "jotai/utils";
import {
  Pokemon,
  pokedexAtom,
  pokemonToGuessAtom,
} from "../../atoms/GameAtoms";
import MyComboBox from "../ui/MyComboBox";
import PokemonTypes from "./PokemonTypes";
import PokemonFeedback from "./PokemonFeedback";
import { useAtomValue } from "jotai";

export default function Gamebox({ data }: { data: Pokemon[] }) {
  useHydrateAtoms([[pokedexAtom, data]]);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);

  const [selectedIndex, setSelectedIndex] = useState(0);

  //TODO add functionality to start a new game

  return (
    <>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          //If index = 1 then add unlimited param to url
        }}
      >
        <Tab.List className="flex justify-center gap-2">
          <Tab
            as={Link}
            href={`/classic/?unlimited`}
            shallow
            className="ui-selected:bg-blue-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black"
          >
            Unlimited
          </Tab>
          <Tab
            as={Link}
            href={"/classic"}
            className="ui-selected:bg-blue-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black"
          >
            Daily
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <PokemonFeedback correctAnswer={pokemonToGuess} />
          </Tab.Panel>
          <Tab.Panel>In Progress</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <MyComboBox />
      <PokemonTypes />
    </>
  );
}
