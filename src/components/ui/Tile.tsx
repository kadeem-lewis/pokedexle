import { tv, type VariantProps } from "tailwind-variants";
import { ComponentProps } from "react";
//proposed reusable component that would be responsible for showing the titles in the FeedbackRow?

const tile = tv(
  {
    base: "text-shadow basis-1/6 z-0 rounded-md border-2 border-primary text-white shadow-inner ",
    variants: {
      status: {
        correct: "bg-green-500",
        incorrect: "bg-red-700 bg-opacity-50",
      },
      difference: {
        higher:
          "arrow-up",
        lower:
          "arrow-down",
      },
    },
  },
  { twMerge: false },
);

interface TileProps extends ComponentProps<"div">, VariantProps<typeof tile> {
  className?: string;
}

//TODO: Tailwind variant will probably allow me to have this as one component. I need to make the two divs different slots
//TODO: I also need to use react-aria to make this focusable or at least the image ones.
//TODO: I need to make a variant for images
export function Tile({
  className,
  status,
  difference,
  children,
  ...props
}: TileProps) {
  return (
    <div
      className={tile({ status, difference, className })}
      {...props}
      tabIndex={0}
    >
      <div className="flex h-full items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}
