import React, { useState } from "react";
import {
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import OptionsModal from "../modals/OptionsModal";
import SettingsContent from "../content/SettingsContent";
import AboutContent from "../content/AboutContent";
import StatsContent from "../content/StatsContent";
export default function OptionsBar() {
  const [settingClick, setSettingClick] = useState(false);
  const [aboutClick, setAboutClick] = useState(false);
  const [statsClick, setStatsClick] = useState(false);
  return (
    <nav className=" border-b-2 border-current flex justify-around py-2">
      <button>
        <QuestionMarkCircleIcon
          className="h-6 w-6 text-current"
          onClick={() => {
            setAboutClick(true);
          }}
        />
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
      <button>
        <Cog6ToothIcon
          className="h-6 w-6 text-current"
          onClick={() => {
            setSettingClick(true);
          }}
        />
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
      <button>
        <ChartBarIcon
          className="h-6 w-6 text-current"
          onClick={() => setStatsClick(true)}
        />
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
    </nav>
  );
}
