import React, { ReactNode } from "react";
import {
  Dialog as AriaDialog,
  DialogProps as AriaDialogProps,
  Heading,
  Button,
} from "react-aria-components";
import { Icons } from "../Icons";

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
              <Icons.pokeballOutline className="h-8 w-8" />
              <Heading slot="title">{title}</Heading>
              <Icons.pokeballOutline className="h-8 w-8" />
            </div>
            <Button onPress={close}>
              <Icons.xMark className="size-6 stroke-2" />
            </Button>
          </div>
          <div>{children}</div>
        </>
      )}
    </AriaDialog>
  );
}
