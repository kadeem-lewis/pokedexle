"use client";
import { useMemo, useState } from "react";
import { ComboBox, ComboBoxItem } from "@/components/ui/Combobox";
import PokemonCard from "@/components/ui/PokemonCard";
import Fuse from "fuse.js";
import {
  addGuessedItemAtom,
  pokedexAtom,
  currentGameMode,
  guessedItemsAtom,
} from "@/atoms/GameAtoms";
import { Key } from "react-aria-components";
import { useSetAtom, useAtomValue } from "jotai";
import { Button } from "@/components/ui/Button";

export default function PokemonSearch() {
  const [selected, setSelected] = useState<Key | null>(null);
  const [query, setQuery] = useState("");
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
      const pokemon = pokedex.find((p) => p.name === query);
      if (pokemon) {
        addNewGuess(pokemon);
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
          disabledKeys={guessedItems.map((item) => item.id)}
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
          className="bg-primary-accent hover:bg-primary-accent-hover flex-none cursor-pointer"
        >
          Submit
        </Button>
      </form>
    </>
  );
}
