"use client";
import { useMemo, useState } from "react";
import { ComboBox, ComboBoxItem } from "./ui/Combobox";
import PokemonCard from "./ui/PokemonCard";
import Fuse from "fuse.js";
import {
  addGuessedItemAtom,
  pokedexAtom,
  currentGameMode,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import { Key } from "react-aria-components";
import { useSetAtom, useAtomValue } from "jotai";
import { Button } from "./ui/Button";

export default function PokemonSearch() {
  const [selected, setSelected] = useState<Key | null>(null);
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
    if (value === "") {
      setSelected(null);
    }
  };

  const onSelectionChange = (id: Key) => {
    setSelected(id);
    setQuery(pokedex.find((p) => p.id === id)?.name ?? "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected && query) {
      if (guessedItems.some((item) => item.name === query)) {
        setError(true);
      } else {
        const pokemon = pokedex.find((p) => p.name === query);
        if (pokemon) {
          addNewGuess(pokemon);
          setError(false);
        }
      }
      setSelected(null);
      setQuery("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-4 flex flex-row gap-2">
        <ComboBox
          items={filteredItems}
          selectedKey={selected}
          inputValue={query}
          onInputChange={onInputChange}
          onSelectionChange={onSelectionChange}
          aria-label="Search pokémon by name or type..."
          className="flex w-full flex-col gap-2"
        >
          {(item) => (
            <ComboBoxItem
              textValue={item.name}
              className="relative cursor-default select-none border-b border-foreground capitalize"
            >
              <PokemonCard pokemon={item} />
            </ComboBoxItem>
          )}
        </ComboBox>
        <Button
          type="submit"
          variant="flat"
          className="flex-none cursor-pointer bg-purple-300 hover:bg-purple-400"
        >
          Submit
        </Button>
      </form>
      {error && <p>Pokemon Already Entered</p>}
    </>
  );
}
