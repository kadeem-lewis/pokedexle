import { Pokemon } from "@/atoms/GameAtoms";
import Image from "next/image";
import { Tile, TileContent } from "../ui/Tile";

interface Props {
  guessedItem: Pokemon;
  correctItem: Pokemon;
}
export default function FeedbackTile({ guessedItem, correctItem }: Props) {
  //TODO: arrows dont probably show text within
  //TODO: find a way to have the pokemon images scale to the size of the container so smaller characters arent barely visible
  //TODO: increase the size of the grid and have each box have a defined size and have them be in a vertical scrollable container

  const poundConversion = 0.0022046;
  function checkTypes(type: string): JSX.Element {
    if (correctItem.types.includes(type)) {
      return (
        <Tile status="correct">
          <TileContent>{type}</TileContent>
        </Tile>
      );
    }
    return (
      <Tile status="incorrect">
        <TileContent>{type}</TileContent>
      </Tile>
    );
  }

  return (
    <>
      {guessedItem.name === correctItem.name ? (
        <>
          <div className="border-2 border-current mx-auto">
            <Image
              src={guessedItem.sprite}
              alt={`${guessedItem.name} sprite`}
              priority={true}
              width={100}
              height={100}
            />
          </div>
          <Tile status="correct">
            <TileContent>Gen {correctItem.generation}</TileContent>
          </Tile>
          {correctItem.types.map((type) => (
            <Tile key={type} status="correct">
              <TileContent>{type}</TileContent>
            </Tile>
          ))}
          <Tile status="correct">
            <TileContent>
              {(correctItem.weight * poundConversion).toFixed(1)}lbs
            </TileContent>
          </Tile>
          <Tile status="correct">
            <TileContent>{correctItem.height / 10}m</TileContent>
          </Tile>
        </>
      ) : (
        <>
          <Tile>
            <TileContent>
              <Image
                src={guessedItem.sprite}
                alt={`${guessedItem.name} sprite`}
                priority={true}
                width={100}
                height={100}
              />
            </TileContent>
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
          {guessedItem.types.map((type) => checkTypes(type))}
          {guessedItem.weight === correctItem.weight ? (
            <Tile status="correct">
              <TileContent>
                {(correctItem.weight * poundConversion).toFixed(1)} lbs
              </TileContent>
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.weight > correctItem.weight ? "lower" : "higher"
              }
            >
              <TileContent>
                {(guessedItem.weight * poundConversion).toFixed(1)} lbs
              </TileContent>
            </Tile>
          )}
          {guessedItem.height === correctItem.height ? (
            <div className="bg-green-400 p-2 border-2 border-current">
              {correctItem.height}
            </div>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.height > correctItem.height ? "lower" : "higher"
              }
            >
              <TileContent>{guessedItem.height / 10}m</TileContent>
            </Tile>
          )}
        </>
      )}
    </>
  );
}
