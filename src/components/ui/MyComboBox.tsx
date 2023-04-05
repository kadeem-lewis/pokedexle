"use client";
import React, { useState, Fragment, useRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { atom, useAtom, useSetAtom } from "jotai";
import { addGuessedItemAtom, Pokemon } from "@/atoms/GameAtoms";

export default function MyComboBox({ data }: { data: Pokemon[] }) {
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [query, setQuery] = useState("");
  const addNewGuess = useSetAtom(addGuessedItemAtom);

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
    <div className="my-4 flex gap-2 flex-row">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 flex-grow">
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(item: Pokemon) => item?.name}
            className="w-full py-1 pl-3 border-dashed border-current border-b-2"
            autoComplete="off"
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-black">
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item.name}
                    value={item}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600" : ""
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal capitalize"
                          }`}
                        >
                          {item.name} -- Gen {item.generation}, {item.types[0]}/
                          {item.types[1]}, {item.height / 10}m,{" "}
                          {item.weight / 10}kg
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <PlayIcon className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
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
        className="cursor-pointer flex-none py-2 px-3 uppercase border-2 outline bg-purple-300 hover:bg-purple-400"
      >
        Submit
      </button>
    </div>
  );
}
