"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import StudentDeleteModal from "./components/StudentDeleteModal";
import StudentCreateModal from "./components/StudentCreateModal";
import Link from "next/link";

import { useState, useEffect } from "react";

import { Class, Prisma, Student } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { getStudentList } from "./services";
type StudentList = Student & { class: Class };



const StudentListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {


  const [studentsData, setStudentsData] = useState<StudentList[]>([]);
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [role, setRole] = useState<string | undefined>()
  const { user } = useUser()

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
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
  
  useEffect(()=>{
    let active = true;
    try {
      const role = user?.publicMetadata.role as string;
      setRole(role)
      getStudentList({page,searchParams}).then((data) => {
        if (active) {
          setStudentsData(data[0]);
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

  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-10 w-10">
              <Image width={40} height={40} src={item.img || "/noAvatar.png"} alt="" />
            </div>
          </div>
          <div>
            <div className="font-bold">{item.name}</div>
            <div className="text-sm opacity-50">{item.class.name}</div>
          </div>
        </div>
      </td>
      <td>{item.username}</td>
      <td>{item.class.name[0]}</td>
      <td>{item.phone}</td>
      <td>{item.address}</td>

      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className=" btn btn-circle btn-sm hover:bg-cyberSky bg-cyberSky border-0">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <>
              <button
                className="btn btn-circle btn-sm hover:bg-cyberPurple bg-cyberPurple border-0"
                onClick={() => {
                  handleDeleteModal(item.id);
                }}
              >
                <Image src="/delete.png" alt="" width={16} height={16} />
              </button>
              <StudentDeleteModal id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const handleDeleteModal = (id: number| string) => {
    if (document) {
      (
        document.getElementById(`modal_delete_${id}`) as HTMLFormElement
      ).showModal();
    }
  };
  const handleCreateModal = () => {
    if (document) {
      (
        document.getElementById(`modal_create_student`) as HTMLFormElement
      ).showModal();
    }
  };
  return (
    <div className="bg-white round-md flex-1 p-4 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-black">
          All students
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
                <StudentCreateModal />
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} renderRow={renderRow} data={studentsData} />
      </div>
      <Pagination count={count} setPage={setPage}/>
    </div>
  );
};

export default StudentListPage;
