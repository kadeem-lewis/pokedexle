import { VariantProps, cva, cx } from "class-variance-authority";
import { ComponentProps } from "react";
//proposed reusable component that would be responsible for showing the titles in the FeedbackRow?

const tileVariants = cva("border-2 border-current before:block shadow-inner", {
  variants: {
    status: {
      correct: "bg-green-500",
      incorrect: "bg-red-700 bg-opacity-50",
    },
    difference: {
      higher:
        "relative after:w-full after:absolute after:h-full after:clip-path-arrowup after:bg-red-800 after:hover:bg-red-950 after:-z-10 after:left-0 after:top-[1px]",
      lower:
        "relative after:clip-path-arrowdown after:w-full after:absolute after:h-full after:bg-red-800 after:hover:bg-red-950 after:-z-10 after:left-0 after:top-[1px]",
    },
  },
});

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
      className={cx("flex justify-center items-center h-full", className)}
      {...props}
    />
  );
}
export { Tile, TileContent, tileVariants };
