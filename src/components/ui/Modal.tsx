import {
  ModalOverlay,
  Modal as AriaModal,
  ModalOverlayProps,
} from "react-aria-components";

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay
      {...props}
      className="fixed left-0 top-0 isolate z-20 flex h-[--visual-viewport-height] w-full items-center justify-center bg-black/[15%] p-4 text-center backdrop-blur-lg"
    >
      <AriaModal
        {...props}
        className="max-h-full w-full max-w-md rounded-2xl border border-black/10 bg-white bg-clip-padding text-left align-middle text-slate-700 shadow-2xl dark:border-white/10 dark:bg-zinc-800/70 dark:text-zinc-300 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]"
      ></AriaModal>
    </ModalOverlay>
  );
}
