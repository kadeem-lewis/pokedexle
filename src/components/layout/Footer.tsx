import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-fg-accent-muted relative mt-1 w-full border-t-4 bg-purple-800 text-center after:absolute after:inset-0 after:-mt-2 after:border-t-4 after:border-t-border">
      <div className="mx-auto max-w-md px-4 py-1">
        <p className=" text-2xl">{year} - pokedexle.com</p>
        <p className="text-xl">
          Nintendo does not endorse or sponsor this project.
        </p>
      </div>
    </footer>
  );
}
