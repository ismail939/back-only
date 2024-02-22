import { useState, useEffect } from "react";
function BookingAndRequests() {
    const [rooms, setRooms] = useState([]);
    const [requests, setRequests] = useState([]);
    const getRequests = () => {
        fetch(`http://localhost:4000/requests/1`)
            .then(res => res.json())
            .then(responsedata => {
                setRequests(responsedata.data)
            })
    }
    useEffect(() => {
        getRequests();
    }, [])
    function SharedRoomCard(props) {
        const room = props.room;
        const user = props.user;
        const imageUrl = "http://localhost:4000/images/rooms/" + room?.image;

        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img className="h-48 w-full object-cover md:h-full md:w-64 hover:scale-110 duration-500" src={imageUrl} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize block font-semibold text-lg leading-tight font-medium text-black hover:text-[#3282B8] duration-300 sec-font">{`${room?.name}`}</h1>
                        <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{` `}</div>
                        <div>{`user ${user?.username}  requested ${user?.amount} people`}</div>
                        <button className="btn-color">Accept</button>
                        <button className="bg-red-500 hover:bg-red-300">Delete</button>
                    </div>
                </div>
            </div>
        )
    }
    function PrivateRoomCard(props) {
        const room = props.room;
        const user = props.user;
        const imageUrl = "http://localhost:4000/images/rooms/" + room?.image;

        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img className="h-48 w-full object-cover md:h-full md:w-64 hover:scale-110 duration-500" src={imageUrl} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize block font-semibold text-lg leading-tight font-medium text-black hover:text-[#3282B8] duration-300 sec-font">{`${room?.type}  ${room?.name}`}</h1>
                        <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{`total :${room?.total}`}</div>
                        <div>{`user ${user?.username} want booked this room for  ${user?.amount} people`}</div>
                    </div>
                </div>
            </div>
        )
    }
    const pending = requests?.filter(request => request.status === "pending");
    return (
        <>
            <div>
                <div className="w-3/4">
                    {bookings.map((roomi) => {
                        if (roomi.type === 'Shared') {
                            <SharedRoomCard props={roomi} />
                        }
                        else {
                            <PrivateRoomCard props={roomi} />
                        }
                    })}
                </div>
            </div>
        </>
    )
}
export default BookingAndRequests;