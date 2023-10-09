import React from "react";
import { defaultGuesses } from "@/atoms/GameAtoms";

export default function HowToPlayContent() {
  return (
    <div className=" text-2xl space-y-2">
      <p>Guess the pokemon in {defaultGuesses} tries</p>
      <hr />
      <p>
        Simply type in the name of a pokemon and it will reveal its properties
      </p>
      <hr />
      <p>
        The color of the tiles will change to show how close your guess was to
        the pokemon to find.
      </p>
    </div>
  );
}
