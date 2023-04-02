import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { guessAtom, itemAtom } from "./Gamebox";
import { guessedAnswerAtom } from "../ui/MyComboBox";

export default function PokemonFeedback() {
  const [item] = useAtom(itemAtom);
  const [guesses, setGuesses] = useAtom(guessAtom);
  const [guessedAnswer] = useAtom(guessedAnswerAtom);
  console.log(guessedAnswer);

  useEffect(() => {
    const getItem = async () => {
      const res = await fetch(guessedAnswer);
    };
  });
  return <div>PokemonFeedback</div>;
}
