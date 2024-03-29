import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { GeoAlt, CalendarEvent, Clock } from "react-bootstrap-icons";
function EventsSettings() {
    const [events, setEvents] = useState([]);
    const [noEvents, setNoEvents] = useState(false);
    const token = useSelector(store => store.auth).token;
    const profileData = jwtDecode(token);
    const [loading, setLoading] = useState(true)
    const cwid = profileData.cwSpaceCwID
    useEffect(() => {
        getevents();
    }, [])
    const getevents = () => {
        fetch(`http://localhost:4000/events/cw_space/${cwid}`)
            .then(res => res.json())
            .then(responsedata => {
                setEvents(responsedata.data);
                setLoading(false)
                console.log(responsedata.message)
                if (responsedata.message === "There are No Available Events for This Co-working Space") setNoEvents(true);
            }
            ).catch(error => {
                console.error('Error during fetch operation:', error);
            });
    }
    function EventCard(props) {
        const event = props.event;
        const imageUrl = "http://localhost:4000/images/events/" + event?.mainPhoto;
        return (
            <div className="bg-white shadow-md overflow-hidden rounded-sm">
                <div className="flex-col">
                    <img className="h-48 w-full object-cover md:h-72 md:w-full" src={imageUrl} alt={event.name}></img>
                    <div className="mt-4 px-4">
                        <h2 className="main-font text-xl">{event.name}</h2>
                        <div className="my-3">
                            <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                                <CalendarEvent />
                                <p>{`From:  ${event.start.slice(0, 10)}`}</p>
                            </div>
                            <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                                <CalendarEvent />
                                <p>{`To :   ${event.end.slice(0, 10)}`}</p>
                            </div>
                            <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                                {`Price: ${event.price}`}
                            </div>
                            <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                                {`Max Capacity: ${event.maxCapacity}`}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="my-2">
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <Link to={`${event.eventID}`} className="main-font text-center my-2 btn-color py-2 px-2 w-full">Edit</Link>
                            <button className="main-font my-2 bg-red-500 hover:bg-red-600 duration-200 py-2 px-2 w-full">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if(!loading) return (
        <>
            {noEvents && <div className="w-full flex flex-col items-center mt-[250px]">
                <p className="text-xl">You don't have any events yet</p>
                <p className="my-6">Create your first event Here:</p>
                <Link to="../createevent" className="px-6 py-3 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"> Create event</Link>
            </div>}
            {!noEvents && <div className="mt-8 w-3/4 mx-auto">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    {events?.map((event) => {
                        return <EventCard event={event} key={event.eventID} />
                    })}
                </div>
                <div className="mt-8">
                    <Link to="../createevent" className="px-6 py-4 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200">ADD NEW event</Link>
                </div>
            </div>
            }
        </>
    )
}
export default EventsSettings;