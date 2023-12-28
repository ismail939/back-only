import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function RoomSettings({ cwid }) {
    const [rooms, setRooms] = useState([]);
    const [noRooms, setNoRooms] = useState(false);
    useEffect(() => {
        getRooms();
    }, [])
    const getRooms = () => {
        fetch(`http://localhost:4000/rooms/${cwid}`)
            .then(res => res.json())
            .then(responsedata => {
                setRooms(responsedata.data);
                console.log(responsedata.data)
                if (responsedata.message === "There are No Available Rooms") setNoRooms(true);
            }
            )
    }
    const shared = rooms?.filter(room => room.type === "Shared");
    const privatee = rooms?.filter(room => room.type === "Private");
    const meeting = rooms?.filter(room => room.type === "Meeting");

    const RoomCard = ({ room }) => {
        const imageUrl = `http://localhost:4000/images/rooms/`
        return <img className=" object-cover w-full h-[250px]" src={imageUrl + room.img} alt="no-picture-added"></img>
    }
    return (
        <>
            {noRooms && <div className="w-full flex flex-col items-center mt-[250px]">
                <p className="text-xl">You don't have any Rooms yet</p>
                <p className="my-6">Create your first Room Here:</p>
                <Link to="../createRoom" className="px-2 py-4 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"> Create Room</Link>
            </div>}
            {!noRooms && <div className="mt-6 w-3/4 mx-auto">
                {shared?.length > 0 ? <div className="">
                    <h2 className="font-bold text-2xl mb-4">Shared Rooms</h2>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                        {shared?.map((room) => {
                            return <RoomCard room={room} key={room.roomID} />
                        })}
                    </div>
                </div> : null}
                {privatee?.length > 0 ? <div className="">
                    <h2 className="font-bold text-2xl my-4">Private Rooms</h2>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                        {privatee?.map((room) => {
                            return <RoomCard room={room} key={room.roomID} />
                        })}
                    </div>
                </div> : null}
                {meeting?.length > 0 ? <div className="">
                    <h2 className="font-bold text-2xl my-4">Meeting Rooms</h2>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                        {meeting?.map((room) => {
                            return <RoomCard room={room} key={room.roomID} />
                        })}
                    </div>
                </div> : null}
                <div className="mt-8 float-right">
                    <Link to="../createRoom" className="px-6 py-4 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200">ADD NEW ROOM</Link>
                </div>
            </div>
            }
        </>
    )
}
export default RoomSettings;