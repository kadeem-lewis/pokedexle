"use client";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import MyComboBox from "@/components/ui/MyComboBox";
import OptionsBar from "@/components/layout/OptionsBar";
import Gamebox from "@/components/core/Gamebox";
import { Item } from "@/stores/Store";

function Classic({
  pokemonList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(pokemonList);
  return (
    <div>
      <OptionsBar />
      <Gamebox itemArray={pokemonList} />
      <MyComboBox data={pokemonList} />
    </div>
  );
}
const getStaticProps: GetStaticProps<{ pokemonList: Item[] }> = async (
  context
) => {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  const pokemonData = await res.json();
  const pokemonList: Item[] = await pokemonData.results;
  return {
    props: {
      pokemonList,
    },
  };
};
export default Classic;
