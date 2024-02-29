import image from "../components/images/offer1.jpg"
import { GeoAlt, CalendarEvent, Clock } from "react-bootstrap-icons";
function EventsCard(props) {
    const event = props.event;
    console.log(event)
    const imageUrl = "http://localhost:4000/images/events/" + event?.mainPhoto;
    return (
        <div className="bg-white shadow-md overflow-hidden rounded-sm">
            <div className="flex-col">
                <img className="h-48 w-full object-cover md:h-72 md:w-full" src={imageUrl} alt={"event image"}></img>
                <div className="mt-4 px-4">
                    <h2 className="main-font text-xl">{event.name}</h2>
                    <div className="my-3">
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <GeoAlt />
                            <p>{event?.cwSpaceName}</p>
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <CalendarEvent />
                            <p>{`from  ${event.start.slice(0, 10)}`}</p>
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <CalendarEvent />
                            <p>{`to    ${event.end.slice(0, 10)}`}</p>
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            {`price :${event.price}`}
                        </div>
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            {`max capacity :${event.maxCapacity}`}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="my-2">
                        <h2 className="main-font text-lg text-neutral-600">Event Details</h2>
                        <p>{event.description}</p>
                    </div>
                    <button className="main-font my-2 btn-color py-2 px-2 float-right w-1/2">Register</button>
                </div>
            </div>
        </div>
    )
}

export default EventsCard;