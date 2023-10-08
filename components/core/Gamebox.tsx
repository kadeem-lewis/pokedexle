"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { useHydrateAtoms } from "jotai/utils";
import {
  Pokemon,
  pokedexAtom,
  pokemonToGuessAtom,
  guessedItemsAtom,
} from "../../atoms/GameAtoms";
import MyComboBox from "../ui/MyComboBox";
import PokemonTypes from "./PokemonTypes";
import PokemonFeedback from "./PokemonFeedback";
import { useAtom, useSetAtom } from "jotai";
import { Daily } from "@prisma/client";

export default function Gamebox({
  pokedex,
  dailies,
}: {
  pokedex: Pokemon[];
  dailies: Daily[];
}) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const [pokemonToGuess, setPokemonToGuess] = useAtom(pokemonToGuessAtom);
  const setGuessedItems = useSetAtom(guessedItemsAtom);
  console.log(dailies);

  useEffect(() => {
    const storedPokemon = localStorage.getItem("classic_practice_solution");
    const storedAnswers = localStorage.getItem("classic_practice_answers");

    if (storedPokemon) {
      setPokemonToGuess(JSON.parse(storedPokemon));
      if (storedAnswers) setGuessedItems(JSON.parse(storedAnswers));
    } else {
      setPokemonToGuess(pokedex[Math.floor(Math.random() * pokedex.length)]);
      localStorage.setItem(
        "classic_practice_solution",
        JSON.stringify(pokemonToGuess)
      );
    }
  }, [pokedex, setGuessedItems, setPokemonToGuess]);

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
            {pokemonToGuess && (
              <PokemonFeedback correctAnswer={pokemonToGuess} />
            )}
          </Tab.Panel>
          <Tab.Panel>In Progress</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <MyComboBox />
      <PokemonTypes />
    </>
  );
}
