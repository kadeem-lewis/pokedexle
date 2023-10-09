import React from "react";
import { Icons } from "../Icons";
import { useAtomValue } from "jotai";
import { currentGameMode, guessAtom } from "../../atoms/GameAtoms";

export default function Guesses() {
  const totalGuesses = 6;
  const mode = useAtomValue(currentGameMode);
  const guesses = useAtomValue(guessAtom)[mode];

  return (
    <div className="my-4 flex flex-row justify-end gap-0.5">
      {[...Array(totalGuesses)].map((value, index) => (
        <Icons.pokeball
          key={index}
          className={`w-6 h-6 ${index + 1 > guesses ? "grayscale" : ""}`}
        />
      ))}
    </div>
  );
}
