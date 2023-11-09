import {
  currentGameMode,
  pokemonToGuessAtom,
  Pokemon,
  guessAtom,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import {
  decimeterToImperial,
  hectogramToImperial,
} from "@/helpers/Conversions";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

type StatRange = {
  min: number;
  max: number;
};

export default function StatsRange() {
  const mode = useAtomValue(currentGameMode);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom)[mode] as Pokemon;
  const guessedItems = useAtomValue(guessedItemsAtom)[mode] as Pokemon[];

  const [generationRange, setGenerationRange] = useState({ max: 0, min: 0 });
  const [weightRange, setWeightRange] = useState({ max: 0, min: 0 });
  const [heightRange, setHeightRange] = useState({ max: 0, min: 0 });

  useEffect(() => {
    for (const item of guessedItems) {
      if (
        item.height < heightRange.max &&
        item.height > pokemonToGuess.height
      ) {
        setHeightRange((prev) => ({ ...prev, max: item.height }));
      }
      if (
        item.height > heightRange.min &&
        item.height < pokemonToGuess.height
      ) {
        setHeightRange((prev) => ({ ...prev, min: item.height }));
      }
      if (
        item.weight < weightRange.max &&
        item.weight > pokemonToGuess.weight
      ) {
        setWeightRange((prev) => ({ ...prev, max: item.weight }));
      }
      if (
        item.weight > weightRange.min &&
        item.weight < pokemonToGuess.weight
      ) {
        setWeightRange((prev) => ({ ...prev, min: item.weight }));
      }
      if (
        item.generation < generationRange.max &&
        item.generation > pokemonToGuess.generation
      ) {
        setGenerationRange((prev) => ({ ...prev, max: item.generation }));
      }
      if (
        item.generation > generationRange.min &&
        item.generation < pokemonToGuess.generation
      ) {
        setGenerationRange((prev) => ({ ...prev, min: item.generation }));
      }
    }
  }, [
    generationRange.max,
    generationRange.min,
    guessedItems,
    heightRange.max,
    heightRange.min,
    pokemonToGuess.generation,
    pokemonToGuess.height,
    pokemonToGuess.weight,
    weightRange.max,
    weightRange.min,
  ]);

  function displayHeightRange(heightRange: StatRange) {
    if (heightRange.min === 0 && heightRange.max === 0) return <span>???</span>;
    if (heightRange.min === 0) {
      return <span>??? - {decimeterToImperial(heightRange.max)}</span>;
    }
    if (heightRange.max === 0) {
      return <span>{decimeterToImperial(heightRange.min)} - ???</span>;
    }
    if (heightRange.min === heightRange.max) {
      return <span>{decimeterToImperial(heightRange.min)}</span>;
    }
  }
  function displayWeightRange(weightRange: StatRange) {
    if (weightRange.min === 0 && weightRange.max === 0) return <span>???</span>;
    if (weightRange.min === 0) {
      return <span>??? - {hectogramToImperial(weightRange.max)}</span>;
    }
    if (weightRange.max === 0) {
      return <span>{hectogramToImperial(weightRange.min)} - ???</span>;
    }
    if (weightRange.min === weightRange.max) {
      return <span>{hectogramToImperial(weightRange.min)}</span>;
    }
  }

  function displayGenerationRange(generationRange: StatRange) {
    if (generationRange.min !== 0 || generationRange.max !== 0) {
      if (generationRange.min === 0 && generationRange.max !== 0) {
        return <span>??? - {generationRange.max}</span>;
      }
      if (generationRange.max === 0 && generationRange.min !== 0) {
        return <span>{generationRange.min} - ???</span>;
      }
      if (generationRange.min === generationRange.max) {
        return <span>{generationRange.min}</span>;
      }

      return (
        <span>
          {generationRange.min} - {generationRange.max}
        </span>
      );
    } else {
      return <span>???</span>;
    }
  }

  return (
    <div className="my-4 flex justify-between text-xl">
      <div className="space-x-2">
        <span>Gen:</span>
        <span>{displayGenerationRange(generationRange)}</span>
      </div>
      <div className="space-x-2">
        <span>HT:</span>
        <span>{displayHeightRange(heightRange)}</span>
      </div>
      <div className="space-x-2">
        <span>WT:</span>
        <span>{displayWeightRange(weightRange)}</span>
      </div>
    </div>
  );
}
