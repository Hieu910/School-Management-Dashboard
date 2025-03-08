"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import AnnounceUpdateModal from "./components/AnnounceUpdateModal";

import AnnounceDeleteModal from "./components/AnnounceDeleteModal";
import AnnounceCreateModal from "./components/AnnounceCreateModal";
import { Announcement, Class, Prisma } from "@prisma/client";
import { useState,useEffect  } from "react";
import { getListAnnouncement } from "./services";

import { useUser } from "@clerk/nextjs";

type AnnouncementList = Announcement & { class: Class };



const AnnouncementListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

 
      const [announcementsData, setAnnouncementsData] = useState<any>([]);
            const [page, setPage] = useState(1)
            const [count, setCount] = useState(0)
            const [role, setRole] = useState<string | undefined>()
            const { user } = useUser()

            useEffect(()=>{
              let active =true
              try {
                  
                const role = user?.publicMetadata.role as string;
                setRole(role)
             
                 
                 getListAnnouncement({page,searchParams}).then((data)=>{
                     if(active){
                       setAnnouncementsData(data[0])
                       setCount(data[1])
                     }
                 })
                } catch (error) {
                  console.log(error);
                }
               return ()=>{
                 active = false
               }
            },[page,searchParams])
         

      const columns = [
        {
          header: "Title",
          accessor: "title",
        },
        {
          header: "Class",
          accessor: "class",
        },
        {
          header: "Date",
          accessor: "date",
          className: "hidden md:table-cell",
        },
        ...(role === "admin" ? [{
          header: "Actions",
          accessor: "action",
        }]: []) 
      ];
      

  const renderRow = (item: AnnouncementList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      
      <td>{item.title}</td>
      <td>{item.class?.name || "-"}</td>
      <td> {new Intl.DateTimeFormat("en-US").format(item.date)}</td>
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
              <AnnounceUpdateModal id={item.id} />
              <button
                className="btn btn-circle btn-sm hover:bg-cyberPurple bg-cyberPurple border-0"
                onClick={() => {
                  handleDeleteModal(item.id);
                }}
              >
                <Image src="/delete.png" alt="" width={16} height={16} />
              </button>
              <AnnounceDeleteModal id={item.id} />
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
        document.getElementById(`modal_create_announce`) as HTMLFormElement
      ).showModal();
    }
  };
  return (
    <div className="bg-white round-md flex-1 p-4 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-black">
          All announcements
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
                <AnnounceCreateModal/>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} renderRow={renderRow} data={announcementsData} />
      </div>
      <Pagination count={count} setPage={setPage}/>
    </div>
  );
};

export default AnnouncementListPage;
