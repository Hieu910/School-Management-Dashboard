"use client";
import TableSearch from "@/components/TableSearch";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import ParentUpdateModal from "./components/ParentUpdateModal";
import { Parent,Prisma, Student } from "@prisma/client";
import ParentDeleteModal from "./components/ParentDeleteModal";
import ParentCreateModal from "./components/ParentCreateModal";
import { getListParent } from "./services";
import { useUser } from "@clerk/nextjs";

type ParentList = Parent & { students: Student[] };
const ParentListPage = ({ searchParams}:{searchParams: string | string[]| undefined}) => {

 const [parentsData, setParentsData] = useState<ParentList[]>([]);
   const [page, setPage] = useState(1)
   const [count, setCount] = useState(0)
   const [role, setRole] = useState<string | undefined>()
   const { user } = useUser()
   useEffect(()=>{
     let active =true
     try{
        const role = user?.publicMetadata.role as string;
        setRole(role)
        getListParent({page,searchParams}).then((data)=>{
            if(active){
              setParentsData(data[0])
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
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student Names",
      accessor: "students",
    
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

  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{item.name}</div>
            <div className="text-sm opacity-50">{item?.email}</div>
          </div>
        </div>
      </td>
      <td>{item.students.map(student=>student.name).join(",")}</td>
      <td>{item.phone}</td>
      <td>{item.address}</td>

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
              <ParentUpdateModal id={item.id} />
              <button
                className="btn btn-circle btn-sm hover:bg-cyberPurple bg-cyberPurple border-0"
                onClick={() => {
                  handleDeleteModal(item.id);
                }}
              >
                <Image src="/delete.png" alt="" width={16} height={16} />
              </button>
              <ParentDeleteModal id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  const handleDeleteModal = (id: number | string) => {
    if (document) {
      (
        document.getElementById(`modal_delete_${id}`) as HTMLFormElement
      ).showModal();
    }
  };
  const handleUpdateModal = (id: number | string) => {
    if (document) {
      (
        document.getElementById(`modal_update_${id}`) as HTMLFormElement
      ).showModal();
    }
  };
  const handleCreateModal = () => {
    if (document) {
      (
        document.getElementById(`modal_create_parent`) as HTMLFormElement
      ).showModal();
    }
  };
  return (
    <div className="bg-white round-md flex-1 p-4 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-black">
          All parents
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
                <ParentCreateModal/>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} renderRow={renderRow} data={parentsData} />
      </div>
      <Pagination  count={count} setPage={setPage}/>
    </div>
  );
};

export default ParentListPage;
