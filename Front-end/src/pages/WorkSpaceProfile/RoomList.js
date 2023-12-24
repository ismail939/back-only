import { useState,useEffect } from "react";

function RoomList(){
    const [rooms,setRooms]=useState([]);
    const getRooms = () => {
        fetch("http://localhost:4000/rooms")
            .then(res => res.json())
            .then(responsedata => {
                setRooms(responsedata.data);
                if(responsedata.status === "error") console.log("Sorry, there are no rooms");
                else if(responsedata.status === "fail") console.log("Oops something went wrong !");
            }
            ).catch(error => { console.log(error) });
    }
    useEffect(()=>{
        getRooms();
    },[])
    const shared=rooms.filter(room=>room.type==="shared");
    const privatee=rooms.filter(room=>room.type==="private");
    const meeting=rooms.filter(room=>room.type==="meeting");
    function PhotoRow(props){
        const roomData=props.room;
        const imageurl=`http://localhost:4000/images/rooms/${roomData.img}`;
        return(
            <>
                <div className="">
                    <img className="w-full h-[300px] object-cover rounded-xl" src={imageurl} alt="no image found"></img>
                </div>
            </>
        )
    }
    return(
        <>
            <div className="w-4/5 mx-auto mt-[50px] ">
                <div >
                    <h2 className="text-2xl main-font ">Shared Rooms</h2>
                    <div className="grid my-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                        {
                        shared?.map((room) => {
                                return <PhotoRow room={room} key={rooms.roomid} />
                        })}
                    </div>
                    
                </div>
                <div className="mt-10">
                    <h2 className="text-2xl main-font ">Private Rooms</h2>
                    <div className="grid my-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {privatee?.map((room) => {
                                return <PhotoRow room={room} key={rooms.roomid} />
                            })}
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-2xl main-font ">Meeting Rooms</h2>
                    <div className="grid my-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {meeting?.map((room) => {
                                return <PhotoRow room={room} key={rooms.roomid} />
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default RoomList;