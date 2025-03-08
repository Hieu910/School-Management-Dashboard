"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import ResultUpdateModal from "./components/ResultUpdateModal";
import ResultDeleteModal from "./components/ResultDeleteModal";
import ResultCreateModal from "./components/ResultCreateModal";
import { useState,useEffect } from "react";
import { getListResult } from "./services";
import { useUser } from "@clerk/nextjs";

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};
const ResultListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

       const [resultsData, setResultsData] = useState<any>([]);
          const [page, setPage] = useState(1)
          const [count, setCount] = useState(0)
           const [role, setRole] = useState<string | undefined>()
             const { user } = useUser()

         useEffect(()=>{
                  let active = true;
                  try {
                    const role = user?.publicMetadata.role as string;
                    setRole(role)
                    getListResult({page,searchParams}).then((res) => {
                      if (active) {
                        
                        const [dataRes, count] = res
                        const data = dataRes.map((item) => {
                          const assessment = item.exam || item.assignment;
                      
                          if (!assessment) return null;
                      
                          const isExam = "startTime" in assessment;
                      
                          return {
                            id: item.id,
                            title: assessment.title,
                            studentName: item.student.name,
                            studentSurname: item.student.surname,
                            teacherName: assessment.lesson.teacher.name,
                            teacherSurname: assessment.lesson.teacher.surname,
                            score: item.score,
                            className: assessment.lesson.class.name,
                            startTime: isExam ? assessment.startTime : assessment.startDate,
                          };
                        });
                      
                        setResultsData(data);
                        setCount(count)
                      }
                    });
                  } catch (error) {
                    console.log(error);
                  }
                  return () => {
                    active = false;
                  };
                },[page,searchParams])


      const columns = [
        {
          header: "Subject Name",
          accessor: "name",
        },
        {
          header: "Student",
          accessor: "student",
        },
        {
          header: "Score",
          accessor: "score",
          className: "hidden md:table-cell",
        },
        {
          header: "Teacher",
          accessor: "teacher",
          className: "hidden md:table-cell",
        },
        {
          header: "Class",
          accessor: "class",
          className: "hidden md:table-cell",
        },
        {
          header: "Date",
          accessor: "date",
          className: "hidden md:table-cell",
        },
        ...(role === "admin" || role === "teacher"
          ? [
              {
                header: "Actions",
                accessor: "action",
              },
            ]
          : []),
      ];
      

  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      
      <td>{item.title}</td>
      <td>{item.studentName + " " + item.studentName}</td>
      <td>{item.score}</td>
      <td> {item.teacherName + " " + item.teacherSurname}</td>
      <td>{item.className}</td>
      <td>  {new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
      <td>
        <div className="flex items-center gap-2">
        
          {(role === "admin" || role === "teacher") && (
            <>
              <button
                className="btn btn-circle btn-sm hover:bg-cyberPurple bg-cyberPurple border-0"
                onClick={() => {
                  handleUpdateModal(item.id);
                }}
              >
                <Image src="/edit.png" alt="" width={16} height={16} />
              </button>
              <ResultUpdateModal id={item.id} />
              <button
                className="btn btn-circle btn-sm hover:bg-cyberPurple bg-cyberPurple border-0"
                onClick={() => {
                  handleDeleteModal(item.id);
                }}
              >
                <Image src="/delete.png" alt="" width={16} height={16} />
              </button>
              <ResultDeleteModal id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  const handleDeleteModal = (id: number) => {
    if (document) {
      (
        document.getElementById(`modal_delete_${id}`) as HTMLFormElement
      ).showModal();
    }
  };
  const handleUpdateModal = (id: number) => {
    if (document) {
      (
        document.getElementById(`modal_update_${id}`) as HTMLFormElement
      ).showModal();
    }
  };
  const handleCreateModal = () => {
    if (document) {
      (
        document.getElementById(`modal_create_result`) as HTMLFormElement
      ).showModal();
    }
  };
  return (
    <div className="bg-white round-md flex-1 p-4 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-black">
          All results
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="bg-cyberYellow w-8 h-8 rounded-full flex-center">
              <Image src="/filter.png" alt="" width={14} height={14}></Image>
            </button>
            <button className="bg-cyberYellow w-8 h-8 rounded-full flex-center">
              <Image src="/sort.png" alt="" width={14} height={14}></Image>
            </button>

            {(role === "admin" || role === "teacher") && (
              <>
                <button
                  className="bg-cyberYellow w-8 h-8 rounded-full flex-center"
                  onClick={handleCreateModal}
                >
                  <Image src="/plus.png" alt="" width={14} height={14}></Image>
                </button>
                <ResultCreateModal/>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} renderRow={renderRow} data={resultsData} />
      </div>
      <Pagination count={count} setPage={setPage}/>
    </div>
  );
};

export default ResultListPage;
