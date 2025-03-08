import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


const Announcements =async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className='bg-white p-4 rounded-md'>
        <div className="flex items-center justify-between">
            <h1 className='text-lg font-semibold'>Announcements</h1>
            <span className="text-sm">View All</span>
        </div>
        <div className="flex flex-col gap-4 mt-3">
                {
                    data.map((event:any)=>{
                        return (
                        <div key={event.id} className="rounded-md flex flex-col gap-1 p-3 odd:bg-cyberYellow even:bg-cyberPurple">
                            <div className="flex items-center justify-between">
                            <div className="tooltip" data-tip={event.title}>
                                <h2 className="font-semibold text-wrap text-left">{event.title}</h2>
                                </div>
                                    <span className="text-sm">{new Intl.DateTimeFormat("en-GB").format(event.date)}</span>
                            </div>
                            <p className="text-sm">{event.description} </p>
                        </div>
                        )
                    })
                }
        </div>
    </div>
  )
}

export default Announcements