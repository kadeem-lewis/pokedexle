"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { useHydrateAtoms } from "jotai/utils";
import {
  Pokemon,
  pokedexAtom,
  pokemonToGuessAtom,
  currentGameMode,
  setDailiesAtom,
  classicPracticeAnswersAtom,
  guessedItemsAtom,
  guessAtom,
  defaultGuesses,
} from "@/atoms/GameAtoms";
import MyComboBox from "../ui/MyComboBox";
import PokemonTypes from "./PokemonTypes";
import PokemonFeedback from "./PokemonFeedback";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { Button } from "../ui/Button";

export default function Gamebox({ pokedex }: { pokedex: Pokemon[] }) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const [pokemonToGuess, setPokemonToGuess] = useAtom(pokemonToGuessAtom);
  const [classicPracticeAnswers, _] = useAtom(classicPracticeAnswersAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const [guesses, setGuesses] = useAtom(guessAtom);
  const [mode, setMode] = useAtom(currentGameMode);
  const setDailies = useSetAtom(setDailiesAtom);

  useEffect(() => {
    (async () => {
      setDailies();
    })();
  }, [setDailies]);

  useEffect(() => {
    if (
      classicPracticeAnswers !== null &&
      mode === "classicUnlimited" &&
      guessedItems[mode].length === 0
    ) {
      setGuessedItems({
        ...guessedItems,
        classicUnlimited: classicPracticeAnswers,
      });
      setGuesses({
        ...guesses,
        classicUnlimited: defaultGuesses - classicPracticeAnswers.length,
      });
      console.log(guesses.classicUnlimited);
    }
  }, [mode]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  //TODO add functionality to start a new game

  return (
    <>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          if (index === 0) {
            setMode("classic");
          } else {
            setMode("classicUnlimited");
          }
        }}
      >
        <Tab.List className="flex justify-center gap-2 mt-2">
          <Tab
            className="bg-yellow-500 ui-not-selected:brightness-75"
            as={Button}
            variant="flat"
            size="tall"
          >
            Daily
          </Tab>
          <Tab
            className="bg-yellow-500 ui-not-selected:brightness-75"
            as={Button}
            variant="flat"
            size="tall"
          >
            Unlimited
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {pokemonToGuess.classic && (
              <PokemonFeedback correctAnswer={pokemonToGuess.classic} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {pokemonToGuess.classicUnlimited && (
              <PokemonFeedback
                correctAnswer={pokemonToGuess.classicUnlimited}
              />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <MyComboBox />
      <PokemonTypes />
    </>
  );
}
