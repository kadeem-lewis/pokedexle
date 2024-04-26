import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { Button as AriaButton } from "react-aria-components";

const button = tv(
  {
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
  },
  { twMerge: false },
);

interface ButtonProps extends AriaButtonProps, VariantProps<typeof button> {
  className?: string;
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <AriaButton className={button({ className, variant, size })} {...props} />
  );
}
