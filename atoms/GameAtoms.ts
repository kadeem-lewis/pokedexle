import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

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

//TODO: have atom that connects to localstorage and stores all the game stats

//?: Maybe each game type should have its own atom so that the current results for each game mode is saved between sessions. It needs to check

//!: Should probably keep the whole atom responsible for resetting everything and making a new game

//gets the array of pokemon from prisma
export const pokedexAtom = atom<Pokemon[]>([]);
pokedexAtom.debugLabel = "pokedexAtom";

//! see if it is possible to fetch daily answer into atom directly

//the number of guesses a user has
export const guessAtom = atom({
  classic: 8,
  classicUnlimited: 8,
});
guessAtom.debugLabel = "guessAtom";

//selects a pokemon from that array to be the pokemon to guess
export const pokemonToGuessAtom = atom({
  classic: null as Pokemon | null,
  classicUnlimited: null as Pokemon | null,
});
pokemonToGuessAtom.debugLabel = "pokemonToGuessAtom";

//atom that is responsible for saying if the game is over or not
export const gameOverAtom = atom({
  classic: false,
  classicUnlimited: false,
});
gameOverAtom.debugLabel = "gameOverAtom";

//atom that stores the pokemon that have been guessed
export const guessedItemsAtom = atom({
  classic: [] as Pokemon[],
  classicUnlimited: [] as Pokemon[],
});
guessedItemsAtom.debugLabel = "guessedItemsAtom";

//?maybe use enum for types or some other typescript feature
export const currentGameMode = atom<"classic" | "classicUnlimited">("classic");
//derived writable atom that is attempting to reset all values back to their defaults
export const newGameAtom = atom(null, (get, set) => {
  const mode = get(currentGameMode);

  // For "classicUnlimited" mode:
  if (mode === "classicUnlimited") {
    // Create a new Pokemon to guess.
    const newPokemonToGuess =
      get(pokedexAtom)[Math.floor(Math.random() * get(pokedexAtom).length)];

    // Update guessed items for the "classicUnlimited" mode.
    set(guessedItemsAtom, { ...get(guessedItemsAtom), classicUnlimited: [] });

    // Update guess count for the "classicUnlimited" mode.
    set(guessAtom, { ...get(guessAtom), classicUnlimited: 8 });

    // Update game over status for the "classicUnlimited" mode.
    set(gameOverAtom, { ...get(gameOverAtom), classicUnlimited: false });

    // Update the Pokemon to guess for the "classicUnlimited" mode.
    set(pokemonToGuessAtom, {
      ...get(pokemonToGuessAtom),
      classicUnlimited: newPokemonToGuess,
    });

    // Set the classic practice solution (assuming this is only for "classicUnlimited" mode).
    set(classicPracticeSolutionAtom, newPokemonToGuess);
    set(classicPracticeAnswersAtom, []);
  }

  // For "classic" mode:
  if (mode === "classic") {
    // Reset guessed items for the "classic" mode.
    set(guessedItemsAtom, { ...get(guessedItemsAtom), classic: [] });

    // Reset guess count for the "classic" mode.
    set(guessAtom, { ...get(guessAtom), classic: 8 });
  }
});

newGameAtom.debugLabel = "newGameAtom";

//derived writable atom that adds the value passed into the guessed item array
//? Could have write function take in a key to specify which array to add item to
export const addGuessedItemAtom = atom(null, (get, set, newItem: Pokemon) => {
  const mode = get(currentGameMode);

  const currentGuesses = get(guessedItemsAtom)[mode];
  const updatedGuesses = [...currentGuesses, newItem];

  const updatedGuessItems = {
    ...get(guessedItemsAtom),
    [mode]: updatedGuesses,
  };

  set(guessedItemsAtom, updatedGuessItems);
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
    const updatedGuessCount = {
      ...get(guessAtom),
      [mode]: get(guessAtom)[mode] - 1,
    };
    set(guessAtom, updatedGuessCount);
  } else {
    const updatedGameOver = {
      ...get(gameOverAtom),
      [mode]: true,
    };
    set(gameOverAtom, updatedGameOver);
    if (mode === "classic") {
      set(classicGameOver, true);
      set(classicWinsAtom, (prev) => prev++);
    }
    if (mode === "classicUnlimited") set(classicPracticeAnswersAtom, []);
  }
});
addGuessedItemAtom.debugLabel = "addGuessedItemAtom";

export const classicAnswersAtom = atomWithStorage("classic_answers", {
  date: new Date(),
  answers: [] as Pokemon[],
});

export const classicPracticeAnswersAtom = atomWithStorage<Pokemon[]>(
  "classic_practice_answers",
  []
);
export const classicPracticeSolutionAtom = atomWithStorage<Pokemon | null>(
  "classic_practice_solution",
  null
);
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

export const dailyIdAtom = atom<number | null>(null);
