import { atom } from "jotai";
import { RESET, atomWithStorage } from "jotai/utils";
import { startOfDay, isToday, subMinutes, isSameDay } from "date-fns";
import { Daily } from "@prisma/client";

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

export const defaultGuesses = 6;
export const poundConversion = 0.22046; //hectograms to pounds
//gets the array of pokemon from prisma
export const pokedexAtom = atom<Pokemon[]>([]);
pokedexAtom.debugLabel = "pokedexAtom";

//the number of guesses a user has
export const guessAtom = atom({
  classic: defaultGuesses,
  classicUnlimited: defaultGuesses,
});
guessAtom.debugLabel = "guessAtom";

//atom that gets the current Date and can be used to get dates of other days
const dateAtom = atom(new Date());
dateAtom.debugLabel = "dateAtom";

//function to fetch Daily entry from database
export const dailyAtom = atom(async (get) => {
  const response = await fetch(
    `/api/dailies?date=${get(dateAtom).toISOString()}`
  );
  if (!response.ok) {
    throw new Error("Network response was not OK");
  }
  const data: Daily = await response.json();
  return data;
});
dailyAtom.debugLabel = "dailyAtom";

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
const dailyPokemonAtom = atom<Pokemon | null>(null);
dailyPokemonAtom.debugLabel = "dailyPokemonAtom";

//*This works but only runs if called in code
export const setDailiesAtom = atom(null, async (get, set) => {
  const { classicId, moveId, whosThatPokemonId, date } = await get(dailyAtom);
  const mode = get(currentGameMode);

  const dailyClassicPokemon = get(pokedexAtom).find(
    (pokemon) => pokemon.id === classicId
  );
  if (!dailyClassicPokemon) throw new Error("Daily Pokemon Not Found");

  set(dailyPokemonAtom, dailyClassicPokemon);

  if (get(classicAnswersAtom).date === date) {
    set(guessedItemsAtom, (prev) => ({
      ...prev,
      classic: get(classicAnswersAtom).answers,
    }));
    set(guessAtom, (prev) => ({
      ...prev,
      classic: defaultGuesses - get(classicAnswersAtom).answers.length,
    }));
  } else {
    set(classicAnswersAtom, {
      date: subMinutes(
        startOfDay(new Date()),
        startOfDay(new Date()).getTimezoneOffset()
      ),
      answers: [] as Pokemon[],
    });
  }
});

//atom that is responsible for saying if the game is over or not
export const gameOverAtom = atom({
  classic: false,
  classicUnlimited: false,
});
gameOverAtom.debugLabel = "gameOverAtom";

//!find a way to set the inital value to localStorageItem if available. Also maybe track the classic answers and solution in the same atom to prevent desync
//atom that stores the pokemon that have been guessed
export const guessedItemsAtom = atom({
  classic: [] as Pokemon[],
  classicUnlimited: [] as Pokemon[],
});
guessedItemsAtom.debugLabel = "guessedItemsAtom";

//?maybe use enum for types or some other typescript feature
export const currentGameMode = atom<"classic" | "classicUnlimited">("classic");
currentGameMode.debugLabel = "currentGameMode";
//derived writable atom that is attempting to reset all values back to their defaults
export const newGameAtom = atom(null, (get, set) => {
  const mode = get(currentGameMode);

  // For "classicUnlimited" mode:
  if (mode === "classicUnlimited") {
    // Update game over status for the "classicUnlimited" mode.
    set(gameOverAtom, { ...get(gameOverAtom), classicUnlimited: false });

    // Create a new Pokemon to guess.
    const newPokemonToGuess =
      get(pokedexAtom)[Math.floor(Math.random() * get(pokedexAtom).length)];

    // Update guessed items for the "classicUnlimited" mode.
    set(guessedItemsAtom, { ...get(guessedItemsAtom), classicUnlimited: [] });

    // Update guess count for the "classicUnlimited" mode.
    set(guessAtom, { ...get(guessAtom), classicUnlimited: defaultGuesses });

    // Set the classic practice solution (assuming this is only for "classicUnlimited" mode).
    set(classicPracticeSolutionAtom, newPokemonToGuess);
    set(classicPracticeAnswersAtom, []);
  }

  // For "classic" mode:
  if (mode === "classic") {
    // Reset guessed items for the "classic" mode.
    set(guessedItemsAtom, { ...get(guessedItemsAtom), classic: [] });

    // Reset guess count for the "classic" mode.
    set(guessAtom, { ...get(guessAtom), classic: defaultGuesses });
  }
});

newGameAtom.debugLabel = "newGameAtom";

//derived writable atom that adds the value passed into the guessed item array
//? Could have write function take in a key to specify which array to add item to
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
    set(classicPracticeAnswersAtom, [
      ...get(classicPracticeAnswersAtom),
      newItem,
    ]);
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

export const classicAnswersAtom = atomWithStorage("classic_answers", {
  date: subMinutes(
    startOfDay(new Date()),
    startOfDay(new Date()).getTimezoneOffset()
  ),
  answers: [] as Pokemon[],
});
classicAnswersAtom.debugLabel = "classicAnswersAtom";

export const classicPracticeAnswersAtom = atomWithStorage<Pokemon[]>(
  "classic_practice_answers",
  []
);
classicPracticeAnswersAtom.debugLabel = "classicPracticeAnswersAtom";

export const classicPracticeSolutionAtom = atomWithStorage<Pokemon | null>(
  "classic_practice_solution",
  null
);
classicPracticeSolutionAtom.debugLabel = "classicPracticeSolutionAtom";

export const whosThatPokemonAnswersAtom = atomWithStorage<string[]>(
  "wtp_answers",
  []
);
export const whosThatPokemonPracticeAtom = atomWithStorage<string[]>(
  "wtp_practice_answers",
  []
);
export const classicWinsAtom = atomWithStorage("classic_win_count", 0);

export const classicGameOver = atomWithStorage("classic_game_over", false);
