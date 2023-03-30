"use client";
import MyComboBox from "@/components/MyComboBox";
import OptionsBar from "@/components/layout/OptionsBar";
import { useState, useEffect } from "react";

const myArray = [
  { name: "John", url: "https://example.com/John" },
  { name: "Jane", url: "https://example.com/Jane" },
  { name: "Mike", url: "https://example.com/Mike" },
  { name: "Sara", url: "https://example.com/Sara" },
  { name: "Tom", url: "https://example.com/Tom" },
  { name: "Alice", url: "https://example.com/Alice" },
  { name: "Bob", url: "https://example.com/Bob" },
];
async function getPokemon() {
  const res = await fetch("https://pokeapi.co/api/v2/move?limit=10000");
  return res.json();
}
export default function Classic() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <OptionsBar />
      <MyComboBox data={data} />
    </div>
  );
}
