"use client";
import OptionsBar from "@/components/layout/OptionsBar";
import MyComboBox from "@/components/MyComboBox";
import React, { useState, useEffect } from "react";

interface Item {
  name: string;
  url: string;
}

export default function Move() {
  const [data, setData] = useState<Array<Item>>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/move?limit=100000&offset=0"
        );
        const data = await response.json();
        const uniqueData = Array.from(
          new Set(data.results.map((item: Item) => item.name))
        ).map((name) => {
          return data.results.find((item: Item) => item.name === name);
        });
        setData(uniqueData);
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
