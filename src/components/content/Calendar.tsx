"use client";
import { useState } from "react";
import { Calendar as MyCalendar } from "../ui/Calendar";
import { getLocalTimeZone, today, isEqualDay } from "@internationalized/date";
import { usePathname, useRouter } from "next/navigation";
import { DateValue } from "react-aria-components";
import { useAtom } from "jotai";
import { dateAtom } from "@/atoms/GameAtoms";

export default function Calendar() {
  const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
  const [, setAtomDate] = useAtom(dateAtom);

  const router = useRouter();
  const pathname = usePathname();

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
      maxValue={today(getLocalTimeZone())}
    />
  );
}
