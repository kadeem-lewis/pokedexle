import type {
  CalendarProps as AriaCalendarProps,
  DateValue,
} from "react-aria-components";
import {
  Text,
  Button,
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  //CalendarGridBody,
  //CalendarGridHeader,
  //CalendarHeaderCell,
  Heading,
} from "react-aria-components";

interface CalendarProps<T extends DateValue> extends AriaCalendarProps<T> {
  errorMessage?: string;
}

export default function Calendar<T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) {
  //TODO: replace symbols with Icons matching aesthetic
  return (
    <AriaCalendar {...props}>
      <header>
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>
      <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </AriaCalendar>
  );
}
