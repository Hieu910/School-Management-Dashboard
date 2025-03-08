

import React from "react";
import { auth } from "@clerk/nextjs/server";
import Announcements from "../../../components/Announcements";
import ScheaduleCalendarWrapper from "@/components/ScheaduleCalendarWrapper";

const ParentPage =async () => {
  const { userId } = await auth();
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-lg font-semibold"> Schedule (Banana Joe)</h1>
          <ScheaduleCalendarWrapper type="classId" id={userId}></ScheaduleCalendarWrapper>
        </div>
      </div>

      <div className="w-full xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
