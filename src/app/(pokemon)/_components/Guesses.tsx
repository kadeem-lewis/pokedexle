"use client";
import { useAtomValue } from "jotai";
import { Button, TooltipTrigger } from "react-aria-components";
import Tooltip from "../../../components/ui/Tooltip";
import {
  currentGameMode,
  guessAtom,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import PokemonCard from "../../../components/ui/PokemonCard";
import Image from "next/image";

export default function Guesses() {
  const mode = useAtomValue(currentGameMode);
  const guesses = useAtomValue(guessAtom)[mode];
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];

  //TODO: make pokeball icon focusable so I don't have to wrap it in a button
  return (
    <div className="my-4 flex flex-row justify-end gap-0.5 ">
      {[...Array(defaultGuesses)].map((value, index) => (
        <TooltipTrigger key={index} delay={0}>
          <Button>
            <Image
              width={24}
              height={24}
              src="./svgs/pokeball.svg"
              alt="Pokeball Icon"
              className={index + 1 > guesses ? "grayscale" : ""}
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
