"use client";
import {
  currentGameMode,
  pokemonToGuessAtom,
  Pokemon,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import { maxValue, minValue } from "@/constants";
import {
  decimeterToImperial,
  hectogramToImperial,
} from "@/helpers/Conversions";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect, useState } from "react";

type StatRange = {
  min: number;
  max: number;
};

type RangeState = {
  whosthatpokemon: { max: number; min: number };
  whosthatpokemonUnlimited: { max: number; min: number };
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

  const updateRange = useCallback((setRange:React.Dispatch<React.SetStateAction<RangeState>>, itemValue:number, pokemonValue:number, range:RangeState) => {
    if (itemValue < range[mode].max && itemValue > pokemonValue) {
      setRange((prev) => ({
        ...prev,
        [mode]: { ...prev[mode], max: itemValue },
      }));
    }
    if (itemValue > range[mode].min && itemValue < pokemonValue) {
      setRange((prev) => ({
        ...prev,
        [mode]: { ...prev[mode], min: itemValue },
      }));
    }
    if (itemValue === pokemonValue && range[mode].min !== range[mode].max) {
      setRange((prev) => ({
        ...prev,
        [mode]: {
          min: pokemonValue,
          max: pokemonValue,
        },
      }));
    }
  },[mode]);

  useEffect(() => {
    setGenerationRange({
      whosthatpokemon: { max: maxValue, min: minValue },
      whosthatpokemonUnlimited: { max: maxValue, min: minValue },
    });
    setWeightRange({
      whosthatpokemon: { max: maxValue, min: minValue },
      whosthatpokemonUnlimited: { max: maxValue, min: minValue },
    });
    setHeightRange({
      whosthatpokemon: { max: maxValue, min: minValue },
      whosthatpokemonUnlimited: { max: maxValue, min: minValue },
    });
    console.log("reset");
  }, [pokemonToGuess]);


  useEffect(() => {
    if (!pokemonToGuess) {
      return;
    }
    guessedItems.forEach((item) => {
      updateRange(setGenerationRange, item.generation, pokemonToGuess?.generation, generationRange);
    });
    console.log("update generation");
  }, [generationRange, guessedItems, mode, pokemonToGuess, pokemonToGuess?.generation, updateRange]);
  
  useEffect(() => {
    if (!pokemonToGuess) {
      return;
    }
    guessedItems.forEach((item) => {
      updateRange(setWeightRange, item.weight, pokemonToGuess.weight, weightRange);
    });
    console.log("update weight");
  }, [guessedItems, mode, pokemonToGuess, pokemonToGuess?.weight, updateRange, weightRange]);
  
  useEffect(() => {
    if (!pokemonToGuess) {
      return;
    }
    guessedItems.forEach((item) => {
      updateRange(setHeightRange, item.height, pokemonToGuess.height, heightRange);
    });
    console.log("update height");
  }, [guessedItems, heightRange, mode, pokemonToGuess, pokemonToGuess?.height, updateRange]);


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
