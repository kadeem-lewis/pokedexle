import React from "react";
import {
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
export default function OptionsBar() {
  return (
    <nav className=" border-b-2 border-current flex justify-around py-2">
      <button>
        <QuestionMarkCircleIcon className="h-6 w-6 text-current" />
      </button>

      <button>
        <Cog6ToothIcon className="h-6 w-6 text-current" />
      </button>
      <button>
        <ChartBarIcon className="h-6 w-6 text-current" />
      </button>
    </nav>
  );
}
