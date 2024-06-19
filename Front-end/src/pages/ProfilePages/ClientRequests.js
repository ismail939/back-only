import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
function ClientRequests() {
    const [requests, setRequests] = useState([]);
    const token = useSelector(store => store.auth).token;
    const getRequests = () => {
        fetch(`http://localhost:4000/requests/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(responsedata => {
                setRequests(responsedata.data)
            }).catch()
    }
    useEffect(() => {
        getRequests();
    }, [])
    function PendingRoomCard(props) {
        const room = props.room;
        return (
            <div className="bg-white rounded-sm shadow-md overflow-hidden w-full">
                <div className="flex md:flex-row flex-col">
                    <div className="">
                        <img className="h-48 w-full object-cover" src={room.roomImg} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize font-semibold text-xl leading-tight text-black main-font">{`${room?.roomType} Room ${room?.roomNumber}`}</h1>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`Request Created: ${room?.createdAt.slice(0, 10)} ${room?.createdAt.slice(11, 19)}`}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`Request Updated: ${room?.updatedAt.slice(0, 10)} ${room?.updatedAt.slice(11, 19)}`}</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="mt-8 w-3/4 mx-auto">
            <h2 className="text-2xl main-font mb-4 mt-4">Requests</h2>
            {requests?.length > 0 || History?.length > 0 ? <><div className="">
                {requests?.length > 0 && <div className="mt-10">
                    <div className="">
                        {requests?.map((room) => {
                            return <PendingRoomCard room={room} key={room.clientClientID} />
                        })}
                    </div>
                </div>}
            </div>
            </> : <div className="text-center mt-[100px]">
                <p className="font-medium text-xl">Currently there aren't any requests</p>
            </div>}
        </div>
    )
}

export default ClientRequests;