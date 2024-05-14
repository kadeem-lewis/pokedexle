import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomWithQuery } from "jotai-tanstack-query";
import { Daily } from "@prisma/client";
import { defaultGuesses } from "@/constants";
import { getLocalTimeZone, today } from "@internationalized/date";

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  generation: number;
  sprite: string;
};

type DailyStorage = {
  date: string;
  answers: Pokemon[];
  stats: {
    plays: number;
    wins: number;
    guesses: [number, number, number, number, number, number];
    streak: number;
    maxStreak: number;
  };
};

type GuessedItems = {
  classic: Pokemon[];
  classicUnlimited: Pokemon[];
  whosthatpokemon: Pokemon[];
  whosthatpokemonUnlimited: Pokemon[];
};

type DailyAnswers = {
  classic: Pokemon | null;
  whosthatpokemon: Pokemon | null;
};

export type GameMode =
  | "classic"
  | "classicUnlimited"
  | "whosthatpokemon"
  | "whosthatpokemonUnlimited";

//gets the array of pokemon from prisma
export const pokedexAtom = atom<Pokemon[]>([]);
pokedexAtom.debugLabel = "pokedexAtom";

//the number of guesses a user has
export const guessAtom = atom({
  classic: defaultGuesses,
  classicUnlimited: defaultGuesses,
  whosthatpokemon: defaultGuesses,
  whosthatpokemonUnlimited: defaultGuesses,
});
guessAtom.debugLabel = "guessAtom";

//!find a way to set the inital value to localStorageItem if available. Also maybe track the classic answers and solution in the same atom to prevent desync
//atom that stores the pokemon that have been guessed
export const guessedItemsAtom = atom<GuessedItems>({
  classic: [],
  classicUnlimited: [],
  whosthatpokemon: [],
  whosthatpokemonUnlimited: [],
});
guessedItemsAtom.debugLabel = "guessedItemsAtom";

//atom that gets the current Date and can be used to get dates of other days
export const dateAtom = atom(today(getLocalTimeZone()).toString());
dateAtom.debugLabel = "dateAtom";

//function to fetch Daily entry from database
export const dailyDataAtom = atomWithQuery((get) => ({
  queryKey: ["daily", get(dateAtom)],
  queryFn: async ({ queryKey: [, date] }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/dailies?date=${date}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data: Daily = await response.json();
    return data;
  },
}));
dailyDataAtom.debugLabel = "dailyDataAtom";

