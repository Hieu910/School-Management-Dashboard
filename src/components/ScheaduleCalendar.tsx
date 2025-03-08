"use client";

import { Calendar, dayjsLocalizer,View, Views } from "react-big-calendar";

import dayjs from 'dayjs'

import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {  useEffect, useState } from "react";

const localizer  = dayjsLocalizer(dayjs)


const ScheaduleCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const [events , setEvents] = useState<any>()

  useEffect(()=>{

    setEvents(calendarEvents)
  },[])

  const handleOnChangeView = (selectedView: View) => {
    console.log()
    setView(selectedView);
  };
 

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default ScheaduleCalendar;