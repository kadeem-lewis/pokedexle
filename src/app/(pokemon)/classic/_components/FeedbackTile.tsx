"use client";
import { Pokemon } from "@/atoms/GameAtoms";
import Image from "next/image";
import { Tile } from "@/components/ui/Tile";
import {
  decimeterToImperial,
  hectogramToImperial,
} from "@/helpers/Conversions";
import { Button, TooltipTrigger } from "react-aria-components";
import Tooltip from "@/components/ui/Tooltip";

type FeedbackTileProps = {
  guessedItem: Pokemon;
  correctItem: Pokemon;
};
export default function FeedbackTile({
  guessedItem,
  correctItem,
}: FeedbackTileProps) {
  //TODO: find a way to have the pokemon images scale to the size of the container so smaller characters arent barely visible
  //TODO: increase the size of the grid and have each box have a defined size and have them be in a vertical scrollable container

  function checkTypes(type: string): JSX.Element {
    if (correctItem.types.includes(type)) {
      return (
        <Tile status="correct" key={type}>
          {type}
        </Tile>
      );
    }
    return (
      <Tile status="incorrect" key={type}>
        {type}
      </Tile>
    );
  }

  return (
    <>
      {guessedItem.name === correctItem.name ? (
        <>
          <TooltipTrigger>
            <Button>
              <Tile status="correct">
                <Image
                  src={guessedItem.sprite}
                  alt={`${guessedItem.name} sprite`}
                  priority={true}
                  width={100}
                  height={100}
                />
              </Tile>
            </Button>
            <Tooltip>{guessedItem.name}</Tooltip>
          </TooltipTrigger>
          <Tile status="correct">Gen {correctItem.generation}</Tile>
          {correctItem.types.map((type) => (
            <Tile key={type} status="correct">
              {type}
            </Tile>
          ))}
          <Tile status="correct">
            {decimeterToImperial(guessedItem.height)}
          </Tile>
          <Tile status="correct">
            {hectogramToImperial(correctItem.weight)}
          </Tile>
        </>
      ) : (
        <>
          <TooltipTrigger delay={0}>
            <Tile>
              <Image
                src={guessedItem.sprite}
                alt={`${guessedItem.name} sprite`}
                priority={true}
                width={100}
                height={100}
              />
            </Tile>
            <Tooltip>{guessedItem.name}</Tooltip>
          </TooltipTrigger>

          {guessedItem.generation === correctItem.generation ? (
            <Tile status="correct">Gen {correctItem.generation}</Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.generation > correctItem.generation
                  ? "lower"
                  : "higher"
              }
            >
              Gen {guessedItem.generation}
            </Tile>
          )}
          {guessedItem.types.map((type) => checkTypes(type))}
          {guessedItem.height === correctItem.height ? (
            <Tile status="correct">
              {decimeterToImperial(correctItem.height)}
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.height > correctItem.height ? "lower" : "higher"
              }
            >
              {decimeterToImperial(guessedItem.height)}
            </Tile>
          )}
          {guessedItem.weight === correctItem.weight ? (
            <Tile status="correct">
              {hectogramToImperial(correctItem.weight)}
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.weight > correctItem.weight ? "lower" : "higher"
              }
            >
              {hectogramToImperial(guessedItem.weight)}
            </Tile>
          )}
        </>
      )}
    </>
  );
}
