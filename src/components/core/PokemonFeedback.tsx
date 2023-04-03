import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { guessAtom, itemAtom } from "@/stores/Store";
import { guessedAnswerAtom } from "../ui/MyComboBox";

export default function PokemonFeedback() {
  const [item] = useAtom(itemAtom);
  const [guesses, setGuesses] = useAtom(guessAtom);
  const [guessedAnswer, setGuessedAnswer] = useAtom(guessedAnswerAtom);
  console.log("Feedback rerendered");
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
