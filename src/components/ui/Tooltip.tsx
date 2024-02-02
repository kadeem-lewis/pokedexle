import type { TooltipProps as AriaTooltipProps } from "react-aria-components";
import { OverlayArrow, Tooltip as AriaTooltip } from "react-aria-components";

interface TooltipProps extends Omit<AriaTooltipProps, "children"> {
  children: React.ReactNode;
}

export default function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip {...props}>
      <OverlayArrow>
        <svg width={8} height={8} viewBox="0 0 8 8">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  );
}
