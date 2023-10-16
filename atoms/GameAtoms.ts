import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { startOfDay, subMinutes } from "date-fns";
import { Daily } from "@prisma/client";
import { defaultGuesses } from "@/constants";

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  generation: number;
  sprite: string;
}
export interface Move {
  id: number;
  generation: number;
  name: string;
  power?: number;
  pp: number;
  type: string;
  class: string;
  accuracy?: number;
}

interface DailyStorage {
  date: Date;
  answers: Pokemon[];
}

interface GuessedItems {
  classic: Pokemon[];
  classicUnlimited: Pokemon[];
}

//gets the array of pokemon from prisma
export const pokedexAtom = atom<Pokemon[]>([]);
pokedexAtom.debugLabel = "pokedexAtom";

//the number of guesses a user has
export const guessAtom = atom({
  classic: defaultGuesses,
  classicUnlimited: defaultGuesses,
});
guessAtom.debugLabel = "guessAtom";

//!find a way to set the inital value to localStorageItem if available. Also maybe track the classic answers and solution in the same atom to prevent desync
//atom that stores the pokemon that have been guessed
export const guessedItemsAtom = atom<GuessedItems>({
  classic: [],
  classicUnlimited: [],
});
guessedItemsAtom.debugLabel = "guessedItemsAtom";

//atom that gets the current Date and can be used to get dates of other days
export const dateAtom = atom(new Date());
dateAtom.debugLabel = "dateAtom";

//function to fetch Daily entry from database
export const dailyAtom = atom(async (get) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/dailies?date=${get(
      dateAtom,
    ).toISOString()}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not OK");
  }
  const data: Daily = await response.json();
  return data;
});
dailyAtom.debugLabel = "dailyAtom";

export const classicPracticeSolutionAtom = atomWithStorage<Pokemon | null>(
  "classic_practice_solution",
  null,
);
classicPracticeSolutionAtom.debugLabel = "classicPracticeSolutionAtom";

//Initializes the pokemon to guess Object
export const pokemonToGuessAtom = atom((get) => {
  return {
    classic: get(dailyPokemonAtom),
    classicUnlimited: get(classicPracticeSolutionAtom)
      ? get(classicPracticeSolutionAtom)
      : get(pokedexAtom)[Math.floor(Math.random() * get(pokedexAtom).length)],
  };
});
pokemonToGuessAtom.debugLabel = "pokemonToGuessAtom";

//controls the daily classic Pokemon
export const dailyPokemonAtom = atom<Pokemon | null>(null);
dailyPokemonAtom.debugLabel = "dailyPokemonAtom";

export const classicAnswersAtom = atomWithStorage<DailyStorage>(
  "classic_answers",
  {
    date: subMinutes(
      startOfDay(new Date()),
      startOfDay(new Date()).getTimezoneOffset(),
    ),
    answers: [],
  },
);
classicAnswersAtom.debugLabel = "classicAnswersAtom";

export const classicPracticeAnswersAtom = atomWithStorage<Pokemon[]>(
  "classic_practice_answers",
  [],
);
classicPracticeAnswersAtom.debugLabel = "classicPracticeAnswersAtom";

//atom that is responsible for saying if the game is over or not
export const gameOverAtom = atom({
  classic: false,
  classicUnlimited: false,
});
gameOverAtom.debugLabel = "gameOverAtom";

//?maybe use enum for types or some other typescript feature
export const currentGameMode = atom<"classic" | "classicUnlimited">("classic");
currentGameMode.debugLabel = "currentGameMode";

//derived writable atom that is attempting to reset all values back to their defaults
export const newGameAtom = atom(null, (get, set) => {
  const mode = get(currentGameMode);

  if (mode === "classicUnlimited") {
    // Update game over status for the "classicUnlimited" mode.
    set(gameOverAtom, (prev) => ({ ...prev, classicUnlimited: false }));

    // Create a new Pokemon to guess.
    const newPokemonToGuess =
      get(pokedexAtom)[Math.floor(Math.random() * get(pokedexAtom).length)];

    //resetting values
    set(guessedItemsAtom, (prev) => ({ ...prev, classicUnlimited: [] }));
    set(guessAtom, (prev) => ({ ...prev, classicUnlimited: defaultGuesses }));
    set(classicPracticeSolutionAtom, newPokemonToGuess);
    set(classicPracticeAnswersAtom, []);
  }
});
newGameAtom.debugLabel = "newGameAtom";

//derived writable atom that adds the value passed into the guessed item array
export const addGuessedItemAtom = atom(null, (get, set, newItem: Pokemon) => {
  const mode = get(currentGameMode);

  set(guessedItemsAtom, (prev) => ({
    ...prev,
    [mode]: [...prev[mode], newItem],
  }));
  if (mode === "classic") {
    set(classicAnswersAtom, (prev) => ({
      date: prev.date,
      answers: [...prev.answers, newItem],
    }));
  } else if (mode === "classicUnlimited") {
    set(classicPracticeAnswersAtom, (prev) => [...prev, newItem]);
  }
  if (!(newItem.name === get(pokemonToGuessAtom)[mode]?.name)) {
    set(guessAtom, (prev) => ({
      ...prev,
      [mode]: prev[mode] - 1,
    }));
  } else {
    set(gameOverAtom, (prev) => ({
      ...prev,
      [mode]: true,
    }));
    if (mode === "classic") {
      set(classicWinsAtom, (prev) => prev++);
    }
    if (mode === "classicUnlimited") set(classicPracticeAnswersAtom, []);
  }
});
addGuessedItemAtom.debugLabel = "addGuessedItemAtom";

export const whosThatPokemonAnswersAtom = atomWithStorage<string[]>(
  "wtp_answers",
  [],
);
export const whosThatPokemonPracticeAtom = atomWithStorage<string[]>(
  "wtp_practice_answers",
  [],
);
export const classicWinsAtom = atomWithStorage("classic_win_count", 0);
