"use client";
import { useEffect, useState } from "react";
import { Calendar as MyCalendar } from "../ui/Calendar";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useRouter } from "next/navigation";
import { DateValue } from "react-aria-components";

export default function Calendar() {
  const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
  const router = useRouter();

  useEffect(() => {
    router.push("?date=" + date.toString());
    router.refresh();
  }, [date, router]);

  return <MyCalendar value={date} onChange={setDate} />;
}
