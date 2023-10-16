import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import MyComboBox from "../ui/MyComboBox";
import { Button } from "../ui/Button";
import { useAtom } from "jotai";
import { currentGameMode } from "@/atoms/GameAtoms";
import PokemonTypes from "../core/PokemonTypes";

export default function Gamebox() {
  const [mode, setMode] = useAtom(currentGameMode);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          if (index === 0) {
            setMode("whosthatpokemon");
          } else {
            setMode("whosthatpokemonUnlimited");
          }
        }}
      >
        <Tab.List className="mt-2 flex justify-center gap-2">
          <Tab
            className="bg-yellow-500 ui-selected:brightness-110 ui-not-selected:brightness-75"
            as={Button}
            variant="flat"
            size="tall"
          >
            Daily
          </Tab>
          <Tab
            className="bg-yellow-500 ui-selected:brightness-110 ui-not-selected:brightness-75"
            as={Button}
            variant="flat"
            size="tall"
          >
            Unlimited
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel></Tab.Panel>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <PokemonTypes />
      <MyComboBox />
    </>
  );
}
