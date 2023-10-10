import { Pokemon } from "@/atoms/GameAtoms";
import Image from "next/image";

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
      return <div className="h-full bg-green-400 p-2 text-center">{type}</div>;
    }
    return <div className="h-full bg-red-400 p-2 text-center">{type}</div>;
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
          <div className="border-2 border-current bg-green-400 p-2">
            Gen {correctItem.generation}
          </div>
          {correctItem.types.map((type) => (
            <div
              key={type}
              className="border-2 border-current bg-green-400 p-2"
            >
              {type}
            </div>
          ))}
          <div className="border-2 border-current bg-green-400 p-2">
            {(correctItem.weight * poundConversion).toFixed(1)}lbs
          </div>
          <div className="border-2 border-current bg-green-400 p-2">
            {correctItem.height / 10}m
          </div>
        </>
      ) : (
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

          {guessedItem.generation === correctItem.generation ? (
            <div className="bg-green-400 p-2 border-2 border-current">
              Gen {correctItem.generation}
            </div>
          ) : (
            <div className="bg-red-400 p-2 border-2 border-current">
              <div
                className={
                  guessedItem.generation > correctItem.generation
                    ? "arrow-down"
                    : "arrow-up"
                }
              >
                Gen {correctItem.generation}
              </div>
            </div>
          )}
          {guessedItem.types.map((type) => (
            <div key={type} className="border-2 border-current">
              {checkTypes(type)}
            </div>
          ))}
          {guessedItem.weight === correctItem.weight ? (
            <div className="bg-green-400 p-2 border-2 border-current">
              {(correctItem.weight * poundConversion).toFixed(1)} lbs
            </div>
          ) : (
            <div className="bg-red-400 p-2 border-2 border-current">
              <div
                className={
                  guessedItem.weight > correctItem.weight
                    ? "arrow-down"
                    : "arrow-up"
                }
              >
                {(correctItem.weight * poundConversion).toFixed(1)} lbs
              </div>
            </div>
          )}
          {guessedItem.height === correctItem.height ? (
            <div className="bg-green-400 p-2 border-2 border-current">
              {correctItem.height}
            </div>
          ) : (
            <div className="bg-red-400 p-2 border-2 border-current">
              <div
                className={
                  guessedItem.height > correctItem.height
                    ? "arrow-down"
                    : "arrow-up"
                }
              >
                {correctItem.height / 10}m
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
