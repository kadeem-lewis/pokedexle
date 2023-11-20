"use client";
import React from "react";
import { defaultGuesses } from "@/constants";
import { Tile, TileContent } from "../ui/Tile";
import { useAtomValue } from "jotai";
import { pokedexAtom } from "@/atoms/GameAtoms";
import Image from "next/image";
import { HEADINGS } from "../classic/PokemonFeedback";
import { decimeterToImperial, hectogramToImperial } from "@/helpers/Conversions";

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
      <p><span className="text-green-500">Green</span> indicates the property is an exact match.</p>
      <p><span className="text-red-700">Red</span> indicates there is no overlap between your guess and the property</p>
      <p><span className="text-red-700">⬆️⬇️</span> With arrows, it also indicates if the answer property is above or below your guess.</p>
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
          <TileContent>
            <Image src={pokedex[0].sprite} alt={`${pokedex[0].name} sprite`}
            priority={true}
                width={100}
                height={100}/>
          </TileContent>
        </Tile>
        <Tile status="correct">
          <TileContent>
            Gen {pokedex[0].generation}
          </TileContent>
        </Tile>
        <Tile status="incorrect">
          <TileContent>
            {pokedex[0].types[0]}
          </TileContent>
        </Tile>
        <Tile status="incorrect">
          <TileContent>
            {pokedex[0].types[1]}
          </TileContent>
        </Tile>
        <Tile status="incorrect" difference="lower">
          <TileContent>
            {decimeterToImperial(pokedex[0].height)}
          </TileContent>
        </Tile>
        <Tile status="incorrect" difference="lower">
          <TileContent>
            {hectogramToImperial(pokedex[0].weight)}
          </TileContent>
        </Tile>
        <Tile status="correct">
          <TileContent>
            <Image src={pokedex[51].sprite} alt={`${pokedex[51].name} sprite`}
            priority={true}
                width={100}
                height={100}/>
          </TileContent>
        </Tile>
        <Tile status="correct">
          <TileContent>
            Gen {pokedex[51].generation}
          </TileContent>
        </Tile>
        <Tile status="correct">
          <TileContent>
            {pokedex[51].types[0]}
          </TileContent>
        </Tile>
        <Tile status="correct">
          <TileContent>
            {pokedex[51].types[1]}
          </TileContent>
        </Tile>
        <Tile status="correct">
          <TileContent>
            {decimeterToImperial(pokedex[51].height)}
          </TileContent>
        </Tile>
        <Tile status="correct">
          <TileContent>
            {hectogramToImperial(pokedex[51].weight)}
          </TileContent>
        </Tile>
      </section>
    </div>
  );
}
