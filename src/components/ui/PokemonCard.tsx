import Image from "next/image";
import { TYPES, PokemonType } from "@/app/(pokemon)/_components/PokemonTypes";
import { TypeBadge } from "./TypeBadge";
import { Pokemon } from "@/atoms/GameAtoms";
import {
  decimeterToImperial,
  hectogramToImperial,
} from "@/helpers/Conversions";

type PokemonCard = {
  pokemon: Pokemon;
};

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="block h-24 truncate">
      {/*TODO:Change to a non pixelated font to improve readability or remove the text-border if it has any */}
      <div className="flex h-full items-center justify-center gap-4">
        <Image
          src={pokemon.sprite}
          width={80}
          height={80}
          priority={true}
          alt={`${pokemon.name} sprite`}
        />
        <div className="grid grid-cols-2 text-xl">
          <div className="text-xl font-bold">{pokemon.name}</div>
          <div className="font-semibold">Gen {pokemon.generation}</div>
          <div className="col-span-2 flex space-x-2">
            {pokemon.types.map((type) => {
              const typeObj = TYPES.find((element) => element === type);
              return typeObj ? (
                <TypeBadge
                  key={type}
                  type={type as PokemonType}
                  className="col-span-1 px-1 py-0.5 text-sm"
                >
                  {type}
                </TypeBadge>
              ) : null;
            })}
          </div>
          <div className="space-x-4">
            <span className="space-x-1">
              <span className="font-semibold">HT:</span>
              <span>{decimeterToImperial(pokemon.height)}</span>
            </span>
            <span className="space-x-1">
              <span className="font-semibold">WT:</span>
              <span className="lowercase">
                {hectogramToImperial(pokemon.weight)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
