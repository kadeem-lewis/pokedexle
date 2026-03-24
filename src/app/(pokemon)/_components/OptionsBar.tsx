"use client";
import { Icon } from "@/components/Icon";
import HowToPlayContent from "./content/HowToPlay";
import { Button } from "react-aria-components";
import { Dialog, DialogTrigger, DialogModal } from "@/components/ui/Dialog";
import Link from "next/link";

export default function OptionsBar() {
  return (
    <nav className="grid grid-cols-6 border-2 border-fg bg-panel ring-4 ring-primary-accent">
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
          <Dialog title="How to Play">
            <HowToPlayContent />
          </Dialog>
        </DialogModal>
      </DialogTrigger>
      <Link
        href="/about"
        className="border-r-2 border-fg py-1"
        aria-label="open about modal"
      >
        <Icon
          name="heroicons-exclamation-circle-solid"
          className="mx-auto h-6 w-6"
        />
      </Link>
      <Link
        href="/stats"
        className="border-r-2 border-fg py-1"
        aria-label="open stats modal"
      >
        <Icon name="heroicons-chart-bar-solid" className="mx-auto h-6 w-6" />
      </Link>
      <Link
        href="/archive"
        className="border-r-2 border-fg py-1"
        aria-label="open calendar modal"
      >
        <Icon name="pixelarticons-calendar-month" className="mx-auto h-6 w-6" />
      </Link>
      <Link
        href="/support"
        className="border-r-2 border-fg py-1"
        aria-label="open support modal"
      >
        <Icon name="heroicons-heart-solid" className="mx-auto h-6 w-6" />
      </Link>

      <Link href="/settings" className="py-1" aria-label="open settings modal">
        <Icon
          name="heroicons-cog-6-tooth-solid"
          className="mx-auto size-6 transition-transform hover:-rotate-45"
        />
      </Link>
    </nav>
  );
}
