import React, { useState, Fragment, useRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { atom, useAtom } from "jotai";
interface Item {
  name: string;
  url: string;
}
export const guessedAnswerAtom = atom<Item>({ name: "", url: "" });
export default function MyComboBox({ data }: { data: Array<Item> }) {
  const [selected, setSelected] = useState<Item | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [guessedAnswer, setGuessedAnswer] = useAtom(guessedAnswerAtom);
  const selectedItemRef = useRef<HTMLInputElement>(null);

  const filteredItems =
    query === ""
      ? data
      : data.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });
  const handleSubmit = () => {
    if (selected !== undefined) {
      setGuessedAnswer(selected);
    }
  };
  return (
    <div className="my-4 flex flex-row">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(item: Item) => item.name}
            className=" py-2 pl-3 pr-10 leading-5 focus:ring-0 border-current border-2"
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
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
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
        className=" text-2xl rounded-md cursor-pointer transition hover:border-gray-300 hover:bg-gray-100 py-2 px-3"
      >
        Submit
      </button>
    </div>
  );
}
