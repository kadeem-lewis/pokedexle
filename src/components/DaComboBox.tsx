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

export default function DaComboBox() {
  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null;
    inputValue: string;
  }>({
    selectedKey: null,
    inputValue: "",
  });
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
    fieldState.inputValue === ""
      ? pokedex.slice(0, 6)
      : fuse
          .search(fieldState.inputValue)
          .map((res) => ({ ...res.item }))
          .slice(0, 6);

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
    }));
  };

  const onSelectionChange = (id: Key) => {
    setFieldState({
      inputValue: pokedex.find((p) => p.id === id)?.name ?? "",
      selectedKey: id,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fieldState.selectedKey && fieldState.inputValue) {
      if (guessedItems.some((item) => item.name === fieldState.inputValue)) {
        setError(true);
      } else {
        const pokemon = pokedex.find((p) => p.name === fieldState.inputValue);
        if (pokemon) {
          addNewGuess(pokemon);
          setError(false);
        }
      }
      setFieldState({ selectedKey: null, inputValue: "" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-4 flex flex-row gap-2">
        <ComboBox
          defaultItems={filteredItems}
          selectedKey={fieldState.selectedKey}
          inputValue={fieldState.inputValue}
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
