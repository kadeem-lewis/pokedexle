import { tv, type VariantProps } from "tailwind-variants";
import { ComponentProps } from "react";
//proposed reusable component that would be responsible for showing the titles in the FeedbackRow?

const tile = tv(
  {
    base: "text-shadow basis-1/6 rounded-md border-2 border-primary text-white shadow-inner before:block",
    variants: {
      status: {
        correct: "bg-green-500",
        incorrect: "bg-red-700 bg-opacity-50",
      },
      difference: {
        higher:
          "relative after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:bg-red-800 after:clip-path-arrowup after:hover:bg-red-950",
        lower:
          "relative after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:bg-red-800 after:clip-path-arrowdown after:hover:bg-red-950",
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
