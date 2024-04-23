"use client";
import React from "react";
import { defaultGuesses } from "@/constants";
import { Tile } from "../ui/Tile";
import { useAtomValue } from "jotai";
import { pokedexAtom } from "@/atoms/GameAtoms";
import Image from "next/image";
import { HEADINGS } from "@/app/(pokemon)/classic/_components/PokemonFeedback";
import {
  decimeterToImperial,
  hectogramToImperial,
} from "@/helpers/Conversions";

export default function HowToPlayContent() {
  const pokedex = useAtomValue(pokedexAtom);
  return (
    <div className=" space-y-2 text-2xl">
      <p>Guess the pokemon in {defaultGuesses} tries</p>
      <hr />
      <p>
        Simply type in the name of a pokemon and it will reveal its properties
      </p>
      <hr />
      <p>
        The color of the tiles will change to show how close your guess was to
        the pokemon to find.
      </p>
      <p>
        <span className="text-green-500">Green</span> indicates the property is
        an exact match.
      </p>
      <p>
        <span className="text-red-700">Red</span> indicates there is no overlap
        between your guess and the property
      </p>
      <p>
        <span className="text-red-700">⬆️⬇️</span> With arrows, it also
        indicates if the answer property is above or below your guess.
      </p>
      <hr />
      <p>Example</p>
      <section className="grid grid-cols-6 gap-1">
        {HEADINGS.map((heading) => (
          <div
            key={heading}
            className="basis-1/6 text-center font-medium uppercase"
          >
            {heading}
          </div>
        ))}
        <Tile>
          <Image
            src={pokedex[0].sprite}
            alt={`${pokedex[0].name} sprite`}
            priority={true}
            width={100}
            height={100}
          />
        </Tile>
        <Tile status="correct">Gen {pokedex[0].generation}</Tile>
        <Tile status="incorrect">{pokedex[0].types[0]}</Tile>
        <Tile status="incorrect">{pokedex[0].types[1]}</Tile>
        <Tile status="incorrect" difference="lower">
          {decimeterToImperial(pokedex[0].height)}
        </Tile>
        <Tile status="incorrect" difference="lower">
          {hectogramToImperial(pokedex[0].weight)}
        </Tile>
        <Tile status="correct">
          <Image
            src={pokedex[51].sprite}
            alt={`${pokedex[51].name} sprite`}
            priority={true}
            width={100}
            height={100}
          />
        </Tile>
        <Tile status="correct">Gen {pokedex[51].generation}</Tile>
        <Tile status="correct">{pokedex[51].types[0]}</Tile>
        <Tile status="correct">{pokedex[51].types[1]}</Tile>
        <Tile status="correct">{decimeterToImperial(pokedex[51].height)}</Tile>
        <Tile status="correct">{hectogramToImperial(pokedex[51].weight)}</Tile>
      </section>
    </div>
  );
}
