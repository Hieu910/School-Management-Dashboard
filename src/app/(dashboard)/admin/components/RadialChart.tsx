"use client"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Image from 'next/image';







const RadialChart = ({ boys, girls }: { boys: number; girls: number }) => {
 
  const data = [
   
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
  ];
  return (
   
        <div className='w-full h-[75%] relative'>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                            <Pie
                            data={data}
                            innerRadius={90}
                            outerRadius={120}
                            paddingAngle={2}
                    cx="50%"
            cy="50%"
                            cornerRadius={100}
                            dataKey="count"
                            >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill}/>
                            ))}
                            </Pie>
                </PieChart>
            </ResponsiveContainer>
            <Image src="/maleFemale.png" alt="" height={50} width={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></Image>
        </div>

     
  )
}

export default RadialChart