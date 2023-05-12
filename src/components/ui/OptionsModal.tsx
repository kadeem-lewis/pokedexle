import React, { Dispatch, Fragment } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}
export default function OptionsModal({
  isOpen,
  setIsOpen,
  children,
  title,
}: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 rounded-lg border-4 border-current bg-white p-4 dark:bg-black">
          <Dialog.Title className="text-4xl font-bold">{title}</Dialog.Title>
          <Dialog.DialogDescription></Dialog.DialogDescription>
          <div>{children}</div>
          <Dialog.DialogClose>
            <button aria-label="Close" className=" hover:outline-1">
              <XMarkIcon className="absolute right-6 top-6 h-6 w-6 stroke-2 text-current" />
            </button>
          </Dialog.DialogClose>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
