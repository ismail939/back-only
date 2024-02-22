import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar3, PlusLg, DashLg } from "react-bootstrap-icons";
import Calendar from 'react-calendar';
import PageNotFound from "../PageNotFound";
import 'react-calendar/dist/Calendar.css';
function TimeStamp({ booked, range, bookingRange, updateBookingRange }) {
    const [active, setActive] = useState(false)
    return (
        <div className={`rounded-3xl text-white w-full h-14 px-2 flex items-center justify-center font-semibold
        ${!booked ? `cursor-pointer duration-200 hover:bg-[#0F4C75] ${active ? "bg-[#197ec2] border-2 border-[#BBE1FA]" : "bg-[#1B262C]"}`
                : "bg-gray-500"}
        `}
            onClick={() => {
                setActive(!active);
                if (!active)
                    updateBookingRange([...bookingRange , range])
                else
                updateBookingRange(bookingRange.filter(item => item[0] !== range[0]))
            }}>
            <p>{range[0]}-{range[1]}</p>
        </div>
    )
}
function BookingRoom() {
    const params = useParams();
    const [found, setFound] = useState(false);
    const [room, setRoom] = useState([]);
    const [loading, setLodaing] = useState(true);
    const [date, setDate] = useState(new Date());
    const [showdate, setShowDate] = useState(false)
    const [timeRange, setTimeRange] = useState([]);
    const [numPerson, setNumPersons] = useState(3)
    const [bookingRange, setBookingRange] = useState([])
    const roomImageUrl = "http://localhost:4000/images/rooms/";
    const getRoom = () => {
        fetch(`http://localhost:4000/rooms/${params.cwID}/${params.roomid}`)
            .then(res => res.json())
            .then(responsedata => {
                setRoom(responsedata.data);
                if (responsedata.status === "error") { console.log("Sorry, there are no rooms"); setFound(false); }
                else if (responsedata.status === "fail") { console.log("Oops something went wrong !") };
            }
            ).catch(error => { console.log(error); });
    }
    function updateBookingRange(fields) {
        setBookingRange(fields)
    }

    const getWorkSpace = () => {
        fetch(`http://localhost:4000/cw_spaces/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "error") {
                    setFound(false);
                    setLodaing(false)
                } else if (responsedata.status === "success") {
                    let cwspace = responsedata.data;
                    setFound(true)
                    setLodaing(false)
                    getRoom();
                    setTimeRange(Array.from({ length: parseInt(cwspace.closingTime.slice(0, 2)) - parseInt(cwspace.openingTime.slice(0, 2)) + 1 }, (_, index) => parseInt(cwspace.openingTime.slice(0, 2)) + index));
                }
            }
            );
    }
    useEffect(() => {
        getWorkSpace();
    }, [])
    function onDateChange(date) {
        setDate(date)
    }
    if (found) {
        return (
            <div className="min-h-screen w-4/5 mx-auto mt-[70px]">
                <div className="flex md:flex-row flex-col gap-8">
                    <img className="md:w-1/2 h-[400px] object-cover" src={roomImageUrl + room.img}></img>
                    <div className="md:px-10">
                        <h2 className="text-4xl main-font">Room {room.number}</h2>
                        <h2 className="text-gray-400 mt-2 text-2xl font-medium ">{room.type} Room</h2>
                        <div className="mt-5 text-lg sec-font">
                            <p>Hour Price {room.hourPrice} L.E</p>
                            <p>Day Price {room.dayPrice} L.E</p>
                            <p>Room Size {room.minRoomSize}-{room.maxRoomSize} Persons</p>
                        </div>
                    </div>
                </div>
                <div className="mt-[50px]">
                    <div className="relative">
                        <div className="flex gap-5 items-center">
                            <Calendar3 className="text-[40px] my-2 cursor-pointer text-[#3282B8] hover:text-[#0F4C75] duration-200" onClick={() => setShowDate(!showdate)} />
                            <p className="text-xl font-bold">{date.toDateString()}</p>
                        </div>
                        <Calendar onChange={onDateChange} minDate={new Date()} value={date} className={showdate ? "absolute" : "hidden"} />
                    </div>
                    <div className="mt-4 flex gap-8 lg:flex-row flex-col">
                        <div className="lg:w-1/2 px-2 py-3 border rounded-md border-[#0F4C75] grid gap-4 grid-cols-5">
                            {timeRange.map((value, index) => {
                                if (index < timeRange.length - 1)
                                    if (value === 20 || value === 12)
                                        return <TimeStamp range={[value, value + 1]} booked={false} bookingRange={bookingRange} updateBookingRange={updateBookingRange} />
                                    else return <TimeStamp range={[value, value + 1]} booked={true} bookingRange={bookingRange} updateBookingRange={updateBookingRange} />
                            })}
                        </div>
                        <div className="lg:px-10 text-2xl main-font">
                            <div className="flex gap-4 items-center">Select Number of Persons:<div className="flex items-center gap-3">
                                <PlusLg className="cursor-pointer hover:text-[#3282B8] duration-200" onClick={() => { if (numPerson < parseInt(room.maxRoomSize)) setNumPersons(numPerson + 1) }} />
                                <p className="border border-[#1B262C] py-2 w-12 text-center">{numPerson}</p>
                                <DashLg className="cursor-pointer hover:text-[#3282B8] duration-200" onClick={() => { if (numPerson !== parseInt(room.minRoomSize)) setNumPersons(numPerson - 1) }} />
                            </div>
                            </div>
                            <p className="mt-4">{bookingRange.length > 0 ? `Total Cost: ${numPerson * room.hourPrice * bookingRange.length}  L.E` : "Total Cost: No time selected"}</p>
                            <button className="w-full mt-6 py-2 text-center btn-color text-white" onClick={() => console.log(bookingRange)}>{room.type === `Shared` ? "Request" : "Book"}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (!loading && !found) return (
        <>
            <PageNotFound />
        </>
    )
}

export default BookingRoom;