import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search,XCircleFill } from "react-bootstrap-icons";
import notFoundImage from "../../components/images/WorkSpaceNotFound.png"
import { NoDataError, ShowError } from "./WorkSpaces";
import OfferCard from "../../components/OfferCard";
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
                if(responsedata.status === "error") setStatusResponse("Sorry, there are no offers currently");
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
                null : offer?.title.toLowerCase().includes(search.toLowerCase());
        }))
    }
    return (
        <div className="min-h-screen w-4/5 mx-auto md:mt-[30px] p-5">
            <div className="relative w-full" ref={menuRef}>
                <div className="w-full h-10 flex items-center">
                    <input
                        type="search"
                        className="h-full w-full p-2 border-2 border-solid border-black border-r-0 rounded-l-md focus:border-[#0F4C75] focus:outline-none"
                        placeholder="Search for Offers of certain workspace"
                        aria-label="Search"
                        onChange={e => getSearchData(e)}
                        onClick={() => { setSearchList(true) ; console.log(searchData) }}
                    ></input>
                    <button className="duration-200 ease-in-out btn-color h-full p-4 flex items-center rounded-r-md  text-white"
                        onClick={() => { if (searchData.length > 0) {setOffers(searchData) ; setSearchList(false)} }}><Search className="text-lg" /></button>
                </div>
                {(searchData.length > 0 && searchlist) ? <div className="flex flex-col max-h-60 w-full mt-1 shadow-md rounded-md bg-[#fafafa] overflow-x-hidden absolute z-[90]" >
                    {searchData.map((workspace) => {
                        return <Link className="w-full p-3 capitalize hover:bg-gray-200 font-semibold" to={`/workspaces/${workspace.cwSpaceCwID}`}>{workspace.cwSpaceName}</Link>
                    })}
                </div> : null}
            </div>
            {!fetcherror ? <div>
                    {offers ? <div className="flex flex-col gap-8 mt-8">
                        {offers.map((offer) => {
                            return <OfferCard offer={offer} key={offer.offerID} />
                        })}</div> : <NoDataError response={statusresponse}/>}
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