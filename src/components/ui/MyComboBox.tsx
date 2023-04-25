"use client";
import React, { useState, Fragment, useRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useSetAtom, useAtomValue } from "jotai";
import {
  addGuessedItemAtom,
  Pokemon,
  gameOverAtom,
  newGameAtom,
} from "@/atoms/GameAtoms";

export default function MyComboBox({ data }: { data: Pokemon[] }) {
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [query, setQuery] = useState("");
  const addNewGuess = useSetAtom(addGuessedItemAtom);
  const gameOver = useAtomValue(gameOverAtom);
  const setNewGame = useSetAtom(newGameAtom);

  const filteredItems =
    query === ""
      ? data
      : data.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });
  const handleSubmit = () => {
    if (selected && selected.name) {
      addNewGuess(selected);
      setSelected(null);
      setQuery("");
    }
  };

  return (
    <>
      {gameOver === false ? (
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
                          `relative cursor-default select-none border-b border-current py-2 pl-10 pr-4 capitalize ${
                            active ? "bg-teal-600" : ""
                          }`
                        }
                      >
                        <div
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal capitalize"
                          }`}
                        >
                          <div className="text-xl">{item.name}</div>
                          <p>
                            Gen {item.generation}, {item.types[0]}/
                            {item.types[1]}, {item.height / 10}
                            m, {item.weight / 10}kg
                          </p>
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
