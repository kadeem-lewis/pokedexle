"use client";
import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Fuse from "fuse.js";
import { useSetAtom, useAtomValue } from "jotai";
import {
  addGuessedItemAtom,
  Pokemon,
  gameOverAtom,
  newGameAtom,
  pokedexAtom,
} from "@/atoms/GameAtoms";
import { TYPES } from "@/components/core/PokemonTypes";
import Image from "next/image";
export default function MyComboBox() {
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [query, setQuery] = useState("");
  const pokedex = useAtomValue(pokedexAtom);

  const fuse = new Fuse(pokedex, {
    includeScore: true,
    keys: ["name", "types"],
  });
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
      addNewGuess(selected);
      setSelected(null);
      setQuery("");
    }
  };

  return (
    <>
      {!gameOver ? (
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
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black">
                  {filteredItems.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none px-4 py-2">
                      Nothing found.
                    </div>
                  ) : (
                    filteredItems.map((item) => (
                      <Combobox.Option
                        key={item.name}
                        value={item}
                        className={({ active }) =>
                          `relative cursor-default select-none border-b border-current py-2 pl-4 pr-4 capitalize ${
                            active ? "bg-teal-600" : ""
                          }`
                        }
                      >
                        <div
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal capitalize"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              src={item.sprite}
                              width={100}
                              height={100}
                              alt={`${item.name} sprite`}
                              className=""
                            />
                            <div className="grid grid-cols-2">
                              <div className="text-xl font-bold">
                                {item.name}
                              </div>
                              <div>Gen {item.generation}</div>
                              <div className="col-span-2 space-x-2">
                                {item.types.map((type) => {
                                  const typeObj = TYPES.find(
                                    (element) => element.name === type
                                  );
                                  return typeObj ? (
                                    <span
                                      key={type}
                                      className={`text-shadow rounded-md border-b-2 border-t-2 px-1 py-[2px] text-center text-sm uppercase ${typeObj.color} ${typeObj.borderBottomColor} ${typeObj.borderTopColor}`}
                                    >
                                      {type}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                              <div className="space-x-4">
                                <span>Height: {item.height / 10}m</span>
                                <span>Weight: {item.weight / 10}kg</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="text-border flex-none cursor-pointer border-2 bg-purple-300 px-3 py-2 uppercase text-white outline outline-black hover:bg-purple-400"
          >
            Submit
          </button>
        </div>
      ) : (
        <button onClick={() => setNewGame()}>New Game</button>
      )}
    </>
  );
}
