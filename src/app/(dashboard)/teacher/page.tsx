


import Announcements from "../../../components/Announcements";
import { auth } from "@clerk/nextjs/server";
import ScheaduleCalendarWrapper from "@/components/ScheaduleCalendarWrapper";

const TeacherPage = async () => {
  const { userId } = await auth();
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-lg font-semibold"> Schedule </h1>
          <ScheaduleCalendarWrapper type="teacherId" id={userId}></ScheaduleCalendarWrapper>
        </div>
      </div>

      <div className="w-full xl:w-1/3">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
