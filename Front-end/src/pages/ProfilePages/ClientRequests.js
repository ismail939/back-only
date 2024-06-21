import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { PeopleFill, } from "react-bootstrap-icons";
function ClientRequests() {
    const [requests, setRequests] = useState([]);
    const token = useSelector(store => store.auth).token;
    const profileData = jwtDecode(token)
    const getRequests = () => {
        fetch(`http://localhost:4000/clients/getRequests/${profileData.clientID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(responsedata => {
                setRequests(responsedata.data)
                console.log(responsedata.data)
            }).catch()
    }
    useEffect(() => {
        getRequests();
    }, [])
    function PendingRoomCard(props) {
        const room = props.room;
        return (
            <div className="bg-white rounded-sm shadow-md overflow-hidden w-full my-4">
                <div className="flex md:flex-row flex-col">
                    <div className="">
                        <img className="h-48 w-full md:w-[300px] object-cover" src={room.img} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize font-semibold text-xl leading-tight text-black main-font">{`Room ${room?.roomNumber}`}</h1>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`Request Created: ${room?.createdAt.slice(0, 10)} ${room?.createdAt.slice(11, 19)}`}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`Request Updated: ${room?.updatedAt.slice(0, 10)} ${room?.updatedAt.slice(11, 19)}`}</div>
                        <div className="mt-1 text-lg flex items-center gap-4">
                            <PeopleFill />
                            <div className="font-bold">{`Number of Persons: ${room?.numberOfPersons}`}</div>
                        </div>
                        <div className="uppercase mt-2 text-lg text-[#0F4C75] font-bold">{`Status: ${room?.status}`}</div>
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