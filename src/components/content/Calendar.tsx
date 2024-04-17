"use client";
import { useEffect, useState } from "react";
import { Calendar as MyCalendar } from "../ui/Calendar";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useRouter } from "next/navigation";

export default function Calendar() {
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const router = useRouter();

  useEffect(() => {
    router.push("?date=" + date.toString());
    router.refresh();
  }, [date, router]);

  return <MyCalendar date={date} onChange={setDate} />;
}
