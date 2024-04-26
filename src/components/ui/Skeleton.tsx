import { cnBase } from "tailwind-variants";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cnBase("animate-pulse rounded-md bg-bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
