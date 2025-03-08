
import EventCard from "./components/EventCard";
import ReactCalendar from "./components/ReactCalendar";

const EventCalendar =async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
    
  const { date } = searchParams;

    return (
      <div className='bg-white p-4 rounded-lg'>
            <ReactCalendar></ReactCalendar>
            <EventCard dateParam={date} ></EventCard>
      </div>
    );
}

export default EventCalendar