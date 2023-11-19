"use client";
import {
  currentGameMode,
  pokemonToGuessAtom,
  Pokemon,
  guessAtom,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import { maxValue, minValue } from "@/constants";
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
  const mode = useAtomValue(currentGameMode) as
    | "whosthatpokemon"
    | "whosthatpokemonUnlimited";
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom)[mode];
  const guessedItems = useAtomValue(guessedItemsAtom)[mode] as Pokemon[];

  const [generationRange, setGenerationRange] = useState({
    whosthatpokemon: { max: maxValue, min: minValue },
    whosthatpokemonUnlimited: { max: maxValue, min: minValue },
  });
  const [weightRange, setWeightRange] = useState({
    whosthatpokemon: { max: maxValue, min: minValue },
    whosthatpokemonUnlimited: { max: maxValue, min: minValue },
  });
  const [heightRange, setHeightRange] = useState({
    whosthatpokemon: { max: maxValue, min: minValue },
    whosthatpokemonUnlimited: { max: maxValue, min: minValue },
  });

  useEffect(() => {
    if (!pokemonToGuess) {
      return;
    }

    for (const item of guessedItems) {
      if (
        item.height < heightRange[mode].max &&
        item.height > pokemonToGuess.height
      ) {
        setHeightRange((prev) => ({
          ...prev,
          [mode]: { ...prev[mode], max: item.height },
        }));
      }
      if (
        item.height > heightRange[mode].min &&
        item.height < pokemonToGuess.height
      ) {
        setHeightRange((prev) => ({
          ...prev,
          [mode]: { ...prev[mode], min: item.height },
        }));
      }
      if (item.height === pokemonToGuess.height) {
        setHeightRange((prev) => ({
          ...prev,
          [mode]: {
            min: pokemonToGuess.height,
            max: pokemonToGuess.height,
          },
        }));
      }
      if (
        item.weight < weightRange[mode].max &&
        item.weight > pokemonToGuess.weight
      ) {
        setWeightRange((prev) => ({
          ...prev,
          [mode]: { ...prev[mode], max: item.weight },
        }));
      }
      if (
        item.weight > weightRange[mode].min &&
        item.weight < pokemonToGuess.weight
      ) {
        setWeightRange((prev) => ({
          ...prev,
          [mode]: { ...prev[mode], min: item.weight },
        }));
      }
      if (item.weight === pokemonToGuess.weight) {
        setWeightRange((prev) => ({
          ...prev,
          [mode]: {
            min: pokemonToGuess.weight,
            max: pokemonToGuess.weight,
          },
        }));
      }
      if (
        item.generation < generationRange[mode].max &&
        item.generation > pokemonToGuess.generation
      ) {
        setGenerationRange((prev) => ({
          ...prev,
          [mode]: { ...prev[mode], max: item.generation },
        }));
      }
      if (
        item.generation > generationRange[mode].min &&
        item.generation < pokemonToGuess.generation
      ) {
        setGenerationRange((prev) => ({
          ...prev,
          [mode]: { ...prev[mode], min: item.generation },
        }));
      }
      if (item.generation === pokemonToGuess.generation) {
        setGenerationRange((prev) => ({
          ...prev,
          [mode]: {
            min: pokemonToGuess.generation,
            max: pokemonToGuess.generation,
          },
        }));
      }
    }
  }, [
    generationRange,
    guessedItems,
    heightRange,
    mode,
    pokemonToGuess,
    pokemonToGuess?.generation,
    pokemonToGuess?.height,
    pokemonToGuess?.weight,
    weightRange,
  ]);

  function displayHeightRange(heightRange: StatRange) {
    if (!heightRange) {
      return <span>???</span>;
    }
    if (heightRange.min !== minValue || heightRange.max !== maxValue) {
      if (heightRange.min === minValue && heightRange.max !== maxValue) {
        return <span>??? - {decimeterToImperial(heightRange.max)}</span>;
      }
      if (heightRange.max === maxValue && heightRange.min !== minValue) {
        return <span>{decimeterToImperial(heightRange.min)} - ???</span>;
      }
      if (heightRange.min === heightRange.max) {
        return <span>{decimeterToImperial(heightRange.min)}</span>;
      }
      return (
        <span>
          {decimeterToImperial(heightRange.min)} -{" "}
          {decimeterToImperial(heightRange.max)}
        </span>
      );
    } else {
      return <span>???</span>;
    }
  }
  function displayWeightRange(weightRange: StatRange) {
    if (!weightRange) {
      return <span>???</span>;
    }
    if (weightRange.min !== minValue || weightRange.max !== maxValue) {
      if (weightRange.min === minValue && weightRange.max !== maxValue) {
        return <span>??? - {hectogramToImperial(weightRange.max)}</span>;
      }
      if (weightRange.max === maxValue && weightRange.min !== minValue) {
        return <span>{hectogramToImperial(weightRange.min)} - ???</span>;
      }
      if (weightRange.min === weightRange.max) {
        return <span>{hectogramToImperial(weightRange.min)}</span>;
      }
      return (
        <span>
          {hectogramToImperial(weightRange.min)} -{" "}
          {hectogramToImperial(weightRange.max)}
        </span>
      );
    } else {
      return <span>???</span>;
    }
  }

  function displayGenerationRange(generationRange: StatRange) {
    if (!generationRange) {
      return <span>???</span>;
    }
    if (generationRange.min !== minValue || generationRange.max !== maxValue) {
      if (
        generationRange.min === minValue &&
        generationRange.max !== maxValue
      ) {
        return <span>??? - {generationRange.max}</span>;
      }
      if (
        generationRange.max === maxValue &&
        generationRange.min !== minValue
      ) {
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
        <span>{displayGenerationRange(generationRange[mode])}</span>
      </div>
      <div className="space-x-2">
        <span>HT:</span>
        <span>{displayHeightRange(heightRange[mode])}</span>
      </div>
      <div className="space-x-2">
        <span>WT:</span>
        <span>{displayWeightRange(weightRange[mode])}</span>
      </div>
    </div>
  );
}
