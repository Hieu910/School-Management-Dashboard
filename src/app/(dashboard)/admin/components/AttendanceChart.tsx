"use client"

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AttendanceChart = ({data}:{ data: { name: string; present: number; absent: number }[];}) => {
  return (
  
      
      <ResponsiveContainer width="100%" height="90%">
            <BarChart
              width={500}
              height={300}
              barSize={20}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd"/>
              <XAxis dataKey="name" axisLine={false} tick={{fill:"#333"}} tickLine={false}/>
              <YAxis axisLine={false} tick={{fill:"#333"}} tickLine={false}/>
              <Tooltip 
              labelStyle={{ color: "white"}}
                  contentStyle={{borderRadius:"10px", borderColor:"lightgray", background:"rgba(0,0,0,0.4)" }}
                  // formatter={(value, entry, index) => <span className="text-gray-300">{value}</span>}
              />
              <Legend 
                  
                  formatter={(value, entry, index) => <span className="text-gray-700">{value}</span>}
                  align='left'  verticalAlign='top' wrapperStyle={{paddingTop: "10px", paddingBottom:"30px" }}  /> 

              <Bar dataKey="present" radius={10} legendType='circle' fill="#fae27c"  />
              <Bar dataKey="absent" radius={10}  legendType='circle' fill="#c3ebfa" />
            </BarChart>
          </ResponsiveContainer>
          
 
  )
}

export default AttendanceChart