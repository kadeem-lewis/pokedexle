"use client";
import OptionsBar from "@/components/OptionsBar";
import React from "react";
import { Combobox } from "@headlessui/react";

export default function move() {
  return (
    <div>
      <OptionsBar />
      move
      <Combobox>
        <Combobox.Input />
        <Combobox.Options></Combobox.Options>
      </Combobox>
    </div>
  );
}
