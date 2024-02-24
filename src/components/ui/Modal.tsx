import React from "react";
import {
  ModalOverlay,
  ModalOverlayProps,
  Modal as AriaModal,
  Dialog,
  Heading,
  Button,
} from "react-aria-components";
import { Icons } from "../Icons";

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} isDismissable>
      <AriaModal>
        <Dialog>
          <div>
            <Icons.pokeballOutline className="h-8 w-8" />
            <Heading slot="title">Modal Title</Heading>
            <Icons.pokeballOutline className="h-8 w-8" />
          </div>
          <Button>
            <Icons.xMark className="absolute right-6 top-6 h-6 w-6 stroke-2" />
          </Button>
          <p>Modal content goes here.</p>
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}
