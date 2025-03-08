import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState

 } from 'react'
const TableSearch = () => {
  const [name, setName] = useState("");

  const router = useRouter() 
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
    console.log("sdsdsd")
      e.preventDefault()
      router.push(`${window.location.pathname}?search=${name}`)
  } 


  return (
            <form onSubmit={handleSubmit} className="w-full md:w-auto">
                <label className="input input-bordered bg-transparent flex items-center gap-3 rounded-full h-8">
                    <Image src="/search.png" alt="" height={14} width={14} />
                    <input onChange={(e) => setName(e.target.value)} type="text" className="grow text-sm" placeholder="Search from table..." />
                </label>
            </form>
  )
}

export default TableSearch