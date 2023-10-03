import React from "react";
import Image from "next/image";
import {Icons} from "@/components/Icons";
import { useAtomValue } from "jotai";
import { guessAtom } from "@/atoms/GameAtoms";

export default function Guesses() {
  const totalGuesses = 8;
  const guesses = useAtomValue(guessAtom);

  return (
    <div className="my-4 flex flex-row justify-end gap-1">
      {[...Array(totalGuesses)].map((value, index) => (
        <Icons.pokeball
          key={index}
          className={` -mx-5 aspect-auto h-6 ${
            index + 1 > guesses ? "grayscale" : ""
          }`}
        />
      ))}
    </div>
  );
}
