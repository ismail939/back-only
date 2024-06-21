import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const params = useParams();
    const [found, setFound] = useState(false);
    const [loading, setLodaing] = useState(true);
    const getWorkSpace = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/cw_spaces/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                setLodaing(false)
                if (responsedata.status === "error") {
                    setFound(false);
                } else if (responsedata.status === "success") {
                    setFound(true)
                }
            }
            ).catch();
    }
    const getRooms = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/rooms/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                setRooms(responsedata.data);
                if (responsedata.status === "error") console.log("Sorry, there are no rooms");
                else if (responsedata.status === "fail") console.log("Oops something went wrong !");
            }
            ).catch(error => { console.log(error) });
    }
    useEffect(() => {
        getWorkSpace();
        getRooms();
    }, [])
    const shared = rooms?.filter(room => room.type === "Shared");
    const privatee = rooms?.filter(room => room.type === "Private");
    const meeting = rooms?.filter(room => room.type === "Meeting");
    function PhotoRow(props) {
        const roomData = props.room;
        return (
            <>
                <div className="">
                    <img className="w-full h-[300px] object-cover rounded-xl" src={roomData.img} alt="no image found"></img>
                </div>
            </>
        )
    }
    if (found) {
        return (
            <>
                <div className="w-4/5 mx-auto mt-[50px] min-h-screen">
                    {shared?.length > 0 ? <div >
                        <h2 className="text-2xl main-font ">Shared Rooms</h2>
                        <div className="grid my-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {
                                shared?.map((room) => {
                                    return <Link to={`${room.roomID}`}><PhotoRow room={room} key={room.roomID} /></Link>
                                })}
                        </div>

                    </div> : null}
                    {privatee?.length > 0 ? <div className="mt-10">
                        <h2 className="text-2xl main-font ">Private Rooms</h2>
                        <div className="grid my-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {privatee?.map((room) => {
                                return <Link to={`${room.roomID}`}><PhotoRow room={room} key={room.roomID} /></Link>
                            })}
                        </div>
                    </div> : null}
                    {meeting?.length > 0 ? <div className="mt-10">
                        <h2 className="text-2xl main-font ">Meeting Rooms</h2>
                        <div className="grid my-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {meeting?.map((room) => {
                                return <Link to={`${room.roomID}`}><PhotoRow room={room} key={room.roomID} /></Link>
                            })}
                        </div>
                    </div> : null}
                </div>
            </>
        )
    } else if (loading && !found) {
        return (
            <div className="w-4/5 mx-auto mt-[50px] min-h-screen">
                <div className="w-[250px]">
                    <Skeleton className="h-8" />
                </div>
                <div className="grid my-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    <Skeleton className="h-[300px]" />
                    <Skeleton className="h-[300px]" />
                    <Skeleton className="h-[300px]" />
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
export default RoomList;