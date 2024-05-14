import { cnBase } from "tailwind-variants";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cnBase("bg-canvas-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
