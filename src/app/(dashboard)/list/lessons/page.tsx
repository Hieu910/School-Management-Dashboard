"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";

import LessonUpdateModal from "./components/LessonUpdateModal";
import LessonDeleteModal from "./components/LessonDeleteModal";
import LessonCreateModal from "./components/LessonCreateModal";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import { useState, useEffect } from "react";
import { getListLesson } from "./services";
import { useUser } from "@clerk/nextjs";

type LessonList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};


const LessonListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
      const [lessonsData, setLessonsData] = useState<any>([]);
       const [page, setPage] = useState(1)
       const [count, setCount] = useState(0)
       const [role, setRole] = useState<string | undefined>()
       const { user } = useUser()
        useEffect(()=>{
            let active = true
            try{
              const role = user?.publicMetadata.role as string;
              setRole(role)
            getListLesson({page,searchParams}).then((data)=>{
                if(active){
                  setLessonsData(data[0])
                  setCount(data[1])
                }
            })
          }
          catch(error){
            console.log(error)
          }
    
          return ()=>{
            active = false
          }
        },[page,searchParams])
      
      const columns = [
        {
          header: "Subject Name",
          accessor: "name",
        },
        {
          header: "Class",
          accessor: "class",
        },
        {
          header: "Teacher",
          accessor: "teacher",
          className: "hidden md:table-cell",
        },
        ...(role === "admin"
          ? [
              {
                header: "Actions",
                accessor: "action",
              },
            ]
          : []),
      ];
      

  const renderRow = (item: LessonList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td>{item.subject.name}</td>
      <td>{item.class.name}</td>
      <td> {item.teacher.name + " " + item.teacher.surname}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <button
                className="btn btn-circle btn-sm hover:bg-cyberPurple bg-cyberPurple border-0"
                onClick={() => {
                  handleUpdateModal(item.id);
                }}
              >
                <Image src="/edit.png" alt="" width={16} height={16} />
              </button>
              <LessonUpdateModal id={item.id} />
              <button
                className="btn btn-circle btn-sm hover:bg-cyberPurple bg-cyberPurple border-0"
                onClick={() => {
                  handleDeleteModal(item.id);
                }}
              >
                <Image src="/delete.png" alt="" width={16} height={16} />
              </button>
              <LessonDeleteModal id={item.id} />
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
        document.getElementById(`modal_create_lesson`) as HTMLFormElement
      ).showModal();
    }
  };
  return (
    <div className="bg-white round-md flex-1 p-4 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-black">
          All lessons
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

            {role === "admin" && (
              <>
                <button
                  className="bg-cyberYellow w-8 h-8 rounded-full flex-center"
                  onClick={handleCreateModal}
                >
                  <Image src="/plus.png" alt="" width={14} height={14}></Image>
                </button>
                <LessonCreateModal />
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} renderRow={renderRow} data={lessonsData} />
      </div>
      <Pagination setPage={setPage} count={count} />
    </div>
  );
};

export default LessonListPage;
