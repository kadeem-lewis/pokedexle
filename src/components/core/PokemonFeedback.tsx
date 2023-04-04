"use client";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { guessAtom, itemAtom, Pokemon } from "@/stores/Store";
import { guessedAnswerAtom } from "../ui/MyComboBox";

export default function PokemonFeedback({
  correctAnswer,
}: {
  correctAnswer: Pokemon;
}) {
  const [item, setItem] = useAtom(itemAtom);
  const [guesses, setGuesses] = useAtom(guessAtom);
  const [guessedAnswer, setGuessedAnswer] = useAtom(guessedAnswerAtom);
  console.log("Feedback rerendered");
  console.log(guessedAnswer);

  useEffect(() => {}, [guessedAnswer, setGuessedAnswer]);
  return <div>PokemonFeedback</div>;
}
