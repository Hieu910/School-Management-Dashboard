"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import AssignmentUpdateModal from "./components/AssignmentUpdateModal";
import AssignmentDeleteModal from "./components/AssignmentDeleteModal";
import AssignmentCreateModal from "./components/AssignmentCreateModal";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import { useState, useEffect } from "react";
import { getListAssignment } from "./services";
import { useUser } from "@clerk/nextjs";


type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const AssignmentListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

    
      const [assignmentsData, setAssignmentsData] = useState<any>([]);
      const [page, setPage] = useState(1)
      const [count, setCount] = useState(0)
      const [role, setRole] = useState<string | undefined>()
      const { user } = useUser()
      
      useEffect(()=>{
          let active = true;
          try {
            const role = user?.publicMetadata.role as string;
            setRole(role)
            getListAssignment({page,searchParams}).then((data) => {
              if (active) {
                setAssignmentsData(data[0]);
                setCount(data[1])
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
          header: "Class",
          accessor: "class",
        },
        {
          header: "Teacher",
          accessor: "teacher",
          className: "hidden md:table-cell",
        },
        {
          header: "Due Date",
          accessor: "dueDate",
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

     
    

  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td>{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td>
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td>{new Intl.DateTimeFormat("en-US").format(item.dueDate)}</td>
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
              <AssignmentUpdateModal id={item.id} />
              <button
                className="btn btn-circle btn-sm hover:bg-cyberPurple bg-cyberPurple border-0"
                onClick={() => {
                  handleDeleteModal(item.id);
                }}
              >
                <Image src="/delete.png" alt="" width={16} height={16} />
              </button>
              <AssignmentDeleteModal id={item.id} />
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
        document.getElementById(`modal_create_assignment`) as HTMLFormElement
      ).showModal();
    }
  };
  return (
    <div className="bg-white round-md flex-1 p-4 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-black">
          All assignments
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
                <AssignmentCreateModal/>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} renderRow={renderRow} data={assignmentsData} />
      </div>
      <Pagination count={count} setPage={setPage} />
    </div>
  );
};

export default AssignmentListPage;
