import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  pokemonToGuessAtom,
  newGameAtom,
  currentGameMode,
  guessAtom,
  Pokemon,
} from "@/atoms/GameAtoms";
import Image from "next/image";
import Countdown from "../Countdown";
import { addDays, startOfDay } from "date-fns";
import Share from "../Share";

export default function GameOverContent() {
  const mode = useAtomValue(currentGameMode);
  const setNewGame = useSetAtom(newGameAtom);
  const guesses = useAtomValue(guessAtom)[mode];
  const pokemonGuesses = useAtomValue(pokemonToGuessAtom);
  const correctAnswer = pokemonGuesses[mode] as Pokemon | null;

  const targetDate = addDays(startOfDay(new Date()), 1);
  return (
    <div>
      <div className="text-3xl">
        {guesses > 0 ? (
          <p>You won!!</p>
        ) : (
          <p>You Lost. Better luck Next Time!</p>
        )}
      </div>

      {correctAnswer && (
        <div className="flex flex-col items-center justify-center">
          <Image
            src={correctAnswer.sprite}
            alt={`${correctAnswer.name} sprite`}
            priority={true}
            width={200}
            height={200}
          />
          <p className="text-2xl">The answer was : {correctAnswer.name}</p>
        </div>
      )}
      {mode === "classicUnlimited" || mode === "whosthatpokemonUnlimited" ? (
        <div className="flex justify-center gap-4 text-2xl">
          <span>Wanna try again?</span>
          <button onClick={() => setNewGame()}>New Game</button>
        </div>
      ) : (
        <>
          <p className="text-2xl">New Game in:</p>
          <Countdown targetDate={targetDate} />
          <Share />
        </>
      )}
    </div>
  );
}
