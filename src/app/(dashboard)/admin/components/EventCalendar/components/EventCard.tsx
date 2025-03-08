
import Image from "next/image";
import prisma from "@/lib/prisma";

const EventCard = async ({ dateParam }: { dateParam: string | undefined }) => {

  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
  return (
    <>
   <div className='flex justify-between items-center'>
             <h1 className='text-lg font-semibold my-3'>Events</h1>
             <Image src="/moreDark.png" alt="" height={20} width={20}></Image>
    </div>
    <div className="flex flex-col gap-4">
      {
          data.map((event)=>{
            return (
              <div key={event.id} className="rounded-md flex flex-col gap-1 p-3 odd:bg-cyberSky even:bg-cyberPurple">
                  <div className="flex items-center justify-between">
                   <div className="tooltip" data-tip={event.title}>
                      <h2 className="font-semibold text-wrap text-left">{event.title}</h2>
                    </div>
                        <span className="text-sm">{event.startTime.toLocaleTimeString("en-UK", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}</span>
                  </div>
                  <p className="text-sm">{event.description} </p>
              </div>
            )
          })
      }
    
    </div>
    </>
  )
}

export default EventCard