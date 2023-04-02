import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { guessAtom, itemAtom } from "./Gamebox";
import { guessedAnswerAtom } from "../ui/MyComboBox";

export default function PokemonFeedback() {
  const [item] = useAtom(itemAtom);
  const [guesses, setGuesses] = useAtom(guessAtom);
  const [guessedAnswer, setGuessedAnswer] = useAtom(guessedAnswerAtom);
  console.log(guessedAnswer);

  useEffect(() => {
    const getItem = async () => {
      const res = await fetch(guessedAnswer.url);
      const data = await res.json();
      setGuessedAnswer(data);
    };
  }, [guessedAnswer, setGuessedAnswer]);
  return <div>PokemonFeedback</div>;
}
