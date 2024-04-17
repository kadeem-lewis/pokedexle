import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="m-auto max-w-md px-4">
      <header className=" flex items-center justify-between ">
        <h1 className="text-4xl">
          <Link href="/" className="text-shadow text-5xl font-extrabold">
            POKéDEXLE
          </Link>
        </h1>
        <div>
          <ThemeSwitch />
        </div>
      </header>
    </div>
  );
}
