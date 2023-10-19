import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import Link from "next/link";

export default function Navbar() {
  return (
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
  );
}
