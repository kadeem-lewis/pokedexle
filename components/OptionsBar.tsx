import React from "react";
import { AiFillSetting, AiOutlineQuestionCircle } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";

export default function OptionsBar() {
  return (
    <nav className=" border-b-2 border-current flex justify-around py-2">
      <button>
        <AiOutlineQuestionCircle />
      </button>

      <button>
        <AiFillSetting />
      </button>
      <button>
        <IoIosStats />
      </button>
    </nav>
  );
}
