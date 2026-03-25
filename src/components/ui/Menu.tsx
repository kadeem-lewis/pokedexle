import type { HTMLAttributes } from "react";

import {
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuTrigger as AriaMenuTrigger,
  MenuItem as AriaMenuItem,
  Separator,
  type MenuItemProps,
  type MenuProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

export const menu = tv({
  slots: {
    menuPopover:
      "entering:animate-fade exiting:animate-fadeOut overflow-auto rounded-xl border-2 border-white bg-panel shadow-xl ring-4 ring-border",
    header: "p-2",
    content: "flex h-fit w-56 flex-col gap-2 p-2 outline-none",
    item: "relative flex cursor-pointer justify-between rounded-md p-2 text-fg outline-none focus:bg-primary",
    separator: "mx-2 my-2 h-px bg-border",
  },
});

const { content, header, item, separator } = menu();

const MenuTrigger = AriaMenuTrigger;

const MenuContent = <T extends object>({
  children,
  className,
  ...props
}: MenuProps<T> & { className?: string }) => (
  <AriaMenu {...props} className={content({ className })}>
    {children}
  </AriaMenu>
);

const MenuItem = ({
  children,
  className,
  ...props
}: MenuItemProps & { className?: string }) => (
  <AriaMenuItem {...props} className={item({ className })}>
    {children}
  </AriaMenuItem>
);

const MenuHeader = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { className?: string }) => (
  <AriaHeader {...props} className={header({ className })}>
    {children}
  </AriaHeader>
);

const MenuSeperator = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { className?: string }) => (
  <Separator {...props} className={separator({ className })} />
);

export { MenuContent, MenuHeader, MenuItem, MenuSeperator, MenuTrigger };
