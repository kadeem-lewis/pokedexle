import { FC } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { cva, cx, type VariantProps } from "cva";
import { Button as AriaButton } from "react-aria-components";

const buttonVariants = cva({
  base: "focus-visible:ring-ring inline-flex items-center justify-center  uppercase transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      classic: "",
      flat: "border-2 border-white text-border text-white outline outline-black",
    },
    size: {
      default: "px-2 py-1",
      tall: "px-px py-0.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({ className, variant, size, ...props }) => {
  return (
    <AriaButton
      className={cx(buttonVariants({ variant, className, size }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
