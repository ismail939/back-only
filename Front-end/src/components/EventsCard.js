import image from "../components/images/offer1.jpg"
import { GeoAlt, CalendarEvent, Clock } from "react-bootstrap-icons";
import { setPayData } from "./reduxtoolkit/Slices/paySlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function EventsCard(props) {
    const usertype = useSelector(store => store.auth).usertype
    const event = props.event;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function RegisterEvent() {
        dispatch(setPayData({
            bookingTime: [],
            totalPrice: event.price,
            date: "",
            type: "event",
            roomid: event.eventID
        }
        ))
        navigate("/payment")
    }
    return (
        <div className="bg-white shadow-md overflow-hidden rounded-sm">
            <div className="flex-col">
                <img className="h-48 w-full object-cover md:h-72 md:w-full" src={event.img} alt={"event image"}></img>
                <div className="mt-4 px-4">
                    <h2 className="main-font text-xl">{event.name}</h2>
                    <div className="my-3">
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <GeoAlt />
                            <p>{event?.cwSpaceName}</p>
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <CalendarEvent />
                            <p>{`From:  ${event.start.slice(0, 10)}`}</p>
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <CalendarEvent />
                            <p>{`To:    ${event.end.slice(0, 10)}`}</p>
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            {event.price === 0 ? `Price: Free` : `Price: ${event.price} L.E`}
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            {`Available Slots: ${event.maxCapacity - event.capacity}`}
                        </div>
                    </div>
                    <hr></hr>
                    {usertype === "client" && <button className="main-font my-2 btn-color py-2 px-2 w-full" onClick={() =>{RegisterEvent()}}>Register</button>}
                    <div className="my-2">
                        <h2 className="main-font text-lg text-neutral-600">Event Details</h2>
                        <p>{event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsCard;