import { useState,useEffect } from "react";
function RoomList(){
    const [rooms,setRooms]=useState([]);
    const [shared,setShared]=useState([]);
    const [privatee,setPrivate]=useState([]);
    const [meeting,setMeeting]=useState([]);
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
    })
    const result1=rooms.filter(room=>room.type==="shared");
    setShared(result1);
    const result2=rooms.filter(room=>room.type==="private");
    setPrivate(result2);
    const result3=rooms.filter(room=>room.type==="meeting");
    setMeeting(result3);
    function photoRow(props){
        const roomData=props.room;
        const imageurl=``;
        return(
            <>
                <div>
                    <img src={imageurl} alt="no image found"></img>
                </div>
            </>
        )
    }
    return(
        <>
            <div>
                <div>
                    <h2>Shared Rooms</h2>
                    {shared?.map((room) => {
                                return <photoRow room={room} key={rooms.roomid} />
                            })}
                </div>
                <div>
                    <h2>Private Rooms</h2>
                    {privatee?.map((room) => {
                                return <photoRow room={room} key={rooms.roomid} />
                            })}
                </div>
                <div>
                    <h2>Meeting Rooms</h2>
                    {meeting?.map((room) => {
                                return <photoRow room={room} key={rooms.roomid} />
                            })}
                </div>
            </div>
        </>
    )
}
export default RoomList;