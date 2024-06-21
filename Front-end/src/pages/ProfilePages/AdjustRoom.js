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
    const [dataerrors, setDataErrors] = useState({
        number: false,
        hourPrice: false,
        dayPrice: false,
        minRoomSize: false,
        maxRoomSize: false,
        roomImage:false,
    });
    function HandleChange(e) {
        setRoom({ ...room, [e.target.name]: e.target.value })
    }
    const getRoom = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/rooms/${cwID}/${params.roomid}`)
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
    function isImage(offerImage) {
        if (offerImage?.slice(-4) === ".jpg" || offerImage?.slice(-5) === ".jpeg" || offerImage?.slice(-4) === ".png") return true;
        else {
            return false;
        }
    }
    const addImg = () => {
        if (isImage(imgName)) {
            let formData = new FormData();
            formData.append('img', img);
            fetch(`${process.env.REACT_APP_BASE_URL}/rooms/${cwID}/${params.roomid}`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "error") {
                        console.log(data.message)
                    } else if (data.status === "success") {
                        getRoom();
                        setImgName("")
                    }
                })
                .catch(error => {
                    console.error('Error during fetch operation:', error);
                });
        }
    }
    function checkCompatability() {
        return originData?.number === room?.number
            && originData?.hourPrice === room?.hourPrice
            && originData?.dayPrice === room?.dayPrice
            && originData?.minRoomSize === room?.minRoomSize
            && originData?.maxRoomSize === room?.maxRoomSize           
    }
    const addData = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/rooms/${cwID}/${params.roomid}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "number": room.number,
                "hourPrice": room.hourPrice,
                "dayPrice": room.dayPrice,
                "minRoomSize": room.minRoomSize,
                "maxRoomSize": room.maxRoomSize,
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                getRoom()
            } else if (data.status === "error") {
                console.log(data)
            } else if (data.status === "fail") {
                console.log(data)
            }
        }).catch(error =>console.log(error))
    }
    const HandleError = (e) => {
        e.preventDefault();
        if (room?.number.length === 0) {
            setDataErrors({ number: true,
                hourPrice: false,
                dayPrice: false,
                minRoomSize: false,
                maxRoomSize: false,
                roomImage:false })
        }
        else if (room?.hourPrice.length === 0) {
            setDataErrors({ number: false,
                hourPrice: true,
                dayPrice: false,
                minRoomSize: false,
                maxRoomSize: false,
                roomImage:false })
        }
        else if (room?.dayPrice.length===0) {
            setDataErrors({ number: false,
                hourPrice: false,
                dayPrice: true,
                minRoomSize: false,
                maxRoomSize: false,
                roomImage:false })
        }
        else if (room?.minRoomSize.length===0) {
            setDataErrors({ number: false,
                hourPrice: false,
                dayPrice: false,
                minRoomSize: true,
                maxRoomSize: false,
                roomImage:false })
        }
        else if (room?.maxRoomSize.length === 0) {
            setDataErrors({ number: false,
                hourPrice: false,
                dayPrice: false,
                minRoomSize: false,
                maxRoomSize: true,
                roomImage:false })
        }
        else {
            setDataErrors({ number: false,
                hourPrice: false,
                dayPrice: false,
                minRoomSize: false,
                maxRoomSize: false,
                roomImage:false });
            addData();
        }
    }
    if(!loading && room) return (
        <div className="w-full min-h-screen py-1 lg:w-3/4">
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">{`${originData.type} Room ${originData.number}`}</h2>
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Image</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4" >
                <div className="w-full md:px-16 px-4">
                    <img className=" object-cover sm:w-5/6 sm:mx-auto w-full h-[250px] my-4" src={img ? URL.createObjectURL(img) :  room.img}
                        alt={`${room.type} room ${room.number}`}></img>
                    <input className={`hidden`} id="uploadCWMainImg"
                        onChange={(e) => { setImg(e.target.files[0]); setImgName(e.target.files[0]?.name) }}
                        accept=".png,.jpg,.jpeg" type="file" ></input>
                    <div className="flex flex-row-reverse w-full items-center gap-5">
                        <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${!imgName?.trim() ? "bg-gray-500" : "btn-color border-indigo-200"}
                        rounded-lg border`} disabled={!imgName?.trim()} onClick={(e) => { addImg()}}>Save</button>
                        <label htmlFor="uploadCWMainImg" className="py-2 px-4 font-medium rounded-lg text-white bg-[#3282B8] hover:bg-[#4292C8] duration-200 cursor-pointer">Change Image</label>
                        {dataerrors.roomImage ? <span className="text-[12px] text-red-500">plaese enter image</span> : null}
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
                                {dataerrors.number ? <span className="text-[12px] text-red-500">plaese enter a room number</span> : null}
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Hour Price</label>
                            <div className="w-full">
                                <input name="hourPrice" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={0}
                                    onChange={HandleChange} type="number" value={room.hourPrice} ></input>
                                    {dataerrors.hourPrice ? <span className="text-[12px] text-red-500">plaese enter hour price</span> : null}
                            </div>
                        </div>
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Day Price</label>
                            <div className="w-full"> 
                                <input name="dayPrice" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={0}
                                    onChange={HandleChange} type="number" value={room.dayPrice} ></input>
                                    {dataerrors.dayPrice ? <span className="text-[12px] text-red-500">plaese enter day price</span> : null}
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
                                    {dataerrors.minRoomSize ? <span className="text-[12px] text-red-500">plaese enter min room size</span> : null}
                            </div>
                        </div>
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Maximum Room Size</label>
                            <div className="w-full">
                                <input name="maxRoomSize" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={1}
                                    onChange={HandleChange} type="number" value={room.maxRoomSize} ></input>
                                    {dataerrors.maxRoomSize ? <span className="text-[12px] text-red-500">plaese enter max Room Size</span> : null}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse w-full">
                        <button onClick={(e) =>{HandleError(e)}} disabled={checkCompatability()}
                            className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${checkCompatability() ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-lg border`} >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdjustRoom;