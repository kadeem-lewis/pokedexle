import { VariantProps, cva, cx } from "class-variance-authority";
import { ComponentProps } from "react";

const badgeVariants = cva(
  "border-b-2 border-t-2 text-center font-medium uppercase rounded-md leading-none text-shadow",
  {
    variants: {
      type: {
        normal: "bg-normal-200 border-t-normal-100 border-b-normal-300",
        fighting: "bg-fighting-200 border-t-fighting-100 border-b-fighting-300",
        flying: "bg-flying-200 border-t-flying-100 border-b-flying-300",
        poison: "bg-poison-200 border-t-poison-100 border-b-poison-300",
        ground: "bg-ground-200 border-t-ground-100 border-b-ground-300",
        rock: "bg-rock-200 border-t-rock-100 border-b-rock-300",
        bug: "bg-bug-200 border-t-bug-100 border-b-bug-300",
        ghost: "bg-ghost-200 border-t-ghost-100 border-b-ghost-300",
        steel: "bg-steel-200 border-t-steel-100 border-b-steel-300",
        fire: "bg-fire-200 border-t-fire-100 border-b-fire-300",
        water: "bg-water-200 border-t-water-100 border-b-water-300",
        grass: "bg-grass-200 border-t-grass-100 border-b-grass-300",
        electric: "bg-electric-200 border-t-electric-100 border-b-electric-300",
        psychic: "bg-psychic-200 border-t-psychic-100 border-b-psychic-300",
        ice: "bg-ice-200 border-t-ice-100 border-b-ice-300",
        dragon: "bg-dragon-200 border-t-dragon-100 border-b-dragon-300",
        dark: "bg-dark-200 border-t-dark-100 border-b-dark-300",
        fairy: "bg-fairy-200 border-t-fairy-100 border-b-fairy-300",
      },
    },
  }
);

interface BadgeProps
  extends ComponentProps<"div">,
    VariantProps<typeof badgeVariants> {}

function TypeBadge({ className, type, ...props }: BadgeProps) {
  return <div {...props} className={cx(badgeVariants({ type, className }))} />;
}

export { TypeBadge, badgeVariants };
