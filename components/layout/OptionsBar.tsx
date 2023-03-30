import React, { useState } from "react";
import {
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import OptionsModal from "../ui/OptionsModal";
import SettingsContent from "../content/SettingsContent";
import AboutContent from "../content/AboutContent";
import StatsContent from "../content/StatsContent";
import HowToPlayContent from "../content/HowToPlayContent";
export default function OptionsBar() {
  const [settingClick, setSettingClick] = useState(false);
  const [aboutClick, setAboutClick] = useState(false);
  const [statsClick, setStatsClick] = useState(false);
  const [howToPlayClick, setHowToPlayClick] = useState(false);
  return (
    <nav className=" border-b-2 border-current flex justify-around py-2">
      <button onClick={() => setAboutClick(true)} className="has-tooltip">
        <QuestionMarkCircleIcon className="h-6 w-6 text-current" />
        <span
          role="tooltip"
          className="tooltip px-3 py-2 text-center bg-white dark:bg-black rounded relative border-2 border-current"
        >
          How to Play
        </span>
      </button>
      {aboutClick && (
        <OptionsModal
          isOpen={aboutClick}
          setIsOpen={setAboutClick}
          title="About"
        >
          <AboutContent />
        </OptionsModal>
      )}
      <button onClick={() => setSettingClick(true)} className="has-tooltip">
        <Cog6ToothIcon className="h-6 w-6 text-current" />
        <span
          role="tooltip"
          className="tooltip px-3 py-2 text-center bg-white dark:bg-black rounded relative border-2 border-current"
        >
          Settings
        </span>
        {settingClick && (
          <OptionsModal
            isOpen={settingClick}
            setIsOpen={setSettingClick}
            title="Setting"
          >
            <SettingsContent />
          </OptionsModal>
        )}
      </button>
      <button onClick={() => setStatsClick(true)} className="has-tooltip">
        <ChartBarIcon className="h-6 w-6 text-current" />
        <span
          role="tooltip"
          className="tooltip px-3 py-2 text-center bg-white dark:bg-black rounded relative border-2 border-current"
        >
          Stats
        </span>
      </button>
      {statsClick && (
        <OptionsModal
          isOpen={statsClick}
          setIsOpen={setStatsClick}
          title="Stats"
        >
          <StatsContent />
        </OptionsModal>
      )}
      <button onClick={() => setHowToPlayClick(true)} className="has-tooltip">
        <ExclamationCircleIcon className="h-6 w-6 text-current" />
        <span
          role="tooltip"
          className="tooltip px-3 py-2 text-center bg-white dark:bg-black rounded relative border-2 border-current"
        >
          About
        </span>
      </button>
      {howToPlayClick && (
        <OptionsModal
          isOpen={howToPlayClick}
          setIsOpen={setHowToPlayClick}
          title="Stats"
        >
          <HowToPlayContent />
        </OptionsModal>
      )}
    </nav>
  );
}
