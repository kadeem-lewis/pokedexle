import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b-primary-accent bg-panel-accent-active relative mb-1 w-full border-b-4 after:pointer-events-none after:absolute after:inset-0 after:-mb-2 after:border-b-4 after:border-b-border">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-1">
        <h1 className="text-4xl">
          <Link href="/" className="text-shadow text-5xl font-extrabold">
            POKéDEXLE
          </Link>
        </h1>
        <ThemeSwitch />
      </div>
    </header>
  );
}
