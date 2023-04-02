import React from "react";
import ThemeSwitch from "../buttons/ThemeSwitch";
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  return (
    <header className=" max-w-sm md:max-w-full flex justify-between items-center">
      <h1 className="text-4xl">
        <Link href="/">
          <Image src="./logo.svg" alt="logo image" width={150} height={150} />
        </Link>
      </h1>
      <div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
