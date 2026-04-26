"use client";
import { Pokemon } from "@/atoms/GameAtoms";
import {
  decimeterToImperial,
  hectogramToImperial,
} from "@/helpers/Conversions";
import React, { useCallback, useEffect, useState } from "react";

type StatRange = {
  min: number;
  max: number;
};

type RangeState = {
  max: number;
  min: number;
};

export default function StatsRange({
  correctAnswer,
  guessedItems,
}: {
  correctAnswer: Pokemon;
  guessedItems: Pokemon[];
}) {
  const [generationRange, setGenerationRange] = useState({
    max: Infinity,
    min: -Infinity,
  });
  const [weightRange, setWeightRange] = useState({
    max: Infinity,
    min: -Infinity,
  });
  const [heightRange, setHeightRange] = useState({
    max: Infinity,
    min: -Infinity,
  });

  const updateRange = useCallback(
    (
      setRange: React.Dispatch<React.SetStateAction<RangeState>>,
      itemValue: number,
      pokemonValue: number,
      range: RangeState,
    ) => {
      if (itemValue < range.max && itemValue > pokemonValue) {
        setRange((prev) => ({
          ...prev,
          max: itemValue,
        }));
      }
      if (itemValue > range.min && itemValue < pokemonValue) {
        setRange((prev) => ({
          ...prev,
          min: itemValue,
        }));
      }
      if (itemValue === pokemonValue && range.min !== range.max) {
        setRange({
          min: pokemonValue,
          max: pokemonValue,
        });
      }
    },
    [],
  );

  useEffect(() => {
    guessedItems.forEach((item) => {
      updateRange(
        setGenerationRange,
        item.generation,
        correctAnswer.generation,
        generationRange,
      );
    });
  }, [generationRange, guessedItems, correctAnswer.generation, updateRange]);

  useEffect(() => {
    guessedItems.forEach((item) => {
      updateRange(
        setWeightRange,
        item.weight,
        correctAnswer.weight,
        weightRange,
      );
    });
  }, [guessedItems, correctAnswer.weight, updateRange, weightRange]);

  useEffect(() => {
    guessedItems.forEach((item) => {
      updateRange(
        setHeightRange,
        item.height,
        correctAnswer.height,
        heightRange,
      );
    });
  }, [guessedItems, heightRange, correctAnswer.height, updateRange]);

  function displayHeightRange(heightRange: StatRange) {
    if (!heightRange) {
      return <span>???</span>;
    }
    if (heightRange.min !== -Infinity || heightRange.max !== Infinity) {
      if (heightRange.min === -Infinity && heightRange.max !== Infinity) {
        return <span>??? - {decimeterToImperial(heightRange.max)}</span>;
      }
      if (heightRange.max === Infinity && heightRange.min !== -Infinity) {
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
    }
    return <span>???</span>;
  }
  function displayWeightRange(weightRange: StatRange) {
    if (!weightRange) {
      return <span>???</span>;
    }
    if (weightRange.min !== -Infinity || weightRange.max !== Infinity) {
      if (weightRange.min === -Infinity && weightRange.max !== Infinity) {
        return <span>??? - {hectogramToImperial(weightRange.max)}</span>;
      }
      if (weightRange.max === Infinity && weightRange.min !== -Infinity) {
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
    }
    return <span>???</span>;
  }

  function displayGenerationRange(generationRange: StatRange) {
    if (!generationRange) {
      return <span>???</span>;
    }
    if (generationRange.min !== -Infinity || generationRange.max !== Infinity) {
      if (
        generationRange.min === -Infinity &&
        generationRange.max !== Infinity
      ) {
        return <span>??? - {generationRange.max}</span>;
      }
      if (
        generationRange.max === Infinity &&
        generationRange.min !== -Infinity
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
    <div className="my-4 flex flex-wrap justify-between gap-3 text-center text-2xl">
      <div className="grow space-x-2">
        <span className="font-semibold">Gen:</span>
        <span>{displayGenerationRange(generationRange)}</span>
      </div>
      <div className="grow space-x-2">
        <span className="font-semibold">HT:</span>
        <span>{displayHeightRange(heightRange)}</span>
      </div>
      <div className="grow space-x-2">
        <span className="font-semibold">WT:</span>
        <span>{displayWeightRange(weightRange)}</span>
      </div>
    </div>
  );
}
