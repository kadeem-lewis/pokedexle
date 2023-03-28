"use client";
import OptionsBar from "@/components/OptionsBar";
import React from "react";
import { Combobox, Tab } from "@headlessui/react";

export default function Move() {
  return (
    <div>
      <OptionsBar />
      move
      <Tab.Group>
        <Tab.List>
          <Tab>Daily</Tab>
          <Tab>Unlimited</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>hi</Tab.Panel>
          <Tab.Panel>hello</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <Combobox>
        <Combobox.Input />
        <Combobox.Options></Combobox.Options>
      </Combobox>
    </div>
  );
}
