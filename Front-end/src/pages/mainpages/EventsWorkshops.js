import { useEffect, useState, useRef } from "react";
import { NoDataError, ShowError } from "./WorkSpaces";
import { Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import EventsCard from "../../components/EventsCard";
function EventsWorshops() {
    const [searchlist, setSearchList] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [events, setEvents] = useState([]);
    const [displayedEvents, setDisplayedEvents] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    const [statusresponse, setStatusResponse] = useState("");
    let menuRef = useRef();
    const getEventsWorkshops = () => {
        fetch("http://localhost:4000/events")
            .then(res => res.json())
            .then(responsedata => {
                setEvents(responsedata.data);
                setDisplayedEvents(responsedata.data)
                setFetchError(false)
                if (responsedata.status === "error") setStatusResponse("Sorry, there are no Events currently");
                else if (responsedata.status === "fail") setStatusResponse("Oops something went wrong !");
            }
            ).catch(error => { setFetchError(true); console.log(error) });
    }
    useEffect(() => {
        getEventsWorkshops();
    }, [])
    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setSearchList(false)
            }
        }
        document.addEventListener("mousedown", handler)
    }, [])
    const getSearchData = (event) => {
        const search = event.target.value;
        setSearchData(events.filter((offer) => {
            return search === '' ?
                null : offer?.title.toLowerCase().includes(search.toLowerCase());
        }))
    }
    return (
        <div className="min-h-screen w-[95%] mx-auto md:mt-[30px] p-5">
            <div className="relative w-full" ref={menuRef}>
                <div className="w-full h-10 flex items-center">
                    <input
                        type="search"
                        className="h-full w-full p-2 border-2 border-solid border-black border-r-0 rounded-l-md focus:border-[#0F4C75] focus:outline-none"
                        placeholder="Search for certain event or workshop"
                        aria-label="Search"
                        onChange={e => getSearchData(e)}
                        onClick={() => { setSearchList(true); console.log(searchData) }}
                    ></input>
                    <button className="duration-200 ease-in-out btn-color h-full p-4 flex items-center rounded-r-md  text-white"
                        onClick={() => { if (searchData.length > 0) { setDisplayedEvents(searchData); setSearchList(false) } }}><Search className="text-lg" /></button>
                </div>
                {(searchData.length > 0 && searchlist) ? <div className="flex flex-col max-h-60 w-full mt-1 shadow-md rounded-md bg-[#fafafa] overflow-x-hidden absolute z-[90]" >
                    {searchData.map((event) => {
                        return <Link className="w-full p-3 capitalize hover:bg-gray-200 font-semibold" to={``}>{event.cwSpaceName}</Link>
                    })}
                </div> : null}
            </div>
            {!fetcherror ? <div>
                {/* {displayedEvents ? <div className="flex flex-row gap-8 mt-8">
                    {displayedEvents.map((event) => {
                        return <EventsCard key={event} />
                    })}
                </div>
                    : <NoDataError response={statusresponse} />} */}
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
                    <EventsCard />
                    <EventsCard />
                    <EventsCard />
                    <EventsCard />
                </div>
            </div> : <ShowError />}
        </div>
    )
}

export default EventsWorshops;