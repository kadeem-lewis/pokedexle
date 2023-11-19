"use client"
import React, { Dispatch, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icons } from "../Icons";
type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
};
export default function OptionsModal({
  isOpen,
  setIsOpen,
  children,
  title,
}: ModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative my-8 w-full max-w-md rounded-lg border-4 border-foreground bg-background p-4">
                <Dialog.Title
                  as="h3"
                  className="flex items-center justify-start gap-x-2 text-4xl font-bold uppercase"
                >
                  <Icons.pokeballOutline className="h-8 w-8" />
                  {title}
                  <Icons.pokeballOutline className="h-8 w-8" />
                </Dialog.Title>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Icons.xMark className="absolute right-6 top-6 h-6 w-6 stroke-2" />
                </button>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
