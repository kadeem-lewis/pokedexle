import { ComponentProps, forwardRef } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { mergeProps } from "react-aria";
import { useButton, useFocusRing, useHover, AriaButtonProps } from "react-aria";

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
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(buttonVariants({ variant, className, size }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
