import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
    const user = await currentUser()
      const role = user?.publicMetadata.role as string
  return (
    <div className='flex items-center justify-between p-4'>
        <div className="hidden md:flex">
            <label className="input input-bordered bg-transparent flex items-center gap-3 rounded-full h-10">
                <Image src="/search.png" alt="" height={14} width={14} />
                <input type="text" className="grow" placeholder="Search..." />
            </label>
        </div>

            <div className='flex gap-5 items-center justify-end grow'>
                <div className="relative">
                <button className="btn btn-circle btn-sm ">
                    <Image src="/message.png" alt="" height={20} width={20} />
                </button>
                <span className="absolute -top-0.5 -right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-purple-500 p-1 text-xs text-white">
                    5
                </span> 
                </div>
            <button className="btn btn-circle btn-sm ">
                <Image src="/announcement.png" alt="" height={20} width={20} />
            </button>
            <div className='flex flex-col self-stretch'>
                <span className='text-sm leading-3 font-medium mb-auto'>Primus</span>
                <span className='text-xs text-right text-gray-600'>{role}</span>
            </div>
            <div className="avatar">
                <UserButton/>
                {/* <div className="w-9 rounded-full">
                    <Image src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" width={36} height={36}  />
                </div> */}
            </div>
            </div>
    </div>
  )
}

export default Navbar