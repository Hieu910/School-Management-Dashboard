"use client";
import TableSearch from "@/components/TableSearch";
import { useEffect, useState } from "react";
import Image from "next/image";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TeacherDeleteModal from "./components/TeacherDeleteModal";
import TeacherCreateModal from "./components/TeacherCreateModal";
import Link from "next/link";
import { Class, Subject, Teacher } from "@prisma/client";
import { getTeacherList } from "./services";
import { useUser } from "@clerk/nextjs";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };


const TeacherListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const [teachersData, setTeachersData] = useState<TeacherList[]>([]);
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
      header: "Teacher ID",
      accessor: "teacherId",
    },
    {
      header: "Subjects",
      accessor: "subjects",
    },
    {
      header: "Classes",
      accessor: "classes",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Address",
      accessor: "address",
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

  useEffect(() => {
    let active = true;
    try {
      const role = user?.publicMetadata.role as string;
      setRole(role)
      getTeacherList({page,searchParams}).then((data) => {
        if (active) {
          setTeachersData(data[0]);
          setCount(data[1])
        }
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      active = false;
    };
  }, [page,searchParams]);

  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-10 w-10">
              <Image
                width={40}
                height={40}
                src={item.img || "/noAvatar.png"}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{item.name}</div>
            <div className="text-sm opacity-50">{item?.email}</div>
          </div>
        </div>
      </td>
      <td>{item.username}</td>
      <td>
        {item.subjects
          .map((subject) => {
            return subject.name;
          })
          .join(",")}
      </td>
      <td>
        {item.classes
          .map((item) => {
            return item.name;
          })
          .join(",")}
      </td>
      <td>{item.phone}</td>
      <td>{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
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
              <TeacherDeleteModal id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const handleDeleteModal = (id: string) => {
    if (document) {
      (
        document.getElementById(`modal_delete_${id}`) as HTMLFormElement
      ).showModal();
    }
  };
  const handleCreateModal = () => {
    if (document) {
      (
        document.getElementById(`modal_create_teacher`) as HTMLFormElement
      ).showModal();
    }
  };

  return (
    <div className="bg-white round-md flex-1 p-4 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-black">
          All teachers
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
                <TeacherCreateModal />
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} renderRow={renderRow} data={teachersData} />
      </div>
      
        <Pagination count={count} setPage={setPage}/>
    
    </div>
  );
};

export default TeacherListPage;
