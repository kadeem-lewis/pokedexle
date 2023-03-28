"use client";
import OptionsBar from "@/components/layout/OptionsBar";
import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

export default function Classic() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div>
      <OptionsBar />
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
        <Combobox.Options>
          {filteredPeople.map((person) => (
            <Combobox.Option key={person} value={person}>
              {person}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
