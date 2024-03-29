import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function AdjustOffer() {
    const params = useParams();
    const [originData, setOriginData] = useState([]);
    const [offer, setOffer] = useState([]);
    const [img, setImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const [loading, setLoading] = useState(true)
    const imageUrl = `http://localhost:4000/images/offers/`
    const getOffer = () => {
        fetch(`http://localhost:4000/offers/${params.offerid}`)
            .then(res => res.json())
            .then(responsedata => {
                setOffer(responsedata.data);
                setOriginData(responsedata.data)
                setLoading(false)
                if (responsedata.status === "error") { console.log("Sorry, there are no rooms"); }
                else if (responsedata.status === "fail") { console.log("Oops something went wrong !") };
            }
            ).catch(error => { console.log(error); });
    }
    function HandleChange(e) {
        setOffer({ ...offer, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        getOffer();
    }, [])
    function checkCompatability() {
    }
    if(!loading && offer) return (
        <div className="w-full min-h-screen py-1 lg:w-3/4">
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">{`${originData.title}`}</h2>
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Image</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4" >
                <div className="w-full md:px-16 px-4">
                    <img className=" object-cover sm:w-5/6 sm:mx-auto w-full h-[250px] my-4" src={img ? URL.createObjectURL(img) : imageUrl + offer.img}
                        alt={`${offer.title}`}></img>
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
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-xl">Offer Information</h2>
            <div className="my-4 border  border-black-90 rounded-sm max-w-3xl mx-auto mt-4">
                <div className="w-full md:px-12 px-4">
                    <div className="my-4 w-full flex flex-col" >
                        <label className="mb-2 cursor-icon">Offer Title</label>
                        <div className="w-full">
                            <input name="title" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`}
                                onChange={HandleChange} type="text" value={offer.title} ></input>
                        </div>
                    </div>
                    <div className="my-4 w-full flex flex-col" >
                        <label className="mb-2 cursor-icon">Description</label>
                        <div className="w-full">
                            <textarea name="description" className={`bg-gray-50 border h-[150px] placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`}
                                onChange={HandleChange} type="text" value={offer.description} ></textarea>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">Start Date</label>
                            <div className="w-full">
                                <input name="start" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={new Date()?.toISOString()?.split('T')[0]}
                                    onChange={HandleChange} type="date" value={offer?.start?.split('T')[0]} ></input>
                            </div>
                        </div>
                        <div className="my-4 w-full flex flex-col" >
                            <label className="mb-2 cursor-icon">End Date</label>
                            <div className="w-full">
                                <input name="end" className={`bg-gray-50 border placeholder-gray-900 border-gray-300"
                            text-gray-900 sm:text-sm rounded-sm p-2.5 w-full`} min={offer?.start?.split('T')[0]}
                                    onChange={HandleChange} type="date" value={offer?.end?.split('T')[0]}></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse w-full">
                        <button onClick={(e) => { }} disabled={checkCompatability()}
                            className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${checkCompatability() ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-lg border`} >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdjustOffer;