"use client";
import React, { useState } from "react";
import { Icons } from "@/components/Icons";
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
    <nav className=" grid grid-cols-4 border-2 border-current">
      <button
        onClick={() => setHowToPlayClick(true)}
        className="border-r-2 border-current py-1"
      >
        <Icons.questionMark className="mx-auto h-6 w-6 text-current" />
      </button>
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
        className="border-r-2 border-current py-1"
      >
        <Icons.settings className="mx-auto h-6 w-6 text-current transition-all hover:-rotate-45" />
      </button>
      {settingClick && (
        <OptionsModal
          isOpen={settingClick}
          setIsOpen={setSettingClick}
          title="Settings"
        >
          <SettingsContent />
        </OptionsModal>
      )}

      <button
        onClick={() => setStatsClick(true)}
        className="border-r-2 border-current py-1"
      >
        <Icons.chart className="mx-auto h-6 w-6 text-current" />
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
      <button onClick={() => setAboutClick(true)} className="py-1">
        <Icons.exclamationMark className="mx-auto h-6 w-6 text-current" />
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
