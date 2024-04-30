"use client";
import { Icon } from "@/components/Icon";
import SettingsContent from "./content/Settings";
import AboutContent from "./content/About";
import StatsContent from "./content/Stats";
import HowToPlayContent from "./content/HowToPlay";
import Calendar from "./content/Calendar";
import { Button } from "react-aria-components";
import { Dialog, DialogTrigger, DialogModal } from "@/components/ui/Dialog";
import Support from "./content/Support";

export default function OptionsBar() {
  return (
    <nav className=" bg-panel grid grid-cols-6 border-2 border-fg ring-4 ring-purple-700">
      <DialogTrigger>
        <Button
          className="border-r-2 border-fg py-1"
          aria-label="open how to play modal"
        >
          <Icon
            name="heroicons-question-mark-circle-solid"
            className="mx-auto size-6"
          />
        </Button>
        <DialogModal>
          <Dialog title="How To Play">
            <HowToPlayContent />
          </Dialog>
        </DialogModal>
      </DialogTrigger>
      <DialogTrigger>
        <Button
          className="border-r-2 border-fg py-1"
          aria-label="open about modal"
        >
          <Icon
            name="heroicons-exclamation-circle-solid"
            className="mx-auto h-6 w-6"
          />
        </Button>
        <DialogModal>
          <Dialog title="About">
            <AboutContent />
          </Dialog>
        </DialogModal>
      </DialogTrigger>
      <DialogTrigger>
        <Button
          className="border-r-2 border-fg py-1"
          aria-label="open stats modal"
        >
          <Icon name="heroicons-chart-bar-solid" className="mx-auto h-6 w-6" />
        </Button>
        <DialogModal>
          <Dialog title="Stats">
            <StatsContent />
          </Dialog>
        </DialogModal>
      </DialogTrigger>
      <DialogTrigger>
        <Button
          className="border-r-2 border-fg py-1"
          aria-label="open calendar modal"
        >
          <Icon
            name="pixelarticons-calendar-month"
            className="mx-auto h-6 w-6"
          />
        </Button>
        <DialogModal>
          <Dialog title="Calendar">
            <Calendar />
          </Dialog>
        </DialogModal>
      </DialogTrigger>
      <DialogTrigger>
        <Button
          className="border-r-2 border-fg py-1"
          aria-label="open support modal"
        >
          <Icon name="heroicons-heart-solid" className="mx-auto h-6 w-6" />
        </Button>
        <DialogModal>
          <Dialog title="Support">
            <Support />
          </Dialog>
        </DialogModal>
      </DialogTrigger>
      <DialogTrigger>
        <Button className=" py-1" aria-label="open settings modal">
          <Icon
            name="heroicons-cog-6-tooth-solid"
            className="mx-auto size-6 transition-transform hover:-rotate-45"
          />
        </Button>
        <DialogModal>
          <Dialog title="Settings">
            <SettingsContent />
          </Dialog>
        </DialogModal>
      </DialogTrigger>
    </nav>
  );
}
