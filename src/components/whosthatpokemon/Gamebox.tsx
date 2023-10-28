"use client";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import MyComboBox from "../ui/MyComboBox";
import { Button } from "../ui/Button";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  Pokemon,
  currentGameMode,
  dailyAtom,
  dailyPokemonAtom,
  guessAtom,
  guessedItemsAtom,
  pokedexAtom,
  pokemonToGuessAtom,
  whosthatpokemonAnswersAtom,
  whosthatpokemonPracticeAnswersAtom,
} from "@/atoms/GameAtoms";
import PokemonTypes from "../PokemonTypes";
import ImagePanel from "./ImagePanel";
import { useHydrateAtoms } from "jotai/utils";
import { addDays, format, isSameDay, startOfToday } from "date-fns";
import { defaultGuesses } from "@/constants";
import { usePathname } from "next/navigation";
import { Daily } from "@prisma/client";

type GameboxProps = {
  pokedex: Pokemon[];
};

export default function Gamebox({ pokedex }: GameboxProps) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const [mode, setMode] = useAtom(currentGameMode);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const whosthatpokemonPracticeAnswers = useAtomValue(
    whosthatpokemonPracticeAnswersAtom,
  );
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const { date, whosThatPokemonId } = useAtomValue<Promise<Daily>>(dailyAtom);
  const [whosthatpokemonAnswers, setWhosthatpokemonAnswers] = useAtom(
    whosthatpokemonAnswersAtom,
  );
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);
  const currentPath = usePathname();

  useEffect(() => {
    if (currentPath === "/whosthatpokemon" && selectedIndex === 0)
      setMode("whosthatpokemon");
  }, [currentPath, selectedIndex, setMode]);

  useEffect(() => {
    function setDailies() {
      const dailyClassicPokemon = pokedex.find(
        (pokemon) => pokemon.id === whosThatPokemonId,
      );
      if (!dailyClassicPokemon) throw new Error("Daily Pokemon Not Found");

      setDailyPokemon((prev) => ({
        ...prev,
        whosthatpokemon: dailyClassicPokemon,
      }));
    }
    setDailies();
  }, [pokedex, setDailyPokemon, whosThatPokemonId]);

  useEffect(() => {
    if (mode !== "whosthatpokemon") return;
    const localTime = format(
      new Date(whosthatpokemonAnswers.date),
      "yyyy-MM-dd",
    );
    const serverTime = format(addDays(new Date(date), 1), "yyyy-MM-dd");
    if (serverTime === localTime) {
      setGuessedItems((prev) => ({
        ...prev,
        whosthatpokemon: whosthatpokemonAnswers.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        whosthatpokemon: defaultGuesses - whosthatpokemonAnswers.answers.length,
      }));
    } else {
      setWhosthatpokemonAnswers({
        date: startOfToday(),
        answers: [],
      });
    }
  }, [
    date,
    guessedItems.classic.length,
    mode,
    setGuessedItems,
    setGuesses,
    whosthatpokemonAnswers.date,
    whosthatpokemonAnswers.answers,
    setWhosthatpokemonAnswers,
  ]);

  useEffect(() => {
    if (
      whosthatpokemonPracticeAnswers !== null &&
      mode === "whosthatpokemonUnlimited" &&
      guessedItems.whosthatpokemonUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        whosthatpokemonUnlimited: whosthatpokemonPracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        whosthatpokemonUnlimited:
          defaultGuesses - whosthatpokemonPracticeAnswers.length,
      }));
    }
  }, [
    mode,
    setGuessedItems,
    setGuesses,
    guessedItems.whosthatpokemonUnlimited,
    whosthatpokemonPracticeAnswers,
  ]);

  return (
    <>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          if (index === 0) {
            setMode("whosthatpokemon");
          } else {
            setMode("whosthatpokemonUnlimited");
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
            {pokemonToGuess.whosthatpokemon && (
              <ImagePanel correctAnswer={pokemonToGuess.whosthatpokemon} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {pokemonToGuess.whosthatpokemonUnlimited && (
              <ImagePanel
                correctAnswer={pokemonToGuess.whosthatpokemonUnlimited}
              />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <PokemonTypes />
      <MyComboBox />
    </>
  );
}
