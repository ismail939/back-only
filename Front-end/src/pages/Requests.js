import { useState, useEffect } from "react";
function Requests() {
    const [requests, setRequests] = useState([]);
    const getRequests = () => {
        fetch(`http://localhost:4000/requests/8`)
            .then(res => res.json())
            .then(responsedata => {
                setRequests(responsedata.data)
                console.log(responsedata.data)
            })
    }
    useEffect(() => {
        getRequests();
    }, [])
    function handleAccept(clientClientID, roomRoomID) {
        fetch(`http://localhost:4000/requests/${clientClientID}/${roomRoomID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status": "accepted",
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                console.log("success")
                getRequests()
            } else if (data.status === "error") {
                console.log(data.message)
            } else if (data.status === "fail") {
                console.log("oops, something wrong went on !")
            }
        })
    }
    function handleDelete(clientClientID, roomRoomID) {
        fetch(`http://localhost:4000/requests/${clientClientID}/${roomRoomID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status": "rejected",
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                console.log("success")
                getRequests()
            } else if (data.status === "error") {
                console.log(data.message)
            } else if (data.status === "fail") {
                console.log("oops, something wrong went on !")
            }
        })
    }
    function PendingRoomCard(props) {
        const room = props.room;
        const imageUrl = "http://localhost:4000/images/rooms/" + room?.roomImg;
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img className="h-48 w-full object-cover md:h-full md:w-64 hover:scale-110 duration-500" src={imageUrl} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize block font-semibold text-lg leading-tight font-medium text-black hover:text-[#3282B8] duration-300 sec-font">{`${room?.roomType} Room ${room?.roomNumber}`}</h1>
                        <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{`${room?.createdAt.slice(0, 10)} ${room?.createdAt.slice(11, 19)} `}</div>
                        <div>{`user ${room?.clientName}  requested ${room?.numberOfPersons} people`}</div>
                        <button className="btn-color" onClick={() => handleAccept(room.clientClientID, room.roomRoomID)}>Accept</button>
                        <button className="bg-red-500 hover:bg-red-300" onClick={() => handleDelete(room.clientClientID, room.roomRoomID)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
    function HistoryCard(props) {
        const room = props.room;
        const imageUrl = "http://localhost:4000/images/rooms/" + room?.roomImg;
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img className="h-48 w-full object-cover md:h-full md:w-64 hover:scale-110 duration-500" src={imageUrl} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize block font-semibold text-lg leading-tight font-medium text-black hover:text-[#3282B8] duration-300 sec-font">{`${room?.roomType} Room ${room?.roomNumber}`}</h1>
                        <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{`${room?.createdAt.slice(0, 10)} ${room?.createdAt.slice(11, 19)} `}</div>
                        <div>{`user ${room?.clientName}  requested ${room?.numberOfPersons} people`}</div>
                        <div>{`${room.status}`}</div>
                    </div>
                </div>
            </div>
        )
    }
    const pending = requests?.filter(request => request.status === "pending");
    const History = requests?.filter(request => (request.status === "accepted" || request.status === "rejected"));
    return (
        <>
            <div>
                <div className="">
                    {pending?.length > 0 ? <div className="mt-10">
                        <h2 className="text-2xl main-font ">Pending</h2>
                        <div className="">
                            {pending?.map((room) => {
                                return <PendingRoomCard room={room} key={room.clientClientID} />
                            })}
                        </div>
                    </div> : null}
                </div>
                <div>
                    {History?.length > 0 ? <div className="mt-10">
                        <h2 className="text-2xl main-font ">History</h2>
                        <div className="">
                            {History?.map((room) => {
                                return <HistoryCard room={room} key={room.clientClientID} />
                            })}
                        </div>
                    </div> : null}
                </div>
            </div>
        </>
    )
}
export default Requests;