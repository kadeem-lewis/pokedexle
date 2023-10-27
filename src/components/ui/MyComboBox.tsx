"use client";
import React, { useState, Fragment, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Fuse from "fuse.js";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import {
  addGuessedItemAtom,
  Pokemon,
  gameOverAtom,
  newGameAtom,
  pokedexAtom,
  currentGameMode,
  guessedItemsAtom,
} from "@/app/atoms/GameAtoms";
import PokemonCard from "./PokemonCard";
import { Button } from "./Button";
import Countdown from "../Countdown";
import { startOfTomorrow } from "date-fns";

export default function MyComboBox() {
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const pokedex = useAtomValue(pokedexAtom);
  const mode = useAtomValue(currentGameMode);
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
  const targetDate = startOfTomorrow();
  const addNewGuess = useSetAtom(addGuessedItemAtom);
  const gameOver = useAtomValue(gameOverAtom);
  const setNewGame = useSetAtom(newGameAtom);

  const fuse = useMemo(
    () =>
      new Fuse(pokedex, {
        keys: ["name", "types"],
        threshold: 0.3,
      }),
    [pokedex],
  );

  const filteredItems =
    query === ""
      ? pokedex.slice(0, 6)
      : fuse
          .search(query)
          .map((res) => ({ ...res.item }))
          .slice(0, 6);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected && selected.name) {
      if (guessedItems.some((item) => item.name === selected.name)) {
        setError(true);
      } else {
        addNewGuess(selected);
        setError(false);
      }
      setSelected(null);
      setQuery("");
    }
  };

  return (
    <>
      {!gameOver[mode] ? (
        <>
          <form onSubmit={handleSubmit} className="my-4 flex flex-row gap-2">
            <Combobox value={selected} onChange={setSelected}>
              <div className="relative mt-1 flex-grow">
                <Combobox.Input
                  onChange={(e) => setQuery(e.target.value)}
                  displayValue={(item: Pokemon) => item?.name}
                  className="w-full border-b-2 border-dashed border-foreground bg-transparent py-1 pl-3"
                  autoComplete="off"
                />
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options className=" absolute mt-1 h-fit max-h-80 w-full  overflow-y-auto rounded-md bg-primary text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:max-h-[590px]">
                    {filteredItems.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none px-4 py-2">
                        Nothing found.
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <Combobox.Option
                          key={item.name}
                          value={item}
                          className="relative cursor-default select-none border-b border-foreground capitalize ui-active:bg-teal-600"
                        >
                          <PokemonCard pokemon={item} />
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
            <Button
              type="submit"
              variant="flat"
              className="flex-none cursor-pointer bg-purple-300   hover:bg-purple-400"
            >
              Submit
            </Button>
          </form>
          {error && <p>Pokemon Already Entered</p>}
        </>
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
