
import Image from 'next/image';
import RadialChart from './RadialChart'
import prisma from '@/lib/prisma';

const RadialChartWrapper = async () => {
    const data = await prisma.student.groupBy({
        by: ["sex"],
        _count: true,
      });
    
      const boys = data.find((d) => d.sex === "MALE")?._count || 0;
      const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;
  return (
     <div className='bg-white rounded-xl w-full h-full p-4 overflow-hidden'>
            <div className="flex justify-between items-center">
                <h1 className="font-semiBold text-lg"> Students </h1>
                <Image src="/moreDark.png" alt="" height={20} width={20}></Image>
            </div>

            <RadialChart boys={boys} girls={girls}></RadialChart>
            <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 rounded-full bg-cyberSky'></div>
                <h1 className="font-bold">{boys}</h1>
                <h2 className=''>  Boys ({Math.round((boys / (boys + girls)) * 100)}%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 rounded-full bg-cyberYellow'></div>
                <h1 className="font-bold">{girls}</h1>
                <h2 className=''>  Girls ({Math.round((girls / (boys + girls)) * 100)}%)</h2>
            </div>
      </div>
    </div>
  )
}

export default RadialChartWrapper