import React, { ReactNode } from "react";
import {
  Dialog as AriaDialog,
  DialogProps as AriaDialogProps,
  Heading,
  Button,
} from "react-aria-components";
import { Icon } from "../Icon";

interface DialogProps extends Omit<AriaDialogProps, "children"> {
  title: string;
  children: ReactNode;
}

export function Dialog({ title, children, ...props }: DialogProps) {
  return (
    <AriaDialog
      {...props}
      className="relative max-h-[inherit] overflow-auto p-6 outline outline-0 [[data-placement]>&]:p-4"
    >
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
