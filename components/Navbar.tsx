import React from "react";
import ThemeSwitch from "./ThemeSwitch";
export default function Navbar() {
  return (
    <header className=" max-w-sm md:max-w-full flex justify-between items-center">
      <h1 className="text-4xl">Pokedle</h1>
      <div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
