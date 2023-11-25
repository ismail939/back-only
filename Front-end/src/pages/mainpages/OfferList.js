import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search,XCircleFill } from "react-bootstrap-icons";
import Card from "../../components/Card";
import notFoundImage from "../../components/images/WorkSpaceNotFound.png"
function ShowError() {
    return (
        <div className="flex flex-col items-center mt-[100px] text-center">
            <XCircleFill className="mb-4" style={{ fontSize: "100px", color: "red" }} />
            {/* <h2 className="mt-4 text-2xl font-medium">Failed to fetch data</h2> */}
            <p className="mt-8 text-2xl font-medium">oops, there is a problem at the moment. try again later</p>
        </div>
    )
}
function OfferList() {
    const [searchlist, setSearchList] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [offers, setOffers] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    const [statusresponse, setStatusResponse] = useState("");
    let menuRef = useRef();
    const getOffers = () => {
        fetch("http://localhost:4000/offers")
            .then(res => res.json())
            .then(responsedata => {
                setOffers(responsedata.data);
                setFetchError(false)
                if(responsedata.status === "error") setStatusResponse(responsedata.message);
                else if(responsedata.status === "fail") setStatusResponse("Oops something went wrong !");
            }
            ).catch(error => { setFetchError(true); console.log(error) });
    }
    useEffect(() => {
        getOffers();
    }, [])
    const getSearchData = (event) => {
        const search = event.target.value;
        setSearchData(offers.filter((offer) => {
            return search === '' ?
                null : offer.name.toLowerCase().includes(search.toLowerCase());
        }))
    }
    return (
        <div className="min-h-screen w-4/5 mx-auto md:mt-[30px] p-5">
            <div className="relative lg:w-4/5 md:w-3/5" ref={menuRef}>
                <div className="w-full h-10 flex items-center">
                    <input
                        type="search"
                        className="h-full w-full p-2 border-2 border-solid border-black border-r-0 rounded-l-md focus:border-[#0F4C75] focus:outline-none"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={e => getSearchData(e)}
                        onClick={() => { setSearchList(true) }}
                    ></input>
                    <button className="duration-200 ease-in-out btn-color h-full p-4 flex items-center rounded-r-md  text-white"
                        onClick={() => { if (searchData.length > 0) setOffers(searchData) }}><Search className="text-lg" /></button>
                </div>
                {(searchData.length > 0 && searchlist) ? <div className="flex flex-col max-h-60 w-full mt-1 shadow-md rounded-md bg-[#fafafa] overflow-x-hidden absolute z-[90]" >
                    {searchData.map((workspace) => {
                        return <Link className="w-full p-3 capitalize hover:bg-gray-200 font-semibold" to={``}>{workspace.name}</Link>
                    })}
                </div> : null}
            </div>
            {!fetcherror ? <div>
                    {offers ? <div className="flex flex-col gap-8">
                        {offers.map((offer) => {
                            return <Card cwspace={{cwID:offer.offerID , name:offer.title , description:offer.description , address:offer.name}} key={offer.offerID} />
                        })}</div> :
                        <div className="flex gap-10 h-80 flex-col lg:flex-row items-center justify-center p-5 text-center font-medium mt-[80px]">
                            <img src={notFoundImage} alt="" className="max-h-[200px] max-w-[300px]"></img>
                            <div><p className="mt-8 uppercase  md:text-4xl text-2xl">{statusresponse}</p>
                            <p className="mt-5 text-gray-500 text-md md:text-lg">Sorry for your inconvenience</p>
                            </div>
                            </div>}
                    {/* <div className="mt-[50px] flex justify-center">
                        <Pagination />
                    </div> */}
                </div> : <ShowError />}
            {/* <div className="flex flex-col gap-8 mt-8">
                <Card cwspace={{cwID:"1" , name:"Share room Offer" , description:"Experience the camaraderie of shared travel moments at an unbeatable offer! Book our shared rooms now and enjoy a limited-time 50% off, making your stay both affordable and memorable. "}}/>
            </div> */}
        </div>
    )
}

export default OfferList;