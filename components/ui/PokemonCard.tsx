import Image from "next/image";
import { TYPES, PokemonType } from "../core/PokemonTypes";
import { TypeBadge } from "./TypeBadge";
import { Pokemon } from "@/atoms/GameAtoms";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="block truncate h-24">
      {/*TODO:Change to a non pixelated font to improve readability */}
      <div className="flex items-center justify-center h-full gap-4">
        <Image
          src={pokemon.sprite}
          width={80}
          height={80}
          alt={`${pokemon.name} sprite`}
        />
        <div className="grid grid-cols-2 text-xl">
          <div className="text-xl font-bold">{pokemon.name}</div>
          <div className="font-semibold">Gen {pokemon.generation}</div>
          <div className="col-span-2 space-x-2 flex">
            {pokemon.types.map((type) => {
              const typeObj = TYPES.find((element) => element === type);
              return typeObj ? (
                <TypeBadge
                  key={type}
                  type={type as PokemonType}
                  className="px-1 py-0.5 text-sm col-span-1"
                >
                  {type}
                </TypeBadge>
              ) : null;
            })}
          </div>
          <div className="space-x-4">
            <span className="space-x-1">
              <span className="font-semibold">Height:</span>
              <span>{pokemon.height / 10}m</span>
            </span>
            <span className="space-x-1">
              <span className="font-semibold">Weight:</span>
              <span>{pokemon.weight / 10}kg</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