export const firstDateAtom = atomWithQuery(() => ({
  queryKey: ["firstDate"],
  queryFn: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/first-date`,
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data: Daily = await response.json();
    return data.date;
  },
}));

export const classicPracticeSolutionAtom = atomWithStorage<Pokemon | null>(
  "classic_practice_solution",
  null,
);
classicPracticeSolutionAtom.debugLabel = "classicPracticeSolutionAtom";

export const whosthatpokemonPracticeSolutionAtom =
  atomWithStorage<Pokemon | null>("whosthatpokemon_solution", null);

export const pokemonToGuessAtom = atom<{
  classic: Pokemon | null;
  classicUnlimited: Pokemon | null;
  whosthatpokemon: Pokemon | null;
  whosthatpokemonUnlimited: Pokemon | null;
}>({
  classic: null,
  classicUnlimited: null,
  whosthatpokemon: null,
  whosthatpokemonUnlimited: null,
});

//controls the daily classic Pokemon
export const dailyPokemonAtom = atom<DailyAnswers>({
  classic: null,
  whosthatpokemon: null,
});
dailyPokemonAtom.debugLabel = "dailyPokemonAtom";

export const classicAnswersAtom = atomWithStorage<DailyStorage>(
  "classic_answers",
  {
    date: today(getLocalTimeZone()).toString(),
    answers: [],
    stats: {
      plays: 0,
      wins: 0,
      guesses: [0, 0, 0, 0, 0, 0],
      streak: 0,
      maxStreak: 0,
    },
  },
);
classicAnswersAtom.debugLabel = "classicAnswersAtom";

export const whosthatpokemonAnswersAtom = atomWithStorage<DailyStorage>(
  "whosthatpokemon_answers",
  {
    date: today(getLocalTimeZone()).toString(),
    answers: [],
    stats: {
      plays: 0,
      wins: 0,
      guesses: [0, 0, 0, 0, 0, 0],
      streak: 0,
      maxStreak: 0,
    },
  },
);
whosthatpokemonAnswersAtom.debugLabel = "whosthatpokemonAnswersAtom";

export const classicPracticeAnswersAtom = atomWithStorage<Pokemon[]>(
  "classic_practice_answers",
  [],
);
classicPracticeAnswersAtom.debugLabel = "classicPracticeAnswersAtom";

export const whosthatpokemonPracticeAnswersAtom = atomWithStorage<Pokemon[]>(
  "whosthatpokemon_practice_answers",
  [],
);

//atom that is responsible for saying if the game is over or not
export const gameOverAtom = atom({
  classic: false,
  classicUnlimited: false,
  whosthatpokemon: false,
  whosthatpokemonUnlimited: false,
});
gameOverAtom.debugLabel = "gameOverAtom";

//?maybe use enum for types or some other typescript feature
//! the mode that is the default is unable to save localStorage stats on reset
export const currentGameMode = atom<GameMode>("classicUnlimited");
currentGameMode.debugLabel = "currentGameMode";

//derived writable atom that is attempting to reset all values back to their defaults
export const newGameAtom = atom(null, (get, set) => {
  const mode = get(currentGameMode);

  if (mode === "classicUnlimited") {
    // Create a new Pokemon to guess.
    const newPokemonToGuess =
      get(pokedexAtom)[Math.floor(Math.random() * get(pokedexAtom).length)];

    //resetting values
    set(guessedItemsAtom, (prev) => ({ ...prev, classicUnlimited: [] }));
    set(guessAtom, (prev) => ({ ...prev, classicUnlimited: defaultGuesses }));
    set(classicPracticeSolutionAtom, newPokemonToGuess);
    set(classicPracticeAnswersAtom, []);
  }
  if (mode === "whosthatpokemonUnlimited") {
    // Create a new Pokemon to guess.
    const newPokemonToGuess =
      get(pokedexAtom)[Math.floor(Math.random() * get(pokedexAtom).length)];

    //resetting values
    set(guessedItemsAtom, (prev) => ({
      ...prev,
      whosthatpokemonUnlimited: [],
    }));
    set(guessAtom, (prev) => ({
      ...prev,
      whosthatpokemonUnlimited: defaultGuesses,
    }));
    set(whosthatpokemonPracticeSolutionAtom, newPokemonToGuess);
    set(whosthatpokemonPracticeAnswersAtom, []);
  }
});
newGameAtom.debugLabel = "newGameAtom";

//derived writable atom that adds the value passed into the guessed item array
//! This atom has too many responsibilities. It should be broken up into smaller atoms
export const addGuessedItemAtom = atom(null, (get, set, newItem: Pokemon) => {
  const mode = get(currentGameMode);

  set(guessedItemsAtom, (prev) => ({
    ...prev,
    [mode]: [...prev[mode], newItem],
  }));
  if (mode === "classic") {
    set(classicAnswersAtom, (prev) => ({
      ...prev,
      answers: [...prev.answers, newItem],
    }));
  } else if (mode === "classicUnlimited") {
    set(classicPracticeAnswersAtom, (prev) => [...prev, newItem]);
  } else if (mode === "whosthatpokemon") {
    set(whosthatpokemonAnswersAtom, (prev) => ({
      ...prev,
      answers: [...prev.answers, newItem],
    }));
  } else if (mode === "whosthatpokemonUnlimited") {
    set(whosthatpokemonPracticeAnswersAtom, (prev) => [...prev, newItem]);
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
      set(classicAnswersAtom, (prev) => ({
        ...prev,
        stats: {
          guesses: prev.stats.guesses,
          wins: prev.stats.wins + 1,
          plays: prev.stats.plays + 1,
          streak: prev.stats.streak + 1,
          maxStreak:
            prev.stats.streak >= prev.stats.maxStreak
              ? prev.stats.streak + 1
              : prev.stats.maxStreak,
        },
      }));
    }
    if (mode === "whosthatpokemon") {
      set(whosthatpokemonAnswersAtom, (prev) => ({
        ...prev,
        stats: {
          guesses: prev.stats.guesses,
          wins: prev.stats.wins + 1,
          plays: prev.stats.plays + 1,
          streak: prev.stats.streak + 1,
          maxStreak:
            prev.stats.streak > prev.stats.maxStreak
              ? prev.stats.streak + 1
              : prev.stats.maxStreak,
        },
      }));
    }
    if (mode === "classicUnlimited") set(classicPracticeAnswersAtom, []);
    if (mode === "whosthatpokemonUnlimited") {
      set(whosthatpokemonPracticeAnswersAtom, []);
    }
  }
});
addGuessedItemAtom.debugLabel = "addGuessedItemAtom";

//TODO: Localstorage stat to track if it's the first time the user is playing the game
//! The way framed does stats is it saves guesses as an array and it increments the value in the array correspondent to the guess. makes it easy to add into a chart
// The other values can just be incremented. If the user loses then reset streak and if they win increment streak. If streak is greater than max streak then set max streak to streak
// Don't save the results of archive games
