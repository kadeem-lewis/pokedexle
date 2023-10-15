import React from "react";
import { Icons } from "../Icons";
import { useAtomValue } from "jotai";
import { currentGameMode, guessAtom } from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";

export default function Guesses() {
  const mode = useAtomValue(currentGameMode);
  const guesses = useAtomValue(guessAtom)[mode];

  return (
    <div className="my-4 flex flex-row justify-end gap-0.5 ">
      {[...Array(defaultGuesses)].map((value, index) => (
        <Icons.pokeball
          key={index}
          className={`h-6 w-6 ${index + 1 > guesses ? "grayscale" : ""}`}
        />
      ))}
    </div>
  );
}
