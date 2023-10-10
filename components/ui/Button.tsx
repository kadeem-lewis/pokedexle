import { ComponentProps, forwardRef } from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors  focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase",
  {
    variants: {
      variant: {
        classic: "",
        flat: "border-2 border-white outline outline-black text-border text-white",
      },
      size: {
        default: "px-2 py-1",
        tall: "py-0.5 px-px",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
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
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
