import React from "react";
import ThemeSwitch from "../buttons/ThemeSwitch";
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  return (
    <header className=" flex max-w-md items-center justify-between md:max-w-full">
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
