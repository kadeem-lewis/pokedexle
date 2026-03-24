import { cx } from "tailwind-variants";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx("animate-pulse rounded-md bg-canvas-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
