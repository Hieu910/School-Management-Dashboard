"use client";

import React from "react";
import EventCalender from "../admin/components/EventCalendar";
import Announcements from "../../../components/Announcements";
import ScheaduleCalendar from "@/components/ScheaduleCalendar";

const ParentPage = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-lg font-semibold"> Schedule (Banana Joe)</h1>
          <ScheaduleCalendar></ScheaduleCalendar>
        </div>
      </div>

      <div className="w-full xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
