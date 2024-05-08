import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar3, PlusLg, DashLg, PeopleFill, ClockFill, InfoCircleFill, Calendar2EventFill } from "react-bootstrap-icons";
import Calendar from 'react-calendar';
import PageNotFound from "../PageNotFound";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setPayData } from "../../components/reduxtoolkit/Slices/paySlice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-calendar/dist/Calendar.css';
function TimeStamp({ date, booked, range, bookingRange, updateBookingRange }) {
    const [active, setActive] = useState(false)
    useEffect(() => {
        setActive(false)
    }, [date])
    return (
        <div className={`rounded-3xl text-white w-full h-14 px-2 flex items-center justify-center font-semibold
        ${!booked ? `cursor-pointer duration-200 hover:bg-[#0F4C75] ${active ? "bg-[#197ec2] border-2 border-[#BBE1FA]" : "bg-[#1B262C]"}`
                : "bg-gray-500"}
        `}
            onClick={() => {
                if (!booked) setActive(!active);
                if (!active && !booked)
                    updateBookingRange([...bookingRange, range])
                else
                    updateBookingRange(bookingRange.filter(item => item[0] !== range[0]))
            }}>
            <p>{range[0]}-{range[1]}</p>
        </div>
    )
}
function SuccessMessage({ showsuccess, room, numPerson, cost, bookingRange, closeSuccessMessage, date }) {
    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center bg-black/[.2] z-100 duration-300">
            <div className="bg-white shadow rounded-md p-3 md:w-[500px] w-3/4 duration-800">
                <img className="w-full h-[200px] object-cover" src={ room.img}></img>
                <div className="mt-5">
                    {room.type === "Shared" ? <><h2 className="main-font text-xl">Request Created Successfully</h2>
                        <p className="text-md my-2">Your Request has been submitted and sent to the owner, the response will appear in your profile page.</p>
                        <div className="flex items-center gap-4 text-lg main-font">
                            <PeopleFill />
                            <p>{numPerson} Persons</p>
                        </div>
                        <div className="flex items-center gap-4 text-lg main-font">
                            <ClockFill />
                            <p>Cost of one hour: {cost} L.E</p>
                        </div>
                    </> : <>
                        <h2 className="main-font text-xl mb-2">Room Booked Successfully</h2>
                        <p className="text-md my-2">Thanks for your booking, you can find all your bookings in your profile page.</p>
                        <div className="flex items-center gap-4 text-lg main-font my-1 text-[#0F4C75]">
                            <PeopleFill />
                            <p>{numPerson} Persons</p>
                        </div>
                        <div className="flex items-center gap-4 text-lg main-font my-1 text-[#0F4C75]">
                            <Calendar2EventFill />
                            <p>{date.toDateString()}</p>
                        </div>
                        <div className="flex items-center gap-4 text-lg main-font my-1 text-[#0F4C75]">
                            <ClockFill />
                            <p>From {bookingRange[0][0]} to {bookingRange[bookingRange.length - 1][1]}</p>
                        </div>
                        <h2 className="main-font text-2xl mt-4">Total Cost is {cost} L.E</h2>
                    </>}
                    <hr className="border-black"></hr>
                    <button className="btn-color px-6 py-1 mt-2 float-right rounded-sm" onClick={() => closeSuccessMessage()}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
function FailedMessage({ room, failMessage, closeFailMessage }) {
    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center bg-black/[.2] z-100">
            <div className="bg-white shadow rounded-md p-3 sm:w-[400px] w-3/4 text-center">
                <div className="flex flex-col items-center px-4">
                    <h2 className="text-2xl main-font">{room.type === `Shared` ? "Request" : "Booking"} Failed</h2>
                    <p className="text-lg text-gray-500 my-1">Please try again</p>
                    <div className="text-[50px] text-red-500 my-4">
                        <InfoCircleFill />
                    </div>
                    <p className="my-2">{failMessage}</p>
                    <button className="btn-color p-2 mt-2 w-full" onClick={() => closeFailMessage()}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}
function BookingRoom() {
    const params = useParams();
    const [found, setFound] = useState(false);
    const [room, setRoom] = useState([]);
    const [loading, setLodaing] = useState(true);
    const [date, setDate] = useState(new Date());
    const [showCal, setShowCal] = useState(false)
    const [timeRange, setTimeRange] = useState([]);
    const [numPerson, setNumPersons] = useState(3)
    const [bookedTimes, setBookesTimes] = useState([])
    const [bookingRange, setBookingRange] = useState([])
    const [showsuccess, setShowSuccess] = useState(false)
    const [showFail, setShowFail] = useState(false)
    const [failMessage, setFailMessage] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.auth);
    const token = user.token;
    const usertype = user.usertype;
    const profileData = jwtDecode(token);
    const getRoom = () => {
        fetch(`http://localhost:4000/rooms/${params.cwID}/${params.roomid}`)
            .then(res => res.json())
            .then(responsedata => {
                setRoom(responsedata.data);
                setNumPersons(responsedata.data.minRoomSize)
                if (responsedata.status === "error") { console.log("Sorry, there are no rooms"); setFound(false); }
                else if (responsedata.status === "fail") { console.log("Oops something went wrong !") }
                else if (responsedata.status === "success") {
                    setFound(true)
                    setLodaing(false)
                }
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
                    getRoom();
                    setTimeRange(Array.from({ length: parseInt(cwspace.closingTime.slice(0, 2)) - parseInt(cwspace.openingTime.slice(0, 2)) + 1 }, (_, index) => parseInt(cwspace.openingTime.slice(0, 2)) + index));
                }
            }
            ).catch();
    }
    function getBookedTimes(selectedDate) {
        fetch(`http://localhost:4000/books/roomof/${params.roomid}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "date": convertDate(selectedDate),
            }),
        }).then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "error") {
                } else if (responsedata.status === "success") {
                    setBookesTimes(responsedata.data)
                }
            }
            ).catch();
    }
    function isContinous() {
        if (bookingRange.length === 0) return false
        else {
            let sortedBookingRange = bookingRange;
            sortedBookingRange.sort((a, b) => a[0] - b[0])
            for (let i = 0; i < sortedBookingRange.length - 1; i++) {
                if (sortedBookingRange[i][1] !== bookingRange[i + 1][0]) {
                    return false
                }
            }
        }
        return true;
    }
    function convertDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        // Format the date as "YYYY-MM-DD"
        return `${year}-${month}-${day}`;
    }
    function createBook() {
        let sortedBookingRange = bookingRange;
        sortedBookingRange.sort((a, b) => a[0] - b[0])
        setBookingRange(sortedBookingRange)
        if (bookingRange.length === 0) {
            setFailMessage("Please choose your desired time before booking")
            setShowFail(true)
        } else if (!isContinous()) {
            setFailMessage("You cannot book seperate time ranges, booking time must be continous")
            setShowFail(true)
        } else {
            dispatch(setPayData({bookingTime:[
                sortedBookingRange[0][0], sortedBookingRange[bookingRange.length - 1][1]
            ] ,
                totalPrice:numPerson * room.hourPrice * bookingRange.length ,
                date:convertDate(date) ,
                type:"room",
                roomid: params.roomid}
            ))
            navigate("/payment")
        }
    }
    function createRequest() {
        fetch(`http://localhost:4000/requests`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "clientClientID": profileData.clientID,
                "roomRoomID": params.roomid,
                "numberOfPersons": numPerson
            })
        }).then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "error" || responsedata.status === "fail") {
                    setFailMessage("Sorry we cannot proceed with your request")
                    setShowFail(true)
                } else if (responsedata.status === "success") {
                    setShowSuccess(true)
                }
            }
            ).catch()
    }
    function closeSuccessMessage() {
        setShowSuccess(false);
        window.location.reload();
    }
    function closeFailMessage() {
        setShowFail(false)
    }
    useEffect(() => {
        getWorkSpace();
        getBookedTimes(new Date())
    }, [])
    function onDateChange(selectedDate) {
        setDate(selectedDate)
        setBookingRange([])
        getBookedTimes(selectedDate)
    }
    function isBooked(hour) {
        let currentDate = new Date()
        let currentHour = currentDate.getHours();
        if (date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
            if (hour <= currentHour + 1) return true;
        }
        if (bookedTimes.length === 0) return false
        else {
            for (let i = 0; i < bookedTimes.length; i++) {
                if (hour === bookedTimes[i][0]) {
                    return true
                }
            }
        }
        return false;
    }
    if (found) {
        return (
            <div className="min-h-screen w-4/5 mx-auto mt-[70px]">
                <div className="flex md:flex-row flex-col gap-8">
                    <img className="md:w-1/2 h-[400px] object-cover" src={ room.img} alt={room.type + "room" + room.number}></img>
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
                    {room.type === `Private` && <div className="relative">
                        <div className="flex gap-5 items-center">
                            <Calendar3 className="text-[40px] my-2 cursor-pointer text-[#3282B8] hover:text-[#0F4C75] duration-200" onClick={() => setShowCal(!showCal)} />
                            <p className="text-xl font-bold">{date.toDateString()}</p>
                        </div>
                        <Calendar onChange={onDateChange} minDate={new Date()} value={date} className={showCal ? "absolute" : "hidden"} />
                    </div>}
                    <div className="mt-4 flex gap-8 lg:flex-row flex-col">
                        {room.type === `Private` ? <div className="lg:w-1/2 px-2 py-3 border rounded-md border-[#0F4C75] grid gap-4 sm:grid-cols-5 grid-cols-3">
                            {timeRange.map((value, index) => {
                                if (index < timeRange.length - 1)
                                    return <TimeStamp date={date} range={[value, value + 1]} booked={isBooked(value)} bookingRange={bookingRange} updateBookingRange={updateBookingRange} key={index} />
                            })}
                        </div> :
                            <div className="lg:w-1/2 px-2 py-3 text-xl main-font">
                                <span className="text-gray-400">Note:<br></br></span>
                                Please select the number of persons before requesting a place in the room.
                            </div>}
                        <div className="lg:px-10 text-2xl main-font">
                            <div className="flex gap-4 items-center">Select Number of Persons:<div className="flex items-center gap-3">
                                <PlusLg className="cursor-pointer hover:text-[#3282B8] duration-200" onClick={() => { if (numPerson < parseInt(room.maxRoomSize)) setNumPersons(numPerson + 1) }} />
                                <p className="border border-[#1B262C] py-2 w-12 text-center">{numPerson}</p>
                                <DashLg className="cursor-pointer hover:text-[#3282B8] duration-200" onClick={() => { if (numPerson > parseInt(room.minRoomSize)) setNumPersons(numPerson - 1) }} />
                            </div>
                            </div>
                            <p className="mt-4">Total Cost: {room.type === `Private` ? bookingRange.length > 0 ? `${numPerson * room.hourPrice * bookingRange.length}  L.E` : "No time selected" : `${numPerson * room.hourPrice}  L.E/hr`}</p>
                            <button className="w-full mt-6 py-2 text-center btn-color text-white" onClick={() => {
                                if (room.type === `Private`) {
                                    createBook();
                                } else if (room.type === `Shared`) {
                                    createRequest();
                                }
                            }}>{room.type === `Shared` ? "Request" : "Book"}</button>
                        </div>
                        {showsuccess && room.type === `Shared` && <SuccessMessage showsuccess={showsuccess} room={room} numPerson={numPerson} cost={numPerson * room.hourPrice} closeSuccessMessage={closeSuccessMessage} />}
                        {showsuccess && room.type === `Private` && <SuccessMessage date={date} room={room} numPerson={numPerson} cost={numPerson * room.hourPrice * bookingRange.length} bookingRange={bookingRange} closeSuccessMessage={closeSuccessMessage} />}
                        {showFail && <FailedMessage room={room} failMessage={failMessage} closeFailMessage={closeFailMessage} />}
                    </div>
                </div>
            </div>
        )
    } else if (loading && !found) {
        return (
            <div className="min-h-screen w-4/5 mx-auto mt-[70px]">
                <div className="flex md:flex-row flex-col">
                    <div className="md:w-1/2 w-full">
                        <Skeleton className="h-[400px]" />
                    </div>
                    <div className="md:px-10 w-[300px] mt-10">
                        <Skeleton />
                        <Skeleton className="mt-4" count={4} />
                    </div>
                </div>
            </div>
        )
    } else if (!loading && !found) {
        return (
            <>
                <PageNotFound />
            </>
        )
    }
}

export default BookingRoom;