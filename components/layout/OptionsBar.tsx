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
import * as Tooltip from "@radix-ui/react-tooltip";

export default function OptionsBar() {
  const [settingClick, setSettingClick] = useState(false);
  const [aboutClick, setAboutClick] = useState(false);
  const [statsClick, setStatsClick] = useState(false);
  const [howToPlayClick, setHowToPlayClick] = useState(false);
  return (
    <nav className=" border-b-2 border-current flex justify-around py-2">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              onClick={() => setAboutClick(true)}
              aria-describedby="how-to-play-desc"
            >
              <QuestionMarkCircleIcon className="h-6 w-6 text-current" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className=" rounded py-2 px-4 transition-all bg-white dark:bg-black">
              How to Play
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      {howToPlayClick && (
        <OptionsModal
          isOpen={howToPlayClick}
          setIsOpen={setHowToPlayClick}
          title="How To Play"
        >
          <HowToPlayContent />
        </OptionsModal>
      )}

      <button
        onClick={() => setSettingClick(true)}
        aria-describedby="setting-desc"
      >
        <Cog6ToothIcon className="h-6 w-6 text-current" />
        <span
          role="tooltip"
          id="setting-desc"
          className="px-3 py-2 text-center bg-white dark:bg-black rounded relative border-2 border-current"
        >
          Settings
        </span>
        {settingClick && (
          <OptionsModal
            isOpen={settingClick}
            setIsOpen={setSettingClick}
            title="Settings"
          >
            <SettingsContent />
          </OptionsModal>
        )}
      </button>
      <button onClick={() => setStatsClick(true)} aria-describedby="stats-desc">
        <ChartBarIcon className="h-6 w-6 text-current" />
        <span
          role="tooltip"
          id="stats-desc"
          className="px-3 py-2 text-center bg-white dark:bg-black rounded relative border-2 border-current"
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
      <button onClick={() => setAboutClick(true)} aria-describedby="about-desc">
        <ExclamationCircleIcon className="h-6 w-6 text-current" />
        <span
          role="tooltip"
          id="about-desc"
          className="px-3 py-2 text-center bg-white dark:bg-black rounded relative border-2 border-current"
        >
          About
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
    </nav>
  );
}
