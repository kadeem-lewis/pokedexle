import React from "react";
import { Icons } from "../Icons";
import { useAtomValue } from "jotai";
import { currentGameMode, defaultGuesses, guessAtom } from "@/atoms/GameAtoms";

export default function Guesses() {
  const mode = useAtomValue(currentGameMode);
  const guesses = useAtomValue(guessAtom)[mode];

  return (
    <div className="gap-0.5 my-4 flex flex-row justify-end ">
      {[...Array(defaultGuesses)].map((value, index) => (
        <Icons.pokeball
          key={index}
          className={`w-6 h-6 ${index + 1 > guesses ? "grayscale" : ""}`}
        />
      ))}
    </div>
  );
}
