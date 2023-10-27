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
  classicPracticeAnswersAtom,
  guessedItemsAtom,
  guessAtom,
  classicAnswersAtom,
  dailyAtom,
  dailyPokemonAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import MyComboBox from "../ui/MyComboBox";
import PokemonTypes from "../PokemonTypes";
import PokemonFeedback from "./PokemonFeedback";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { Button } from "../ui/Button";
import { format, isSameDay, startOfToday } from "date-fns";
import { usePathname } from "next/navigation";
import { Daily } from "@prisma/client";

type GameboxProps = {
  pokedex: Pokemon[];
};

export default function Gamebox({ pokedex }: GameboxProps) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const classicPracticeAnswers = useAtomValue(classicPracticeAnswersAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const [mode, setMode] = useAtom(currentGameMode);
  const { date, classicId } = useAtomValue<Promise<Daily>>(dailyAtom);
  const [classicAnswers, setClassicAnswers] = useAtom(classicAnswersAtom);
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentPath = usePathname();

  useEffect(() => {
    console.log("change mode useEffect is running");
    if (currentPath === "/classic" && selectedIndex === 0) setMode("classic");
  }, [currentPath, selectedIndex, setMode]);

  useEffect(() => {
    console.log("Set Dailies useEffect is running");
    function setDailies() {
      const dailyClassicPokemon = pokedex.find(
        (pokemon) => pokemon.id === classicId,
      );
      if (!dailyClassicPokemon) throw new Error("Daily Pokemon Not Found");

      setDailyPokemon((prev) => ({ ...prev, classic: dailyClassicPokemon }));
    }
    setDailies();
  }, [classicId, pokedex, setDailyPokemon]);

  useEffect(() => {
    if (mode !== "classic") return;
    console.log("Classic useEffect is running");
    console.log("Server Date: ", new Date(date));
    if (isSameDay(new Date(), new Date(date))) {
      setGuessedItems((prev) => ({
        ...prev,
        classic: classicAnswers.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classic: defaultGuesses - classicAnswers.answers.length,
      }));
    } else {
      setClassicAnswers({
        date: startOfToday(),
        answers: [],
      });
    }
  }, [
    classicAnswers.date,
    classicAnswers.answers,
    date,
    guessedItems.classic.length,
    mode,
    setClassicAnswers,
    setGuessedItems,
    setGuesses,
  ]);

  useEffect(() => {
    console.log("Classic Unlimited useEffect is running");
    if (
      classicPracticeAnswers !== null &&
      mode === "classicUnlimited" &&
      guessedItems.classicUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        classicUnlimited: classicPracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classicUnlimited: defaultGuesses - classicPracticeAnswers.length,
      }));
    }
  }, [
    mode,
    classicPracticeAnswers,
    setGuessedItems,
    setGuesses,
    guessedItems.classicUnlimited,
  ]);

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
        <Tab.List className="mt-2 flex justify-center gap-2">
          <Tab
            className="bg-yellow-500 ui-selected:brightness-110 ui-not-selected:brightness-75"
            as={Button}
            variant="flat"
            size="tall"
          >
            Daily
          </Tab>
          <Tab
            className="bg-yellow-500 ui-selected:brightness-110 ui-not-selected:brightness-75"
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
