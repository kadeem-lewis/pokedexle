import type { ReactNode } from "react";

import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps,
  Label,
} from "react-aria-components";

import { tv, type VariantProps } from "tailwind-variants";

const switchVariants = tv({
  slots: {
    root: "[&>div]:ring-offset-surface flex items-center gap-2 transition-none duration-200 [&>div]:ring-focus [&>div]:ring-offset-2 [&>div]:data-[focus-visible]:ring-2",
    indicator:
      "bg-surface-3 h-6 w-10 cursor-pointer rounded-2xl duration-200 before:mx-[2px] before:mt-[2px] before:block before:h-5 before:w-5 before:rounded-2xl before:bg-white before:transition-all ",
    label: "text-fg-3",
  },
  variants: {
    selected: {
      true: { indicator: "bg-primary before:translate-x-4" },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

type SwitchVariantProps = VariantProps<typeof switchVariants>;

interface SwitchProps extends SwitchVariantProps, AriaSwitchProps {
  children?: ReactNode;
  className?: string;
}

export const Switch = ({ className, children, ...restProps }: SwitchProps) => (
  <AriaSwitch className={switchVariants().root({ className })} {...restProps}>
    {({ isSelected }) => (
      <>
        <div
          className={switchVariants({
            selected: isSelected,
          }).indicator()}
        />
        <Label className={switchVariants().label()}> {children}</Label>
      </>
    )}
  </AriaSwitch>
);
