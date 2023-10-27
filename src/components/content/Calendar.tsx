import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useAtom } from "jotai";
import { dateAtom } from "@/atoms/GameAtoms";
import { addDays, endOfMonth, format } from "date-fns";
// Your App.tsx file
import "react-day-picker/dist/style.css";

export default function Calendar() {
  // const [selectedDate, setSelectedDate] = useAtom(dateAtom)
  // const handleDayClick = (date:Date)=> {
  //   console.log(date)
  //   setSelectedDate(date)
  //   console.log(selectedDate)
  // };
  // //disable all days before id 1 in the daily table
  // const disabledDays = [{from: addDays(new Date(), 1),to: endOfMonth(new Date())}]
  // const footer = selectedDate ? (
  //   <p>You selected {format(selectedDate, 'PPP')}.</p>
  // ) : (
  //   <p>Please pick a day.</p>
  // );

  return (
    <div className="flex w-full items-center justify-start text-2xl">
      Coming Soon
      {/* <DayPicker mode="single" selected={selectedDate} onDayClick={handleDayClick} toDate={new Date()} disabled={disabledDays} footer={footer}/> */}
    </div>
  );
}
