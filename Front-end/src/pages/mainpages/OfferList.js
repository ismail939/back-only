import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, } from "react-bootstrap-icons";
import Card from "../../components/Card";
function OfferList() {
    const [searchlist, setSearchList] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [offers, setOffers] = useState([]);
    let menuRef = useRef();
    const getSearchData = (event) => {
        const search = event.target.value;
        setSearchData(offers.filter((workspace) => {
            return search === '' ?
                null : workspace.name.toLowerCase().includes(search.toLowerCase());
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
            <div className="flex flex-col gap-8 mt-8">
                <Card cwspace={{cwID:"1" , name:"Share room Offer" , description:"Experience the camaraderie of shared travel moments at an unbeatable offer! Book our shared rooms now and enjoy a limited-time 50% off, making your stay both affordable and memorable. "}}/>
            </div>
        </div>
    )
}

export default OfferList;