import prisma from "@/lib/prisma";
import ScheaduleCalendar from "./ScheaduleCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const ScheaduleCalendarWrapper =  async ({
    type,
    id,
  }: {
    type: "teacherId" | "classId";
    id: string | number | null;
  }) => {
    const dataRes = await prisma.lesson.findMany({
      where: {
        ...(type === "teacherId"
          ? { teacherId: id as string }
          : { classId: id as number }),
      },
    });
  
    const data = dataRes.map((lesson) => ({
      title: lesson.name,
      start: lesson.startTime,
      end: lesson.endTime,
    }));
  
    const schedule = adjustScheduleToCurrentWeek(data);
  
    return (
      <div className="">
        <ScheaduleCalendar data={schedule} />
      </div>
    );
  };

export default ScheaduleCalendarWrapper