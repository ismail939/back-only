import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function AdjustEvent() {
    const params = useParams();
    const token = useSelector(store => store.auth).token;
    const [originData, setOriginData] = useState([]);
    const [event, setEvent] = useState([]);
    const [img, setImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const [loading, setLoading] = useState(true)
    const [dataerrors, setDataErrors] = useState({
        start: false,
        end: false,
        title: false,
        description: false,
        offerImageName: false,
        price: false,
        maxCapacity: false
    });
    const getEvent = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/events/${params.eventid}`)
            .then(res => res.json())
            .then(responsedata => {
                setEvent({
                    ...responsedata.data,
                    start: responsedata.data.start.split('T')[0],
                    end: responsedata.data.start.split('T')[0]
                });
                setOriginData({
                    ...responsedata.data,
                    start: responsedata.data.start.split('T')[0],
                    end: responsedata.data.start.split('T')[0]
                });
                setLoading(false)
                if (responsedata.status === "error") { console.log("Sorry, there are no events"); }
                else if (responsedata.status === "fail") { console.log("Oops something went wrong !") };
            }
            ).catch(error => { console.log(error); });
    }
    function HandleChange(e) {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        getEvent();
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
            fetch(`${process.env.REACT_APP_BASE_URL}/events/${params.eventid}`, {
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
                        getEvent();
                        setImgName("")
                    }
                })
                .catch(error => {
                    console.error('Error during fetch operation:', error);
                });
        }
    }
    // function isNumber(Number) {
    //     var regex = /^\d+$/;
    //     if (Number < 0) {
    //         return true;
    //     }else if (!Number?.match(regex)) {
    //         return true;
    //     }   else {
    //         return false;
    //     }
    // }
    function checkCompatability() {
        return originData?.name === event?.name
            && originData?.price === event?.price
            && originData?.maxCapacity === event?.maxCapacity
            && originData?.description === event?.description
            && originData?.start === event?.start
            && originData?.end === event?.end
            
    }
    const addData = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/events/${params.eventid}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "name": event.name,
                "description": event.description,
                "start": event.start,
                "end": event.end,
                "price": event.price,
                "maxCapacity": event.maxCapacity,
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                console.log("success")
                getEvent()
            } else if (data.status === "error") {
                console.log(data)
            } else if (data.status === "fail") {
                console.log(data)
            }
        }).catch(error =>console.log(error))
    }
    const HandleError = (e) => {
        e.preventDefault();
        // if (!isImage(event?.imgName)) {
        //     setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: true, price: false, maxCapacity: false })
        // }
        // else
        if (event?.name.length === 0) {
            setDataErrors({ title: true, description: false, start: false, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (event?.description.length === 0) {
            setDataErrors({ title: false, description: true, start: false, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (event?.maxCapacity.length===0) {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: false, price: false, maxCapacity: true })
        }
        else if (event?.price.length===0) {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: false, price: true, maxCapacity: false })
        }
        else if (event?.start.length === 0) {
            setDataErrors({ title: false, description: false, start: true, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (event?.end.length === 0) {
            setDataErrors({ title: false, description: false, start: false, end: true, offerImageName: false, price: false, maxCapacity: false })
        }
        else {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: false, price: false, maxCapacity: false });
            addData();
        }
    }
    if (!loading && event) return (
        <div className="w-full min-h-screen py-1 lg:w-3/4">
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">{`${originData.name}`}</h2>
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Image</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4" >
                <div className="w-full md:px-16 px-4">
                    <img className=" object-cover sm:w-5/6 sm:mx-auto w-full h-[250px] my-4" src={img ? URL.createObjectURL(img) :  event.img}
                        alt={event.name}></img>
                    <input className={`hidden`} id="uploadCWMainImg"
                        onChange={(e) => { setImg(e.target.files[0]); setImgName(e.target.files[0]?.name) }}
                        accept=".png,.jpg,.jpeg" type="file" ></input>
                    <div className="flex flex-row-reverse w-full items-center gap-5">
                        <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${!imgName?.trim() ? "bg-gray-500" : "btn-color border-indigo-200"}
                        rounded-lg border`} disabled={!imgName?.trim()} onClick={(e) => { addImg()}}>Save</button>
                        <label htmlFor="uploadCWMainImg" className="py-2 px-4 font-medium rounded-lg text-white bg-[#3282B8] hover:bg-[#4292C8] duration-200 cursor-pointer">Change Image</label>
                        {dataerrors.offerImageName ? <span className="text-[12px] text-red-500">plaese enter an image accepted formats are png , jpg , jpeg</span> : null}
                    </div>
                </div>
            </div>
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-xl">Event Information</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4">
                <div className="w-full md:px-12 px-4">
                    <div className="my-4 w-full flex flex-col" >
                        <label className="mb-2 cursor-icon">Event Name</label>
                        <div className="w-full">
                            <input name="name" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`}
                                onChange={HandleChange} type="text" value={event.name} ></input>
                                {dataerrors.title ? <span className="text-[12px] text-red-500">plaese enter a title</span> : null}
                        </div>
                    </div>
                    <div className="my-4 w-full flex flex-col" >
                        <label className="mb-2 cursor-icon">Description</label>
                        <div className="w-full">
                            <textarea name="description" className={`bg-gray-50 border h-[150px] placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`}
                                onChange={HandleChange} type="text" value={event.description} ></textarea>
                                {dataerrors.description ? <span className="text-[12px] text-red-500">plaese enter a description</span> : null}
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Price</label>
                            <div className="w-full">
                                <input name="price" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={0}
                                    onChange={HandleChange} type="number" value={event.price} ></input>
                                    {dataerrors.price ? <span className="text-[12px] text-red-500">plaese enter a price</span> : null}
                            </div>
                        </div>
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Maximum Capacity</label>
                            <div className="w-full"> 
                                <input name="maxCapacity" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={1}
                                    onChange={HandleChange} type="number" value={event.maxCapacity} ></input>
                                    {dataerrors.maxCapacity ? <span className="text-[12px] text-red-500">plaese enter capacity</span> : null}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Start Date</label>
                            <div className="w-full">
                                <input name="start" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={new Date()?.toISOString()?.split('T')[0]}
                                    onChange={HandleChange} type="date" value={event?.start?.split('T')[0]} ></input>
                                    {dataerrors.start ? <span className="text-[12px] text-red-500">plaese enter a start date</span> : null}
                            </div>
                        </div>
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">End Date</label>
                            <div className="w-full">
                                <input name="end" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={event?.start?.split('T')[0]}
                                    onChange={HandleChange} type="date" value={event?.end?.split('T')[0]}></input>
                                    {dataerrors.end ? <span className="text-[12px] text-red-500">plaese enter an end date</span> : null}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse w-full">
                        <button onClick={(e) => {HandleError(e) }} disabled={checkCompatability()}
                            className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${checkCompatability() ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-lg border`} >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdjustEvent;