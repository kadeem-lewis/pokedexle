"use client";
import {
  moveListAtom,
  currentGameMode,
  guessedItemsAtom,
  gameOverAtom,
  newGameAtom,
  Move,
  addGuessedMoveAtom,
} from "@/atoms/GameAtoms";
import { Combobox, Transition } from "@headlessui/react";
import { startOfTomorrow } from "date-fns";
import Fuse from "fuse.js";
import { useAtomValue, useSetAtom } from "jotai";
import React, { Fragment, useMemo, useState } from "react";
import { Button } from "../ui/Button";
import Countdown from "../Countdown";
import Image from "next/image";
import { TypeBadge } from "../ui/TypeBadge";
import { PokemonType } from "../PokemonTypes";

export default function MoveCombobox() {
  const [selected, setSelected] = useState<Move | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const moveList = useAtomValue(moveListAtom);
  const mode = useAtomValue(currentGameMode);
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
  const addNewGuess = useSetAtom(addGuessedMoveAtom);
  const gameOver = useAtomValue(gameOverAtom);
  const setNewGame = useSetAtom(newGameAtom);

  const fuse = useMemo(
    () =>
      new Fuse(moveList, {
        keys: ["name", "types"],
        threshold: 0.3,
      }),
    [moveList],
  );

  const filteredItems =
    query === ""
      ? moveList.slice(0, 6)
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
                  displayValue={(item: Move) => item?.name}
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
                  <Combobox.Options className=" absolute mt-1 h-fit max-h-80 w-full overflow-y-auto rounded-md bg-primary text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:max-h-[590px]">
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
                          <div className="block h-24 truncate">
                            <div className="flex h-full items-center justify-center gap-4">
                              <Image
                                src={`/images/${item.class}-icon.png`}
                                width={80}
                                height={80}
                                alt={`${item.class} icon`}
                              />
                              <div className="grid grid-cols-2 text-xl">
                                <div className="capitalize">{item.name}</div>
                                <div>Gen {item.generation}</div>
                                <div className="col-span-2 flex">
                                  <TypeBadge
                                    type={item.type as PokemonType}
                                    className="px-1 py-0.5 text-sm"
                                  >
                                    {item.type}
                                  </TypeBadge>
                                </div>
                                <div className="space-x-4">
                                  <span className="space-x-1">
                                    <span>Power:</span>
                                    <span>
                                      {item.power ? item.power : "N/A"}
                                    </span>
                                  </span>
                                  <span className="space-x-1">
                                    <span>PP:</span>
                                    <span>{item.pp}</span>
                                  </span>
                                  <span className="space-x-1">
                                    <span>Accuracy:</span>
                                    <span>
                                      {item.accuracy ? item.accuracy : "N/A"}
                                    </span>
                                  </span>
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
            <Button
              type="submit"
              variant="flat"
              className="flex-none cursor-pointer bg-purple-300   hover:bg-purple-400"
            >
              Submit
            </Button>
          </form>
          {error && <p>Move Already Entered</p>}
        </>
      ) : mode === "moveUnlimited" ? (
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
          <Countdown targetDate={startOfTomorrow()} />
        </div>
      )}
    </>
  );
}
