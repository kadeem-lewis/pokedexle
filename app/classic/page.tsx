"use client";
import MyComboBox from "@/components/ui/MyComboBox";
import OptionsBar from "@/components/layout/OptionsBar";
import { useState, useEffect } from "react";

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
