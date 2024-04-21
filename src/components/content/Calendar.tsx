"use client";
import { useState } from "react";
import { Calendar as MyCalendar } from "../ui/Calendar";
import {
  getLocalTimeZone,
  today,
  isEqualDay,
  CalendarDate,
} from "@internationalized/date";
import { usePathname, useRouter } from "next/navigation";
import { DateValue } from "react-aria-components";
import { useAtom } from "jotai";
import { dateAtom, firstDateAtom } from "@/atoms/GameAtoms";

export default function Calendar() {
  const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
  const [, setAtomDate] = useAtom(dateAtom);
  const [{ data }] = useAtom(firstDateAtom);

  const router = useRouter();
  const pathname = usePathname();
  let firstDate;

  if (data) {
    const date = new Date(data);
    firstDate = new CalendarDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
  }

  const handleDateChange = (date: DateValue) => {
    setDate(date);
    setAtomDate(date.toString());

    if (!isEqualDay(date, today(getLocalTimeZone()))) {
      router.push("?date=" + date.toString());
    } else {
      router.push(pathname);
    }
  };

  return (
    <MyCalendar
      aria-label="Puzzle Date"
      value={date}
      onChange={handleDateChange}
      minValue={firstDate}
      maxValue={today(getLocalTimeZone())}
    />
  );
}
