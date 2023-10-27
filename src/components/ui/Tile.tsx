import { VariantProps, cva, cx } from "class-variance-authority";
import { ComponentProps } from "react";
//proposed reusable component that would be responsible for showing the titles in the FeedbackRow?

const tileVariants = cva(
  "text-shadow basis-1/6 border-2 border-black text-white shadow-inner before:block",
  {
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
);

interface TileProps
  extends ComponentProps<"div">,
    VariantProps<typeof tileVariants> {}

interface TitleContentProps extends ComponentProps<"div"> {}

function Tile({ className, status, difference, ...props }: TileProps) {
  return (
    <div
      className={cx(tileVariants({ status, difference, className }))}
      {...props}
    />
  );
}

function TileContent({ className, ...props }: TitleContentProps) {
  return (
    <div
      className={cx(
        "flex h-full items-center justify-center text-center",
        className,
      )}
      {...props}
    />
  );
}
export { Tile, TileContent, tileVariants };
