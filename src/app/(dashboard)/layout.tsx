import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";


const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
     <div className="h-screen flex">
        <div className="w-[14%] md:w[8%] lg:w-[16%] xl:w-[14%] py-4 max-h-lvh overflow-y-scroll hide-scrollbar">
            <Link href="/" className="flex-center lg:justify-start px-2 gap-2">
                <Image src="/logo.png" alt="logo" height={32} width={32}></Image>
                <span className="hidden font-bold lg:block">CyberTron</span>
            </Link>
            <Menu></Menu>
        </div>
        <div className="w-[86%] md:w[92%] lg:w-[84%] xl:w-[86%] bg-gray-100 overflow-scroll flex flex-col">
            <Navbar/>
            {children}
        </div>
     </div>
    );
  }

export default DashboardLayout