"use client";
import OptionsBar from "@/components/layout/OptionsBar";
import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";

export default function Classic() {
  return (
    <div>
      <OptionsBar />
      <Combobox>
        <Combobox.Input />
        <Combobox.Options>
          <Combobox.Option value={"hi"}>hi</Combobox.Option>
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
