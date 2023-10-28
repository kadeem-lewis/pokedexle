"use client";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import MoveCombobox from "./MoveCombobox";
import { Button } from "../ui/Button";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  currentGameMode,
  dailyAtom,
  dailyPokemonAtom,
  guessAtom,
  guessedItemsAtom,
  moveAnswersAtom,
  moveListAtom,
  movePracticeAnswersAtom,
  pokemonToGuessAtom,
} from "@/atoms/GameAtoms";
import { Daily } from "@prisma/client";
import { type Move } from "@/atoms/GameAtoms";
import PokemonTypes from "../PokemonTypes";
import { useHydrateAtoms } from "jotai/utils";
import { addDays, format, isSameDay, startOfToday } from "date-fns";
import { defaultGuesses } from "@/constants";
import { usePathname } from "next/navigation";
import MoveFeedback from "./MoveFeedback";

type GameboxProps = {
  moveList: Move[];
};

export default function Gamebox({ moveList }: GameboxProps) {
  useHydrateAtoms([[moveListAtom, moveList]]);
  const [mode, setMode] = useAtom(currentGameMode);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const movePracticeAnswers = useAtomValue(movePracticeAnswersAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const { date, moveId } = useAtomValue<Promise<Daily>>(dailyAtom);
  const [moveAnswers, setMoveAnswers] = useAtom(moveAnswersAtom);
  const setDailyMove = useSetAtom(dailyPokemonAtom);
  const currentPath = usePathname();

  useEffect(() => {
    if (currentPath === "/move" && selectedIndex === 0) setMode("move");
  }, [currentPath, selectedIndex, setMode]);

  useEffect(() => {
    function setDailies() {
      const dailyClassicMove = moveList.find((move) => move.id === moveId);
      if (!dailyClassicMove) throw new Error("Daily Move Not Found");

      setDailyMove((prev) => ({
        ...prev,
        move: dailyClassicMove,
      }));
    }
    setDailies();
  }, [moveId, moveList, setDailyMove]);

  useEffect(() => {
    if (mode !== "move") return;

    const localTime = format(new Date(moveAnswers.date), "yyyy-MM-dd");
    const serverTime = format(new Date(date), "yyyy-MM-dd");
    if (serverTime === localTime) {
      setGuessedItems((prev) => ({
        ...prev,
        move: moveAnswers.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        move: defaultGuesses - moveAnswers.answers.length,
      }));
    } else {
      setMoveAnswers({
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
    moveAnswers.date,
    moveAnswers.answers,
    setMoveAnswers,
  ]);

  useEffect(() => {
    if (
      movePracticeAnswers !== null &&
      mode === "moveUnlimited" &&
      guessedItems.moveUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        moveUnlimited: movePracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        moveUnlimited: defaultGuesses - movePracticeAnswers.length,
      }));
    }
  }, [
    mode,
    setGuessedItems,
    setGuesses,
    guessedItems.whosthatpokemonUnlimited,
    movePracticeAnswers,
    guessedItems.moveUnlimited.length,
  ]);

  return (
    <>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          if (index === 0) {
            setMode("move");
          } else {
            setMode("moveUnlimited");
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
            {pokemonToGuess.move && (
              <MoveFeedback correctAnswer={pokemonToGuess.move} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {pokemonToGuess.moveUnlimited && (
              <MoveFeedback correctAnswer={pokemonToGuess.moveUnlimited} />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* <PokemonTypes /> */}
      <MoveCombobox />
    </>
  );
}
