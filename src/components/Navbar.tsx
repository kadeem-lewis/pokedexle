import React from "react";
import { AiFillSetting, AiOutlineQuestionCircle } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";

export const Navbar = () => {
  return (
    <header className=" max-w-sm md:max-w-full flex justify-between">
      <nav>
        <button>
          <AiOutlineQuestionCircle />
        </button>
      </nav>
      <h1>Pokedle</h1>
      <nav>
        <button>
          <AiFillSetting />
        </button>
        <button>
          <IoIosStats />
        </button>
      </nav>
    </header>
  );
};
