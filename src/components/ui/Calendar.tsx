import { Icon } from "../Icon";
import {
  Calendar as AriaCalendar,
  CalendarProps as AriaCalendarProps,
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateValue,
  Heading,
  Text,
} from "react-aria-components";

import { tv } from "tailwind-variants";

const calendar = tv({
  slots: {
    root: "bg-surface w-fit max-w-full rounded-xl border border-border p-4 text-fg shadow-lg",
    header: "mb-4 flex items-center ",
    heading: "text-md m-0 flex-1 text-center text-lg font-bold",
    gridHeaderCell: "text-fg-5 pb-2 text-sm",
    iconButton:
      "ring-focus data-[hovered]:bg-surface-2 m-0 flex h-8 w-8 appearance-none items-center justify-center rounded-md text-center outline-none data-[focus-visible]:ring-2",
    cell: "ring-focus data-[hovered]:bg-surface-2 data-[pressed]:bg-surface-2 data-[selected]:text-fg-accent data-[unavailable]:text-fg-6 -m-[1px] mb-1 flex h-8 w-8 items-center justify-center rounded-md p-5 text-center text-sm outline-none data-[selected]:bg-primary data-[unavailable]:line-through data-[focus-visible]:ring-2 [&[data-outside-month]]:hidden",
  },
});

const { root, header, heading, gridHeaderCell, cell, iconButton } = calendar();

interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, "className"> {
  error?: string;
  className?: string;
}

export const Calendar = ({
  className,
  error,
  ...props
}: CalendarProps<DateValue>) => (
  <AriaCalendar {...props} className={root({ className })}>
    <header className={header()}>
      <Button className={iconButton()} slot="previous">
        <Icon name="pixelarticons-chevron-left" className="size-6" />
      </Button>
      <Heading className={heading()} />
      <Button className={iconButton()} slot="next">
        <Icon name="pixelarticons-chevron-right" className="size-6" />
      </Button>
    </header>
    <CalendarGrid>
      <CalendarGridHeader>
        {(day) => (
          <CalendarHeaderCell className={gridHeaderCell()}>
            {day}
          </CalendarHeaderCell>
        )}
      </CalendarGridHeader>
      <CalendarGridBody>
        {(date) => <CalendarCell className={cell()} date={date} />}
      </CalendarGridBody>
    </CalendarGrid>
    {error && <Text slot="error">{error}</Text>}
  </AriaCalendar>
);

Calendar.displayName = "Calendar";
