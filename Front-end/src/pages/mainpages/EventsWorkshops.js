import { useEffect, useState, useRef } from "react";
import { NoDataError, ShowError } from "./WorkSpaces";
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
    return (
        <div className="min-h-screen w-4/5 mx-auto md:mt-[30px] p-5">
            {!fetcherror ? <div>
                {displayedEvents ? <div className="flex flex-col gap-8 mt-8">
                    {displayedEvents.map((offer) => {
                        return <EventsCard offer={offer} key={offer.offerID} />
                    })}</div> : <NoDataError response={statusresponse} />}
                {/* <div className="mt-[50px] flex justify-center">
                        <Pagination />
                    </div> */}
            </div> : <ShowError />}
        </div>
    )
}

export default EventsWorshops;