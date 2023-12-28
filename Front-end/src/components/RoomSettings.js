import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
function RoomSettings({cwid}){
    const [rooms, setRooms]=useState([]);
    const[noRooms,setNoRooms]=useState(false);
    useEffect(() => {
        getRooms();
    }, [])
    const getRooms = () => {
        fetch(`http://localhost:4000/rooms/${cwid}`)
            .then(res => res.json())
            .then(responsedata => {
                setRooms(responsedata.data);
                console.log(responsedata.data)
                if(responsedata.message === "There are No Available Rooms") setNoRooms(true);
            }
            )
    }
    const shared=rooms?.filter(room=>room.type==="shared");
    const privatee=rooms?.filter(room=>room.type==="private");
    const meeting=rooms?.filter(room=>room.type==="meeting");
    
    const RoomCard= ({room}) =>{
        const imageUrl=`http://localhost:4000/images/rooms/`
        return(
            <>
                <div className="my-4  rounded-3xl max-w-3xl mx-auto mt-4" >
                    <div className="w-full md:px-16 px-4">
                        <img  className=" object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 m-8 " src={imageUrl+room.img} alt="no-picture-added"></img>
                    </div>
        </div>
            </>
        )
        
    }
    return(
        <>
            {noRooms&&<div className="w-full flex flex-col items-center mt-[250px]">
                        <p className="text-xl">You don't have any Room yet</p>
                        <p className="my-6">Create your first Room Here:</p>
                        <Link to="../createRoom" className="px-2 py-4 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"> create Room</Link>
            </div>}
            {!noRooms&&<div>
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">shared Rooms</h2>
                <div>
                {shared.length?shared?.map((room) => {
                                return <RoomCard room={room} key={room.roomID} />
                            }):null}
                </div>
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">private Rooms</h2>
                <div>
                {privatee ?privatee?.map((room) => {
                                return <RoomCard room={room} key={room.roomID} />
                            }):null}
                </div>
                {console.log(shared)}
                {console.log(privatee)}
                {console.log(meeting)}
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">meeting Rooms</h2>
                <div>
                {meeting.length? meeting?.map((room) => {
                                return <RoomCard room={room} key={room.roomID} />
                            }):null}
                </div>
            </div>
            }
        </>
    )
}
export default RoomSettings;