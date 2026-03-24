import React from "react";
import ModeSwitch from "../_components/ModeSwitch";
import Guesses from "../_components/Guesses";

type ModesLayoutProps = {
  children: React.ReactNode;
};

export default function ModesLayout({ children }: ModesLayoutProps) {
  return (
    <>
      <ModeSwitch />
      <Guesses />
      {children}
    </>
  );
}
