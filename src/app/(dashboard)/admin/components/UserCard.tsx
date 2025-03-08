import prisma from "@/lib/prisma"
import Image from "next/image"
const UserCard =async ({type}:{type:"admin" | 'teacher' | 'student' | "parent"}) => {

  const data:Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent
  }


  const count = await data[type].count();

  return (
    <div className="rounded-2xl odd:bg-cyberPurple even:bg-cyberYellow p-4 grow min-w-[150px]">
        <div className="flex justify-between items-center">

        <span className="bg-white px-2 py-1 rounded-full text-xs text-green-600"> 2024/25 </span>
         <Image src="/more.png" alt="" height={20} width={20}></Image>
        </div>
        <h1 className="text-2xl font-semibold my-3">{count}</h1>
        <h2 className="capitalize" >{type}</h2>
    </div>
  )
}

export default UserCard