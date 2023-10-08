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
  currentGameMode,
  classicPracticeAnswersAtom,
  classicAnswersAtom,
  classicPracticeSolutionAtom,
  dailyIdAtom,
} from "@/atoms/GameAtoms";
import MyComboBox from "../ui/MyComboBox";
import PokemonTypes from "./PokemonTypes";
import PokemonFeedback from "./PokemonFeedback";
import { useAtom, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { Daily } from "@prisma/client";
import { isToday, startOfDay, addHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default function Gamebox({
  pokedex,
  dailies,
}: {
  pokedex: Pokemon[];
  dailies: Daily[];
}) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const [pokemonToGuess, setPokemonToGuess] = useAtom(pokemonToGuessAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const [mode, setMode] = useAtom(currentGameMode);
  const [classicPracticeAnswers, setClassicPracticeAnswers] = useAtom(
    classicPracticeAnswersAtom
  );
  const [classicPracticeSolution, setClassicPracticeSolution] = useAtom(
    classicPracticeSolutionAtom
  );
  const [classicAnswers, setClassicAnswers] = useAtom(classicAnswersAtom);
  const [dailyId, setDailyId] = useAtom(dailyIdAtom);

  useEffect(() => {
    if (mode !== "classicUnlimited") return;
    if (classicPracticeSolution) {
      setPokemonToGuess({
        ...pokemonToGuess,
        classicUnlimited: classicPracticeSolution,
      });
      if (classicPracticeAnswers)
        setGuessedItems({
          ...guessedItems,
          classicUnlimited: classicPracticeAnswers,
        });
    } else {
      const randomPokemon = pokedex[Math.floor(Math.random() * pokedex.length)];
      setPokemonToGuess({
        ...pokemonToGuess,
        classicUnlimited: randomPokemon,
      });
      localStorage.setItem(
        "classic_practice_solution",
        JSON.stringify(pokemonToGuess)
      );
    }
  }, [
    pokedex,
    setGuessedItems,
    mode,
    dailies,
    setPokemonToGuess,
    classicPracticeSolution,
    classicPracticeAnswers,
  ]);

  const utcDateToLocalStartOfDay = (utcDate: Date) => {
    return startOfDay(
      utcToZonedTime(
        new Date(utcDate),
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )
    );
  };

  useEffect(() => {
    if (mode !== "classic") return;
    // This function will get the start of today in local time and then convert it to UTC.
    const getUTCMidnightForLocalToday = () => {
      const localStartOfDay = startOfDay(new Date()); // Local start of day
      const utcEquivalent = addHours(
        localStartOfDay,
        -localStartOfDay.getTimezoneOffset() / 60
      ); // Adjust for timezone
      return utcEquivalent;
    };

    const todayUTCMidnight = getUTCMidnightForLocalToday();

    const todayDaily = dailies.find((daily) => {
      const dailyDate = new Date(daily.date);
      return todayUTCMidnight.getTime() === dailyDate.getTime();
    });
    if (todayDaily) setDailyId(todayDaily.id);

    console.log(todayDaily);

    const dailyPokemon = pokedex.find(
      (pokemon) => pokemon.id === todayDaily?.classicId
    );
    if (dailyPokemon) {
      setPokemonToGuess({ ...pokemonToGuess, classic: dailyPokemon });
    }
    if (isToday(classicAnswers.date)) {
      setGuessedItems({
        ...guessedItems,
        classic: classicAnswers.answers,
      });
    } else {
      setClassicAnswers(RESET);
    }
  }, [
    pokedex,
    mode,
    dailies,
    classicAnswers.date,
    classicAnswers.answers,
    setPokemonToGuess,
    setGuessedItems,
    setClassicAnswers,
  ]);
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
        <Tab.List className="flex justify-center gap-2">
          <Tab
            as={Link}
            href={"/classic"}
            className="ui-selected:bg-blue-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black"
          >
            Daily
          </Tab>
          <Tab
            as={Link}
            href={`/classic/?unlimited`}
            shallow
            className="ui-selected:bg-blue-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black"
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
