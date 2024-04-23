import { VariantProps, cva, cx } from "cva";
import { ComponentProps } from "react";

const badgeVariants = cva({
  base: "text-shadow rounded-md border-b-2 border-t-2 text-center font-medium uppercase leading-none",
  variants: {
    type: {
      normal: "border-b-normal-300 border-t-normal-100 bg-normal-200",
      fighting: "border-b-fighting-300 border-t-fighting-100 bg-fighting-200",
      flying: "border-b-flying-300 border-t-flying-100 bg-flying-200",
      poison: "border-b-poison-300 border-t-poison-100 bg-poison-200",
      ground: "border-b-ground-300 border-t-ground-100 bg-ground-200",
      rock: "border-b-rock-300 border-t-rock-100 bg-rock-200",
      bug: "border-b-bug-300 border-t-bug-100 bg-bug-200",
      ghost: "border-b-ghost-300 border-t-ghost-100 bg-ghost-200",
      steel: "border-b-steel-300 border-t-steel-100 bg-steel-200",
      fire: "border-b-fire-300 border-t-fire-100 bg-fire-200",
      water: "border-b-water-300 border-t-water-100 bg-water-200",
      grass: "border-b-grass-300 border-t-grass-100 bg-grass-200",
      electric: "border-b-electric-300 border-t-electric-100 bg-electric-200",
      psychic: "border-b-psychic-300 border-t-psychic-100 bg-psychic-200",
      ice: "border-b-ice-300 border-t-ice-100 bg-ice-200",
      dragon: "border-b-dragon-300 border-t-dragon-100 bg-dragon-200",
      dark: "border-b-dark-300 border-t-dark-100 bg-dark-200",
      fairy: "border-b-fairy-300 border-t-fairy-100 bg-fairy-200",
    },
    effect: {
      default: "",
      disabled: "-z-10 opacity-50 brightness-50 grayscale",
      highlighted: "ring-2 ring-black dark:ring-white", //have it be a bright text color
    },
  },
});

interface BadgeProps
  extends ComponentProps<"div">,
    VariantProps<typeof badgeVariants> {}

function TypeBadge({ className, type, effect, ...props }: BadgeProps) {
  return (
    <div
      {...props}
      className={cx(badgeVariants({ type, effect, className }))}
    />
  );
}

export { TypeBadge, badgeVariants };
