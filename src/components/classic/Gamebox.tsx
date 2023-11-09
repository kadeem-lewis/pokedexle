"use client";
import { useEffect } from "react";
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
  dailyPokemonAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import PokemonFeedback from "./PokemonFeedback";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { format } from "date-fns";
import { usePathname, useSearchParams } from "next/navigation";
import { Daily } from "@prisma/client";

type GameboxProps = {
  pokedex: Pokemon[];
  dailies: Daily;
};

export default function Gamebox({ pokedex, dailies }: GameboxProps) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const classicPracticeAnswers = useAtomValue(classicPracticeAnswersAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const [mode, setMode] = useAtom(currentGameMode);
  const { date, classicId } = dailies;
  const [classicAnswers, setClassicAnswers] = useAtom(classicAnswersAtom);
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);

  const currentPath = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("change mode useEffect is running");
    if (currentPath === "/classic") setMode("classic");
    if (searchParams.get("mode") === "unlimited") setMode("classicUnlimited");
  }, [currentPath, searchParams, setMode]);

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
    const serverTime = format(new Date(date), "yyyy-MM-dd");
    if (serverTime === classicAnswers.date) {
      setGuessedItems((prev) => ({
        ...prev,
        classic: classicAnswers.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classic: defaultGuesses - classicAnswers.answers.length,
      }));
    } else {
      console.log("HaHa I keep printing");
      setClassicAnswers({
        date: serverTime,
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
      {pokemonToGuess.classic && !searchParams.has("mode") && (
        <PokemonFeedback correctAnswer={pokemonToGuess.classic} />
      )}
      {pokemonToGuess.classicUnlimited &&
        searchParams.get("mode") === "unlimited" && (
          <PokemonFeedback correctAnswer={pokemonToGuess.classicUnlimited} />
        )}
    </>
  );
}
