

const events = [
    {
      id: 1,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];
const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className="flex items-center justify-between">
            <h1 className='text-lg font-semibold'>Announcements</h1>
            <span className="text-sm">View All</span>
        </div>
        <div className="flex flex-col gap-4 mt-3">
                {
                    events.map((event)=>{
                        return (
                        <div key={event.id} className="rounded-md flex flex-col gap-1 p-3 odd:bg-cyberYellow even:bg-cyberPurple">
                            <div className="flex items-center justify-between">
                            <div className="tooltip" data-tip={event.title}>
                                <h2 className="font-semibold text-wrap text-left">{event.title}</h2>
                                </div>
                                    <span className="text-sm">{event.time}</span>
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