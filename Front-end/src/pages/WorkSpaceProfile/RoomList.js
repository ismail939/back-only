import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";

function RoomList(){
    const [rooms,setRooms]=useState([]);
    const params = useParams();
    const [found, setFound] = useState(false);
    const [loading, setLodaing] = useState(true);
    const getWorkSpace = () => {
        fetch(`http://localhost:4000/cw_spaces/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "error") {
                    setFound(false);
                    setLodaing(false)
                } else if (responsedata.status === "success") {
                    setFound(true)
                    setLodaing(false)
                }
            }
            );
    }
    const getRooms = () => {
        fetch(`http://localhost:4000/rooms/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                setRooms(responsedata.data);
                if(responsedata.status === "error") console.log("Sorry, there are no rooms");
                else if(responsedata.status === "fail") console.log("Oops something went wrong !");
            }
            ).catch(error => { console.log(error) });
    }
    useEffect(()=>{
        getWorkSpace();
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
    if(found){ return(
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
    )}else if (!loading && !found) {
        return (
            <>
                <PageNotFound />
            </>
        )
    }
}
export default RoomList;