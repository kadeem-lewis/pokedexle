import React, { Dispatch, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icons } from "@/components/Icons";
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
              <Dialog.Panel className="relative my-8 w-full max-w-md rounded-lg border-4 border-current bg-white p-4 dark:bg-black">
                <Dialog.Title as="h3" className="text-4xl font-bold">
                  {title}
                </Dialog.Title>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <Icons.xMark className="absolute right-6 top-6 h-6 w-6 stroke-2 text-current" />
                </button>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
