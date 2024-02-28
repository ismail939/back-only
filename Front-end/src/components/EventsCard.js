import image from "../components/images/offer1.jpg"
import { GeoAlt, CalendarEvent, Clock } from "react-bootstrap-icons";
function EventsCard(props) {
    const event = props.event;
    return (
        <div className="bg-white shadow-md overflow-hidden rounded-sm">
            <div className="flex-col">
                <img className="h-48 w-full object-cover md:h-72 md:w-full" src={image} alt={"event image"}></img>
                <div className="mt-4 px-4">
                    <h2 className="main-font text-xl">Wheelz Car Show</h2>
                    <div className="my-3">
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <GeoAlt />
                            <p>Artisto Co-Working Space</p>
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <CalendarEvent />
                            <p>Thu 25 Sept</p>
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <Clock />
                            <p>09:00 AM - 15:00 PM</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="my-2">
                        <h2 className="main-font text-lg text-neutral-600">Event Details</h2>
                        <p>lorem ipsum dolor sit amet consectetur adipiscing elit.lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                    </div>
                    <button className="main-font my-2 btn-color py-2 px-2 float-right w-1/2">Register</button>
                </div>
            </div>
        </div>
    )
}

export default EventsCard;