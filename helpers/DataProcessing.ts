interface Item {
  name: string;
  url: string;
  formName?: string;
  formInfo?: string;
}
const demonymValues: { [key: string]: string } = {
  mega: "Mega",
  galar: "Galarian",
  alola: "Alolan",
  hisui: "Hisuian",
  paldea: "Paldean",
};
export function pokemonCleanse(data: Item[]): Item[] {
  const cleanedArray = data
    .filter(({ name }) => name.includes("-"))
    .map(({ name, url }) => {
      const nameParts = name.split("-");
      const pokemonName = nameParts[0];
      const formParts = nameParts.slice(1);
      const formName = formParts[0];
      const formInfo = formParts.slice(1).join(" ");

      const formDemonym =
        demonymValues[formName.toLowerCase()] ||
        formName.charAt(0).toUpperCase() + formName.slice(1);

      return {
        name: formDemonym + " " + pokemonName + " " + formInfo,
        url,
      };
    });

  const unprocessedArray = data.filter(({ name }) => !name.includes("-"));

  return [
    ...cleanedArray,
    ...unprocessedArray.map(({ name, url }) => ({ name, url })),
  ];
}

export function moveCleanse() {}