import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar3 , PlusLg, DashLg } from "react-bootstrap-icons";
import Calendar from 'react-calendar';
import PageNotFound from "../PageNotFound";
import 'react-calendar/dist/Calendar.css';
function TimeStamp(props) {
    const range = props.range;
    return (
        <div className="rounded-3xl bg-[#1B262C] text-white w-full h-14 px-2 flex items-center justify-center font-semibold">
            <p>{range[0]}-{range[1]}</p>
        </div>
    )
}
function SharedRoom(){
    return(
        <>
            
        </>
    )
}
export default SharedRoom();