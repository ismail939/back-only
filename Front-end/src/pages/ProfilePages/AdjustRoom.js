import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
function AdjustRoom() {
    const params = useParams();
    const token = useSelector(store => store.auth).token;
    const profileData = jwtDecode(token);
    const cwID = profileData.cwSpaceCwID;
    const [originData, setOriginData] = useState([]);
    const [room, setRoom] = useState([]);
    const [img, setImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const [loading, setLoading] = useState(true)
    const imageUrl = `http://localhost:4000/images/rooms/`
    function HandleChange(e) {
        setRoom({ ...room, [e.target.name]: e.target.value })
    }
    const getRoom = () => {
        fetch(`http://localhost:4000/rooms/${cwID}/${params.roomid}`)
            .then(res => res.json())
            .then(responsedata => {
                setRoom(responsedata.data);
                setOriginData(responsedata.data)
                setLoading(false)
                if (responsedata.status === "error") { console.log("Sorry, there are no rooms"); }
                else if (responsedata.status === "fail") { console.log("Oops something went wrong !") };
            }
            ).catch(error => { console.log(error); });
    }
    useEffect(() => {
        getRoom();
    }, [])
    function checkCompatability() {
    }
    if(!loading) return (
        <div className="w-full min-h-screen py-1 lg:w-3/4">
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">{`${originData.type} Room ${originData.number}`}</h2>
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Image</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4" >
                <div className="w-full md:px-16 px-4">
                    <img className=" object-cover sm:w-5/6 sm:mx-auto w-full h-[250px] my-4" src={img ? URL.createObjectURL(img) : imageUrl + room.img}
                        alt={`${room.type} room ${room.number}`}></img>
                    <input className={`hidden`} id="uploadCWMainImg"
                        onChange={(e) => { setImg(e.target.files[0]); setImgName(e.target.files[0]?.name) }}
                        accept=".png,.jpg,.jpeg" type="file" ></input>
                    <div className="flex flex-row-reverse w-full items-center gap-5">
                        <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${!imgName?.trim() ? "bg-gray-500" : "btn-color border-indigo-200"}
                        rounded-lg border`} disabled={!imgName?.trim()} onClick={(e) => { }}>Save</button>
                        <label htmlFor="uploadCWMainImg" className="py-2 px-4 font-medium rounded-lg bg-red-500 hover:bg-red-600 duration-200 cursor-pointer">Change Image</label>
                    </div>
                </div>
            </div>
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-xl">Room Information</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4">
                <div className="w-full md:px-12 px-4">
                    <div className="my-4 w-full flex justify-between items-center" >
                        <label className="block mb-2 cursor-icon w-1/4 gap-2">Room Number</label>
                        <div className="w-full">
                            <input name="number" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`}
                                onChange={HandleChange} type="number" value={room.number} ></input>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Hour Price</label>
                            <div className="w-full">
                                <input name="hourPrice" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={0}
                                    onChange={HandleChange} type="number" value={room.hourPrice} ></input>
                            </div>
                        </div>
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Day Price</label>
                            <div className="w-full"> 
                                <input name="dayPrice" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={0}
                                    onChange={HandleChange} type="number" value={room.dayPrice} ></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Minimum Room Size</label>
                            <div className="w-full">
                                <input name="minRoomSize" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={1}
                                    onChange={HandleChange} type="number" value={room.minRoomSize} ></input>
                            </div>
                        </div>
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Maximum Room Size</label>
                            <div className="w-full">
                                <input name="maxRoomSize" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={1}
                                    onChange={HandleChange} type="number" value={room.maxRoomSize} ></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse w-full">
                        <button onClick={(e) =>{}} disabled={checkCompatability()}
                            className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${checkCompatability() ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-lg border`} >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdjustRoom;