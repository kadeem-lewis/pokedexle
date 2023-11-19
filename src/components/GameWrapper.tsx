"use client";
import {
  Pokemon,
  currentGameMode,
  dailyAtom,
  dailyPokemonAtom,
  gameOverAtom,
  newGameAtom,
  pokedexAtom,
} from "@/atoms/GameAtoms";
import { Daily } from "@prisma/client";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ClassicGamebox from "./classic/Gamebox";
import WhosThatPokemonGamebox from "./whosthatpokemon/Gamebox";
import MyComboBox from "./ui/MyComboBox";
import Countdown from "./Countdown";
import { startOfTomorrow } from "date-fns";
import { Button } from "./ui/Button";
import PokemonTypes from "./PokemonTypes";

type GameWrapperProps = {
  pokedex: Pokemon[];
  dailies: Daily;
};

export default function GameWrapper({ pokedex, dailies }: GameWrapperProps) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const pokedexer = pokedex;
  console.log("Pokedex 1st call:",pokedex)
  useHydrateAtoms([[dailyAtom, dailies]]);
  const [mode, setMode] = useAtom(currentGameMode);
  const pokedexy = useAtomValue(pokedexAtom);
  const { classicId, whosThatPokemonId } = dailies;
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);
  const gameOver = useAtomValue(gameOverAtom);

  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const targetDate = startOfTomorrow();
  const setNewGame = useSetAtom(newGameAtom);

  useEffect(() => {
    if (currentPath === "/classic") {
      if (searchParams.get("mode") === "unlimited") setMode("classicUnlimited");
      else setMode("classic");
    } else if (currentPath === "/whosthatpokemon") {
      if (searchParams.get("mode") === "unlimited")
        setMode("whosthatpokemonUnlimited");
      else setMode("whosthatpokemon");
    }
  }, [currentPath, searchParams, setMode]);

  useEffect(() => {
    console.log("Set Dailies useEffect is running");
    console.log("Pokedex 2nd call:",pokedex)
    console.log("Pokedexy:",pokedexy)
    console.log("Pokedexer:",pokedexer)
    function setDailies() {
      console.log("Pokemon Ids:",classicId, whosThatPokemonId)
      const dailyClassicPokemon = pokedex.find(
        (pokemon) => pokemon.id === classicId,
      );
      console.log("Daily Classic Pokemon:",dailyClassicPokemon)
      const dailyWhosThatPokemon = pokedex.find(
        (pokemon) => pokemon.id === whosThatPokemonId,
      );
      console.log("Daily WTP Pokemon:",dailyWhosThatPokemon)
      if (!dailyWhosThatPokemon) throw new Error("Daily WTP Pokemon Not Found");
      if (!dailyClassicPokemon) throw new Error("Daily Classic Pokemon Not Found");

      setDailyPokemon((prev) => ({
        ...prev,
        whosthatpokemon: dailyWhosThatPokemon,
        classic: dailyClassicPokemon,
      }));
    }
    setDailies();
  }, [classicId, pokedex, setDailyPokemon, whosThatPokemonId]);

  return (
    <>
      {currentPath === "/classic" && <ClassicGamebox />}
      {currentPath === "/whosthatpokemon" && <WhosThatPokemonGamebox />}
      <PokemonTypes />
      {!gameOver[mode] ? (
        <MyComboBox />
      ) : mode === "classicUnlimited" || mode === "whosthatpokemonUnlimited" ? (
        <div className="my-2 flex justify-center">
          <Button
            variant="flat"
            className="bg-blue-400 hover:bg-blue-500"
            onClick={() => setNewGame()}
          >
            New Game
          </Button>
        </div>
      ) : (
        <div className="my-2 flex items-center justify-center gap-2">
          <p className="text-3xl">New Game in:</p>
          <Countdown targetDate={targetDate} />
        </div>
      )}
    </>
  );
}
