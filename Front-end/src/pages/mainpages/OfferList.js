import { useEffect, useState, useRef } from "react";
import { NoDataError, ShowError } from "./WorkSpaces";
import OfferCard from "../../components/OfferCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function OfferList() {
    const [offers, setOffers] = useState([]);
    const [displayedOffers, setDisplayedOffers] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    const [loading, setLodaing] = useState(true);
    const [statusresponse, setStatusResponse] = useState("");
    let menuRef = useRef();
    const getOffers = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/offers`)
            .then(res => res.json())
            .then(responsedata => {
                setLodaing(false)
                setOffers(responsedata.data);
                setDisplayedOffers(responsedata.data)
                setFetchError(false)
                if (responsedata.status === "error") setStatusResponse("Sorry, there are no offers currently");
                else if (responsedata.status === "fail") setStatusResponse("Oops something went wrong !");
            }
            ).catch(error => { setFetchError(true); console.log(error) });
    }
    useEffect(() => {
        getOffers();
    }, [])
    const getSearchData = (event) => {
        const search = event.target.value;
        setDisplayedOffers(offers.filter((offer) => {
            return search === '' ?
                offers : offer?.title.toLowerCase().includes(search.toLowerCase());
        }))
    }
    return (
        <div className="min-h-screen w-4/5 mx-auto md:mt-[30px] p-5">
            <div className="relative w-full" ref={menuRef}>
                <div className="w-full h-10 flex items-center">
                    <input
                        type="search"
                        className="h-full w-full p-2 border-2 border-solid border-black rounded-md focus:border-[#0F4C75] focus:outline-none"
                        placeholder="Search for Offers"
                        aria-label="Search"
                        onChange={e => getSearchData(e)}
                    ></input>
                </div>
            </div>
            {!fetcherror ? <div>
                {loading ?
                    <div className="flex flex-col gap-8">
                        <Skeleton className="w-full h-72 mt-10" />
                        <Skeleton className="w-full h-72" />
                    </div>
                    : (displayedOffers ? <div className="flex flex-col gap-8 mt-8">
                        {displayedOffers.map((offer) => {
                            return <OfferCard offer={offer} key={offer.offerID} />
                        })}</div> : <NoDataError response={statusresponse} />)}
                {/* <div className="mt-[50px] flex justify-center">
                        <Pagination />
                    </div> */}
            </div> : <ShowError />}
        </div>
    )
}

export default OfferList;