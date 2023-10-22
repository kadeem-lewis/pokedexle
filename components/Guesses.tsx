import React, { Fragment } from "react";
import { Icons } from "./Icons";
import { useAtomValue } from "jotai";
import { Tooltip } from "react-tooltip";
import {
  Pokemon,
  currentGameMode,
  guessAtom,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import PokemonCard from "./ui/PokemonCard";

export default function Guesses() {
  const mode = useAtomValue(currentGameMode);
  const guesses = useAtomValue(guessAtom)[mode];
  const guessedItems = useAtomValue(guessedItemsAtom)[mode] as Pokemon[];

  return (
    <div className="my-4 flex flex-row justify-end gap-0.5 ">
      {[...Array(defaultGuesses)].map((value, index) => (
        <Fragment key={index}>
          <Icons.pokeball
            data-tooltip-id={`guess-data-${index}`}
            className={`h-6 w-6 ${index + 1 > guesses ? "grayscale" : ""}`}
          />
          {(mode === "whosthatpokemon" ||
            mode === "whosthatpokemonUnlimited") &&
            guessedItems[index] && (
              <Tooltip id={`guess-data-${index}`}>
                <PokemonCard pokemon={guessedItems[index]} />
              </Tooltip>
            )}
        </Fragment>
      ))}
    </div>
  );
}
