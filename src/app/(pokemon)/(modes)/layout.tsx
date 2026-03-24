import React from "react";
import ModeSwitch from "../_components/ModeSwitch";
import Guesses from "../_components/Guesses";
import GameWrapper from "../_components/GameWrapper";
import pokedex from "@/data/pokedex.json";

type ModesLayoutProps = {
  children: React.ReactNode;
};

export default function ModesLayout({ children }: ModesLayoutProps) {
  return (
    <>
      <ModeSwitch />
      <Guesses />
      <GameWrapper pokedex={pokedex}>{children}</GameWrapper>
    </>
  );
}
