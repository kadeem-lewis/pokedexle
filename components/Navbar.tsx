import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
export default function Navbar() {
  return (
    <header className=" max-w-sm md:max-w-full flex justify-between items-center">
      <h1 className="text-4xl">
        <Link href="/" className=" font-pokemon-solid">
          Pokedle
        </Link>
      </h1>
      <div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
