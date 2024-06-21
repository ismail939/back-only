import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function AdjustOffer() {
    const params = useParams();
    const [originData, setOriginData] = useState([]);
    const token = useSelector(store => store.auth).token;
    const [offer, setOffer] = useState([]);
    const [img, setImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const [loading, setLoading] = useState(true)
    const [dataerrors, setDataErrors] = useState({
        start: false,
        end: false,
        title: false,
        description: false,
        offerImageName: false,
    });
    function isImage(offerImage) {
        if (offerImage?.slice(-4) === ".jpg" || offerImage?.slice(-5) === ".jpeg" || offerImage?.slice(-4) === ".png") return true;
        else {
            return false;
        }
    }
    const getOffer = () => {
        fetch(`http://localhost:4000/offers/${params.offerid}`)
            .then(res => res.json())
            .then(responsedata => {
                setOffer(responsedata.data);
                setOriginData(responsedata.data)
                setLoading(false)
                if (responsedata.status === "error") { console.log("Sorry, there are no offers"); }
                else if (responsedata.status === "fail") { console.log("Oops something went wrong !") };
            }
            ).catch(error => { console.log(error); });
    }
    const addImg = () => {
        if (isImage(imgName)) {
            let formData = new FormData();
            formData.append('img', img);
            fetch(`http://localhost:4000/offers/${params.offerid}`, {
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
                        getOffer();
                        setImgName("")
                    }
                })
                .catch(error => {
                    console.error('Error during fetch operation:', error);
                });
        }
    }
    function HandleChange(e) {
        console.log(e.target.value)
        setOffer({ ...offer, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        getOffer();
    }, [])
    function checkCompatability() {
        return originData?.title === offer?.title
            && originData?.description === offer?.description
            && originData?.start === offer?.start
            && originData?.end === offer?.end
            
    }
    const addData = () => {
        fetch(`http://localhost:4000/offers/${params.offerid}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": offer.title,
                "description": offer.description,
                "start": offer.start,
                "end": offer.end,
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                getOffer()
            } else if (data.status === "error") {
                console.log(data)
            } else if (data.status === "fail") {
                console.log(data)
            }
        }).catch(error =>console.log(error))
    }
    const HandleError = (e) => {
        e.preventDefault();
        // if (!isImage(offer?.imgName)) {
        //     setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: true, price: false, maxCapacity: false })
        // }
        // else
        if (offer?.title?.length === 0) {
            setDataErrors({ title: true, description: false, start: false, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (offer?.description?.length === 0) {
            setDataErrors({ title: false, description: true, start: false, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (offer?.start?.length === 0) {
            setDataErrors({ title: false, description: false, start: true, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (offer?.end?.length === 0) {
            setDataErrors({ title: false, description: false, start: false, end: true, offerImageName: false, price: false, maxCapacity: false })
        }
        else {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: false, price: false, maxCapacity: false });
            addData();
        }
    }
    if(!loading && offer) return (
        <div className="w-full min-h-screen py-1 lg:w-3/4">
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">{`${originData.title}`}</h2>
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Image</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4" >
                <div className="w-full md:px-16 px-4">
                    <img className=" object-cover sm:w-5/6 sm:mx-auto w-full h-[250px] my-4" src={img ? URL.createObjectURL(img) :  offer.img}
                        alt={`${offer.title}`}></img>
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
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-xl">Offer Information</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4">
                <div className="w-full md:px-12 px-4">
                    <div className="my-4 w-full flex flex-col" >
                        <label className="mb-2 cursor-icon">Offer Title</label>
                        <div className="w-full">
                            <input name="title" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`}
                                onChange={HandleChange} type="text" value={offer.title} ></input>
                                {dataerrors.title ? <span className="text-[12px] text-red-500">please enter a title</span> : null}
                        </div>
                    </div>
                    <div className="my-4 w-full flex flex-col" >
                        <label className="mb-2 cursor-icon">Description</label>
                        <div className="w-full">
                            <textarea name="description" className={`bg-gray-50 border h-[150px] placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`}
                                onChange={HandleChange} type="text" value={offer.description} ></textarea>
                                {dataerrors.description ? <span className="text-[12px] text-red-500">plaese enter a description</span> : null}
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Start Date</label>
                            <div className="w-full">
                                <input name="start" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={new Date()?.toISOString()?.split('T')[0]}
                                    onChange={HandleChange} type="date" value={offer?.start?.split('T')[0]} ></input>
                                    {dataerrors.start ? <span className="text-[12px] text-red-500">plaese enter a start date</span> : null}
                            </div>
                        </div>
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">End Date</label>
                            <div className="w-full">
                                <input name="end" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={offer?.start?.split('T')[0]}
                                    onChange={HandleChange} type="date" value={offer?.end?.split('T')[0]}></input>
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

export default AdjustOffer;