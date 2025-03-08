import UserCard from "./components/UserCard";
import FinanceChart from "./components/FinanceChart";
import EventCalender from "./components/EventCalendar";
import Announcements from "../../../components/Announcements";
import RadialChartWrapper from "./components/RadialChartWrapper";
import AttendanceChartWrapper from "./components/AttendanceChartWrapper";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row ">
          <div className="w-full lg:w-1/3 h-[450px]">
            <RadialChartWrapper />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartWrapper />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <EventCalender searchParams={searchParams}></EventCalender>
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
