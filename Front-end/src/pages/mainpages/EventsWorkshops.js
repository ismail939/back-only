import { useEffect, useState, useRef } from "react";
import { NoDataError, ShowError } from "./WorkSpaces";
import EventsCard from "../../components/EventsCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function EventsWorshops() {
    const [events, setEvents] = useState([]);
    const [displayedEvents, setDisplayedEvents] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    const [loading, setLodaing] = useState(true);
    const [statusresponse, setStatusResponse] = useState("");
    let menuRef = useRef();
    const getEventsWorkshops = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/events`)
            .then(res => res.json())
            .then(responsedata => {
                setLodaing(false)
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
    const getSearchData = (event) => {
        const search = event.target.value;
        setDisplayedEvents(events.filter((event) => {
            return search === '' ?
                events : event?.name.toLowerCase().includes(search.toLowerCase());
        }))
    }
    return (
        <div className="min-h-screen w-[95%] mx-auto md:mt-[30px] p-5">
            <div className="relative w-full" ref={menuRef}>
                <div className="w-full h-10 flex items-center">
                    <input
                        type="search"
                        className="h-full w-full p-2 border-2 border-solid border-black rounded-md focus:border-[#0F4C75] focus:outline-none"
                        placeholder="Search for certain event or workshop"
                        aria-label="Search"
                        onChange={e => getSearchData(e)}
                    ></input>
                </div>
            </div>
            {!fetcherror ? <div>
                {loading ?
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8 mt-8">
                        <Skeleton className="w-full h-[450px]" />
                        <Skeleton className="w-full h-[450px]" />
                        <Skeleton className="w-full h-[450px]" />
                        <Skeleton className="w-full h-[450px]" />
                    </div>
                    :(displayedEvents ? <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-8 mt-8">
                    {displayedEvents.map((event) => {
                        return <EventsCard event={event} key={event.eventID} />
                    })}
                </div>
                    : <NoDataError response={statusresponse} />)}
            </div> : <ShowError />}
        </div>
    )
}

export default EventsWorshops;