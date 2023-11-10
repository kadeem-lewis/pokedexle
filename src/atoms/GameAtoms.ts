import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { format } from "date-fns";
import { Daily } from "@prisma/client";
import { defaultGuesses } from "@/constants";

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  generation: number;
  sprite: string;
};
export type Move = {
  id: number;
  generation: number;
  name: string;
  power: number | null;
  pp: number;
  type: string;
  class: string;
  accuracy: number | null;
};

type DailyStorage = {
  date: string;
  answers: Pokemon[];
};

type DailyMoveStorage = {
  date: string;
  answers: Move[];
};

type GuessedItems = {
  classic: Pokemon[];
  classicUnlimited: Pokemon[];
  whosthatpokemon: Pokemon[];
  whosthatpokemonUnlimited: Pokemon[];
  move: Move[];
  moveUnlimited: Move[];
};

type DailyAnswers = {
  classic: Pokemon | null;
  whosthatpokemon: Pokemon | null;
  move: Move | null;
};

//gets the array of pokemon from prisma
export const pokedexAtom = atom<Pokemon[]>([]);
pokedexAtom.debugLabel = "pokedexAtom";

export const moveListAtom = atom<Move[]>([]);
moveListAtom.debugLabel = "moveListAtom";

//the number of guesses a user has
export const guessAtom = atom({
  classic: defaultGuesses,
  classicUnlimited: defaultGuesses,
  whosthatpokemon: defaultGuesses,
  whosthatpokemonUnlimited: defaultGuesses,
  move: defaultGuesses,
  moveUnlimited: defaultGuesses,
});
guessAtom.debugLabel = "guessAtom";

//!find a way to set the inital value to localStorageItem if available. Also maybe track the classic answers and solution in the same atom to prevent desync
//atom that stores the pokemon that have been guessed
export const guessedItemsAtom = atom<GuessedItems>({
  classic: [],
  classicUnlimited: [],
  whosthatpokemon: [],
  whosthatpokemonUnlimited: [],
  move: [],
  moveUnlimited: [],
});
guessedItemsAtom.debugLabel = "guessedItemsAtom";

export const dailyAtom = atom<Daily | null>(null);
dailyAtom.debugLabel = "dailyAtom";

export const classicPracticeSolutionAtom = atomWithStorage<Pokemon | null>(
  "classic_practice_solution",
  null,
);
classicPracticeSolutionAtom.debugLabel = "classicPracticeSolutionAtom";

export const whosthatpokemonPracticeSolutionAtom =
  atomWithStorage<Pokemon | null>("whosthatpokemon_solution", null);

export const movePracticeSolutionAtom = atomWithStorage<Move | null>(
  "move_solution",
  null,
);
//Initializes the pokemon to guess Object
export const pokemonToGuessAtom = atom((get) => {
  return {
    classic: get(dailyPokemonAtom).classic,
    classicUnlimited: get(classicPracticeSolutionAtom)
      ? get(classicPracticeSolutionAtom)
      : get(pokedexAtom)[Math.floor(Math.random() * get(pokedexAtom).length)],
    whosthatpokemon: get(dailyPokemonAtom).whosthatpokemon,
    whosthatpokemonUnlimited: get(whosthatpokemonPracticeSolutionAtom)
      ? get(whosthatpokemonPracticeSolutionAtom)
      : get(pokedexAtom)[Math.floor(Math.random() * get(pokedexAtom).length)],
    move: get(dailyPokemonAtom).move,
    moveUnlimited: get(movePracticeSolutionAtom)
      ? get(movePracticeSolutionAtom)
      : get(moveListAtom)[Math.floor(Math.random() * get(moveListAtom).length)],
  };
});
pokemonToGuessAtom.debugLabel = "pokemonToGuessAtom";

//controls the daily classic Pokemon
export const dailyPokemonAtom = atom<DailyAnswers>({
  classic: null,
  whosthatpokemon: null,
  move: null,
});
dailyPokemonAtom.debugLabel = "dailyPokemonAtom";

export const classicAnswersAtom = atomWithStorage<DailyStorage>(
  "classic_answers",
  {
    date: format(new Date(), "yyyy-MM-dd"),
    answers: [],
  },
);
classicAnswersAtom.debugLabel = "classicAnswersAtom";

export const whosthatpokemonAnswersAtom = atomWithStorage<DailyStorage>(
  "whosthatpokemon_answers",
  {
    date: format(new Date(), "yyyy-MM-dd"),
    answers: [],
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
  move: false,
  moveUnlimited: false,
});
gameOverAtom.debugLabel = "gameOverAtom";

//?maybe use enum for types or some other typescript feature
export const currentGameMode = atom<
  | "classic"
  | "classicUnlimited"
  | "whosthatpokemon"
  | "whosthatpokemonUnlimited"
  | "move"
  | "moveUnlimited"
>("classic");
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
  if (mode === "whosthatpokemonUnlimited") {
    // Update game over status for the "classicUnlimited" mode.
    set(gameOverAtom, (prev) => ({ ...prev, whosthatpokemonUnlimited: false }));

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
  if (mode === "moveUnlimited") {
    // Update game over status for the "classicUnlimited" mode.
    set(gameOverAtom, (prev) => ({ ...prev, moveUnlimited: false }));

    // Create a new Pokemon to guess.
    const newMoveToGuess =
      get(moveListAtom)[Math.floor(Math.random() * get(moveListAtom).length)];

    //resetting values
    set(guessedItemsAtom, (prev) => ({
      ...prev,
      moveUnlimited: [],
    }));
    set(guessAtom, (prev) => ({
      ...prev,
      moveUnlimited: defaultGuesses,
    }));
    set(movePracticeSolutionAtom, newMoveToGuess);
    set(movePracticeAnswersAtom, []);
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
  } else if (mode === "whosthatpokemon") {
    set(whosthatpokemonAnswersAtom, (prev) => ({
      date: prev.date,
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
      set(classicWinsAtom, (prev) => prev++);
    }
    if (mode === "classicUnlimited") set(classicPracticeAnswersAtom, []);
    if (mode === "whosthatpokemonUnlimited") {
      set(whosthatpokemonPracticeAnswersAtom, []);
    }
  }
});
addGuessedItemAtom.debugLabel = "addGuessedItemAtom";

export const moveAnswersAtom = atomWithStorage<DailyMoveStorage>(
  "move_answers",
  {
    date: format(new Date(), "yyyy-MM-dd"),
    answers: [],
  },
);

export const movePracticeAnswersAtom = atomWithStorage<Move[]>(
  "move_practice_answers",
  [],
);

const moveWinsAtom = atomWithStorage("move_win_count", 0);

export const addGuessedMoveAtom = atom(null, (get, set, newItem: Move) => {
  const mode = get(currentGameMode);

  set(guessedItemsAtom, (prev) => ({
    ...prev,
    [mode]: [...prev[mode], newItem],
  }));
  if (mode === "move") {
    set(moveAnswersAtom, (prev) => ({
      date: prev.date,
      answers: [...prev.answers, newItem],
    }));
  } else if (mode === "moveUnlimited") {
    set(movePracticeAnswersAtom, (prev) => [...prev, newItem]);
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
    if (mode === "move") {
      set(moveWinsAtom, (prev) => prev++);
    }
    if (mode === "moveUnlimited") set(movePracticeAnswersAtom, []);
  }
});
addGuessedItemAtom.debugLabel = "addGuessedItemAtom";

export const classicWinsAtom = atomWithStorage("classic_win_count", 0);
