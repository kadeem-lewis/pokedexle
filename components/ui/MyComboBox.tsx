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
} from "@/atoms/GameAtoms";
import PokemonCard from "./PokemonCard";
import { Button } from "./Button";
export default function MyComboBox() {
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const pokedex = useAtomValue(pokedexAtom);
  const mode = useAtomValue(currentGameMode);
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];

  const fuse = useMemo(
    () =>
      new Fuse(pokedex, {
        keys: ["name", "types"],
        threshold: 0.3,
      }),
    [pokedex]
  );
  const addNewGuess = useSetAtom(addGuessedItemAtom);
  const gameOver = useAtomValue(gameOverAtom);
  const setNewGame = useSetAtom(newGameAtom);

  const filteredItems =
    query === ""
      ? pokedex.slice(0, 6)
      : fuse
          .search(query)
          .map((res) => ({ ...res.item }))
          .slice(0, 6);
  const handleSubmit = () => {
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
          <div className="my-4 flex flex-row gap-2">
            <Combobox value={selected} onChange={setSelected}>
              <div className="relative mt-1 flex-grow">
                <Combobox.Input
                  onChange={(e) => setQuery(e.target.value)}
                  displayValue={(item: Pokemon) => item?.name}
                  className="w-full border-b-2 border-dashed border-current bg-transparent py-1 pl-3"
                  autoComplete="off"
                />
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-[590px] w-full  rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black">
                    {filteredItems.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none px-4 py-2">
                        Nothing found.
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <Combobox.Option
                          key={item.name}
                          value={item}
                          className="relative cursor-default select-none border-b border-current capitalize ui-active:bg-teal-600"
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
              onClick={() => handleSubmit()}
              variant="flat"
              className="flex-none cursor-pointer bg-purple-300   hover:bg-purple-400"
            >
              Submit
            </Button>
          </div>
          {error && <p>Pokemon Already Entered</p>}
        </>
      ) : mode === "classicUnlimited" ? (
        <button onClick={() => setNewGame()}>New Game</button>
      ) : (
        <p>New Game soon</p>
      )}
    </>
  );
}
