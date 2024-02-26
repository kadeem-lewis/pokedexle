import { FC } from "react";
import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Button as AriaButton } from "react-aria-components";

const buttonVariants = cva(
  "focus-visible:ring-ring inline-flex items-center justify-center  uppercase transition-colors focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        classic: "",
        flat: "text-border border-2 border-white text-white outline outline-black",
      },
      size: {
        default: "px-2 py-1",
        tall: "px-px py-0.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

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
