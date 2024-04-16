"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("./icons/spritesheet.svg", {
    as: "image",
  });
  return null;
}
