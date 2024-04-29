import React, { ReactNode } from "react";
import {
  Dialog as AriaDialog,
  DialogProps as AriaDialogProps,
  DialogTrigger as AriaDialogTrigger,
  Heading,
  Button,
  ModalOverlay,
  Modal,
  ModalOverlayProps,
} from "react-aria-components";
import { Icon } from "../Icon";
import { tv } from "tailwind-variants";

const dialog = tv({
  slots: {
    overlay:
      "fixed left-0 top-0 isolate z-20 flex h-[--visual-viewport-height] w-full items-center justify-center bg-black/[15%] p-4 text-center backdrop-blur-lg",
    modal:
      "relative max-h-full w-full max-w-xl rounded-lg border-4 border-white bg-bg-panel bg-clip-padding text-left align-middle text-fg shadow-2xl ring-8 ring-border dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]",
    content:
      "relative max-h-[inherit] overflow-auto p-6 outline outline-0 before:absolute before:inset-0 before:z-[-1] before:bg-[url('/svgs/pokeball-hollow.svg')] before:bg-contain before:bg-center  before:bg-no-repeat before:bg-origin-content before:px-4 before:py-1 [[data-placement]>&]:p-4",
  },
});

const { overlay, modal, content } = dialog();

function DialogModal({
  className,
  ...props
}: ModalOverlayProps & { className?: string }) {
  return (
    <ModalOverlay {...props} isDismissable={true} className={overlay()}>
      <Modal {...props} className={modal(className)}></Modal>
    </ModalOverlay>
  );
}

interface DialogProps extends Omit<AriaDialogProps, "children"> {
  title: string;
  children: ReactNode;
  className?: string;
}

function Dialog({ title, children, className, ...props }: DialogProps) {
  return (
    <AriaDialog {...props} className={content(className)}>
      {({ close }) => (
        <>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2 text-4xl font-bold uppercase">
              <Icon name="mdi-pokeball" className="size-8" />
              <Heading slot="title">{title}</Heading>
              <Icon name="mdi-pokeball" className="size-8" />
            </div>
            <Button onPress={close}>
              <Icon name="pixelarticons-close" className="size-6 stroke-2" />
            </Button>
          </div>
          <div>{children}</div>
        </>
      )}
    </AriaDialog>
  );
}

const DialogTrigger = AriaDialogTrigger;

export { DialogModal, Dialog, DialogTrigger };
