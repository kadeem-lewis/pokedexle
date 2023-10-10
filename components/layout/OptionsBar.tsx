"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import OptionsModal from "../ui/OptionsModal";
import SettingsContent from "../content/SettingsContent";
import AboutContent from "../content/AboutContent";
import StatsContent from "../content/StatsContent";
import HowToPlayContent from "../content/HowToPlayContent";
import Calendar from "../content/Calendar";

export default function OptionsBar() {
  const [settingClick, setSettingClick] = useState(false);
  const [aboutClick, setAboutClick] = useState(false);
  const [statsClick, setStatsClick] = useState(false);
  const [howToPlayClick, setHowToPlayClick] = useState(false);
  const [calendarClick, setCalendarClick] = useState(false);
  return (
    <nav className=" grid grid-cols-5 border-2 border-current">
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
        <Icons.settings className="mx-auto h-6 w-6 text-current transition-transform hover:-rotate-45" />
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
        onClick={() => setCalendarClick(true)}
        className="border-r-2 border-current py-1"
      >
        <Icons.calendar className="mx-auto h-6 w-6 text-current" />
      </button>
      {calendarClick && (
        <OptionsModal
          isOpen={calendarClick}
          setIsOpen={setCalendarClick}
          title="Calendar"
        >
          <Calendar />
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
