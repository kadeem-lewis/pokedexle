import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="text-center">
      <p className=" text-2xl">{year} - pokedexle.com</p>
      <p className="text-xl">
        Nintendo does not endorse or sponsor this project.
      </p>
    </div>
  );
}
