"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar  from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];




const ReactCalendar = () => {
    const [value, onDateChange] = useState<Value>(new Date());
    const router = useRouter()

    useEffect(()=>{
        if(value instanceof Date){
            router.push(`?date=${value}`)
        }
    },[value,router])

    return (
   
        <Calendar onChange={onDateChange} value={value} />
     
    );
}

export default ReactCalendar