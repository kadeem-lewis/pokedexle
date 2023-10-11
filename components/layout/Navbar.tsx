import React from "react";
import ThemeSwitch from "../buttons/ThemeSwitch";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className=" flex items-center justify-between ">
      <h1 className="text-4xl">
        <Link href="/" className="text-5xl font-extrabold text-shadow">
          POKéDEXLE
        </Link>
      </h1>
      <div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
