import { cx } from "cva";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx("animate-pulse rounded-md bg-bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
