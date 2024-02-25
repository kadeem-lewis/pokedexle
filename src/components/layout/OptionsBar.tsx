"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";
import OptionsModal from "../ui/OptionsModal";
import SettingsContent from "../content/SettingsContent";
import AboutContent from "../content/AboutContent";
import StatsContent from "../content/StatsContent";
import HowToPlayContent from "../content/HowToPlayContent";
import Calendar from "../content/Calendar";
import { Button, DialogTrigger } from "react-aria-components";
import { Modal } from "../ui/Modal";
import { Dialog } from "../ui/Dialog";

export default function OptionsBar() {
  const [aboutClick, setAboutClick] = useState(false);
  const [statsClick, setStatsClick] = useState(false);
  const [calendarClick, setCalendarClick] = useState(false);
  return (
    <nav className=" grid grid-cols-5 border-2 border-foreground">
      <DialogTrigger>
        <Button
          className="border-r-2 border-foreground py-1"
          aria-label="open how to play modal"
        >
          <Icons.questionMark className="mx-auto h-6 w-6" />
        </Button>
        <Modal isDismissable>
          <Dialog title="How To Play">
            <HowToPlayContent />
          </Dialog>
        </Modal>
      </DialogTrigger>
      <DialogTrigger>
        <Button
          className="border-r-2 border-foreground py-1"
          aria-label="open settings modal"
        >
          <Icons.settings className="mx-auto h-6 w-6 transition-transform hover:-rotate-45" />
        </Button>
        <Modal isDismissable>
          <Dialog title="Settings">
            <SettingsContent />
          </Dialog>
        </Modal>
      </DialogTrigger>
      <DialogTrigger>
        <Button
          className="border-r-2 border-foreground py-1"
          aria-label="open calendar modal"
        >
          <Icons.calendar className="mx-auto h-6 w-6" />
        </Button>
        <Modal isDismissable>
          <Dialog title="Calendar">
            <Calendar />
          </Dialog>
        </Modal>
      </DialogTrigger>
      <DialogTrigger>
        <Button
          className="border-r-2 border-foreground py-1"
          aria-label="open stats modal"
        >
          <Icons.chart className="mx-auto h-6 w-6" />
        </Button>
        <Modal isDismissable>
          <Dialog title="Stats">
            <StatsContent />
          </Dialog>
        </Modal>
      </DialogTrigger>
      <DialogTrigger>
        <Button className="py-1" aria-label="open about modal">
          <Icons.exclamationMark className="mx-auto h-6 w-6" />
        </Button>
        <Modal isDismissable>
          <Dialog title="About">
            <AboutContent />
          </Dialog>
        </Modal>
      </DialogTrigger>
    </nav>
  );
}
