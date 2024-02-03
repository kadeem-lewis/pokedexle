"use client";
import { Icons } from "./Icons";
import { useAtomValue } from "jotai";
import { Button, TooltipTrigger } from "react-aria-components";
import Tooltip from "./ui/Tooltip";
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

  //TODO: make pokeball icon focusable so I don't have to wrap it in a button
  return (
    <div className="my-4 flex flex-row justify-end gap-0.5 ">
      {[...Array(defaultGuesses)].map((value, index) => (
        <TooltipTrigger key={index} delay={0}>
          <Button>
            <Icons.pokeball
              className={`h-6 w-6 ${index + 1 > guesses ? "grayscale" : ""}`}
            />
          </Button>
          {(mode === "whosthatpokemon" ||
            mode === "whosthatpokemonUnlimited") &&
            guessedItems[defaultGuesses - 1 - index] && (
              <Tooltip className="bg-primary">
                <PokemonCard
                  pokemon={guessedItems[defaultGuesses - 1 - index]}
                />
              </Tooltip>
            )}
        </TooltipTrigger>
      ))}
    </div>
  );
}
