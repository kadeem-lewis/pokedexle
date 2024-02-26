"use client";
import React, { useMemo, useState } from "react";
import { ComboBox, ComboBoxItem } from "./ui/Combobox";
import PokemonCard from "./ui/PokemonCard";
import Fuse from "fuse.js";
import {
  addGuessedItemAtom,
  Pokemon,
  pokedexAtom,
  currentGameMode,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import { Key } from "react-aria-components";
import { useSetAtom, useAtomValue } from "jotai";
import { Button } from "./ui/Button";

export default function DaComboBox() {
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const pokedex = useAtomValue(pokedexAtom);
  const mode = useAtomValue(currentGameMode);
  const guessedItems = useAtomValue(guessedItemsAtom)[mode];
  const addNewGuess = useSetAtom(addGuessedItemAtom);

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

  const onInputChange = (value: string) => {
    setQuery(value);
  };

  const onSelectionChange = (pokemon: Key) => {
    setSelected(pokedex.find((p) => p.name === pokemon) ?? null);
  };

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
      {selected}
      <form onSubmit={handleSubmit} className="my-4 flex flex-row gap-2">
        <ComboBox
          defaultItems={filteredItems}
          inputValue={selected?.name}
          onInputChange={onInputChange}
          onSelectionChange={onSelectionChange}
          aria-label="Search pokémon by name or type..."
        >
          {(item) => (
            <ComboBoxItem textValue={item.name}>
              <PokemonCard pokemon={item} />
            </ComboBoxItem>
          )}
        </ComboBox>
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
  );
}
