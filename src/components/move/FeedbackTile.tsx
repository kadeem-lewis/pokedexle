import { Move } from "@/app/atoms/GameAtoms";
import { Tile, TileContent } from "../ui/Tile";
import Image from "next/image";

type FeedbackTileProps = {
  guessedItem: Move;
  correctItem: Move;
};
export default function FeedbackTile({
  guessedItem,
  correctItem,
}: FeedbackTileProps) {
  //TODO: find a way to have the pokemon images scale to the size of the container so smaller characters arent barely visible
  //TODO: increase the size of the grid and have each box have a defined size and have them be in a vertical scrollable container

  return (
    <div className="flex gap-x-1">
      {guessedItem.name === correctItem.name ? (
        <>
          <Tile status="correct">
            <TileContent className="capitalize">{guessedItem.name}</TileContent>
          </Tile>
          <Tile status="correct">
            <TileContent>Gen {correctItem.generation}</TileContent>
          </Tile>
          <Tile status="correct">
            <TileContent>{correctItem.class}</TileContent>
          </Tile>
          <Tile status="correct">
            <TileContent>{correctItem.type}</TileContent>
          </Tile>

          <Tile status="correct">
            <TileContent>{correctItem.power}</TileContent>
          </Tile>
          <Tile status="correct">
            <TileContent>{correctItem.pp}</TileContent>
          </Tile>
          <Tile status="correct">
            <TileContent>{correctItem.accuracy}</TileContent>
          </Tile>
        </>
      ) : (
        <>
          <Tile status="incorrect">
            <TileContent className="capitalize">{guessedItem.name}</TileContent>
          </Tile>
          {guessedItem.generation === correctItem.generation ? (
            <Tile status="correct">
              <TileContent>Gen {correctItem.generation}</TileContent>
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.generation > correctItem.generation
                  ? "lower"
                  : "higher"
              }
            >
              <TileContent>Gen {guessedItem.generation}</TileContent>
            </Tile>
          )}

          <Tile
            status={
              guessedItem.class === correctItem.class ? "correct" : "incorrect"
            }
          >
            <TileContent>
              <Image
                src={`/images/${guessedItem.class}-icon.png`}
                width={100}
                height={100}
                priority={true}
                alt={`${guessedItem.class} icon`}
              />
            </TileContent>
          </Tile>
          <Tile
            status={
              guessedItem.type === correctItem.type ? "correct" : "incorrect"
            }
          >
            <TileContent>{guessedItem.type}</TileContent>
          </Tile>
          {guessedItem.power === correctItem.power ? (
            <Tile status="correct">
              <TileContent>{correctItem.power}</TileContent>
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.power &&
                correctItem.power &&
                guessedItem.power > correctItem.power
                  ? "lower"
                  : "higher"
              }
            >
              <TileContent>{guessedItem.power}</TileContent>
            </Tile>
          )}
          {guessedItem.pp === correctItem.pp ? (
            <Tile status="correct">
              <TileContent>{correctItem.pp}</TileContent>
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={guessedItem.pp > correctItem.pp ? "lower" : "higher"}
            >
              <TileContent>{guessedItem.pp}</TileContent>
            </Tile>
          )}
          {guessedItem.accuracy === correctItem.accuracy ? (
            <Tile status="correct">
              <TileContent>
                {correctItem.accuracy ? correctItem.accuracy : "N/A"}
              </TileContent>
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.accuracy &&
                correctItem.accuracy &&
                guessedItem.accuracy > correctItem.accuracy
                  ? "lower"
                  : "higher"
              }
            >
              <TileContent>{guessedItem.accuracy}</TileContent>
            </Tile>
          )}
        </>
      )}
    </div>
  );
}
