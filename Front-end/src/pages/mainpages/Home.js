import Image1 from "../../components/images/HomeImage.jpg"
import newsticker from "../../components/images/newsticker.png"
import hotsticker from "../../components/images/hotsticker.png"
import topsticker from "../../components/images/top-rated sticker.png"
import Slider from "../../components/Slider";
import { BoxArrowInRight, GeoAlt, CalendarEvent } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DiscoverCard(props) {
    const discover = props.discover;
    const icon = discover.discoverType === "New" ? newsticker : (discover.discoverType === "Hot" ? hotsticker : topsticker);
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
            <div className="w-full relative group h-64">
                <img className="w-full h-full" src={discover.img} alt={discover.name}></img>
                <Link to={`/workspaces/${discover.cwID}`}><div className=" w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                {/* <h2 className="absolute top-3 right-1 font-extrabold text-lg text-white text-yellow-400 opacity-0 duration-500
                            group-hover:-translate-x-5 group-hover:opacity-100">New</h2> */}
                <img className="w-[70px] h-[70px] absolute top-[-3px] right-[-3px] object-contain" src={icon} alt={"new"}></img>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 sec-font">{discover.name}</div>
                <p className="text-gray-700 text-base sec-font">
                    {discover.description}
                </p>
            </div>
        </div>
    )
}
function EventsCard(props) {
    const usertype = useSelector(store => store.auth).usertype
    const event = props.event;
    return (
        <div className="bg-white shadow-md overflow-hidden rounded-sm">
            <div className="flex-col">
                <img className="h-48 w-full object-cover md:h-72 md:w-full" src={event.img} alt={"event image"}></img>
                <div className="mt-4 px-4">
                    <h2 className="main-font text-2xl">{event.name}</h2>
                    <div className="my-3">
                        <div className="flex items-center gap-2 text-md main-font my-1 text-[#0F4C75]">
                            <CalendarEvent />
                            <p>{`Starting At:  ${event.start.slice(0, 10)}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Home() {
    const [discoverData, setDiscover] = useState([]);
    const [events, setEvents] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    const client = useSelector(store => store.auth);
    const getDicoverData = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/cw_spaces/home`)
            .then(res => res.json())
            .then(responsedata => {
                setDiscover(responsedata.data);
            }
            ).catch(error => { setFetchError(true); });
    }
    const getEvents = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/events/home`)
            .then(res => res.json())
            .then(responsedata => {
                setEvents(responsedata.data);
            }
            ).catch(error => { setFetchError(true); });
    }
    useEffect(() => {
        getDicoverData();
        getEvents();
    }, [])
    return (
        <>
            <div className="w-4/5 mx-auto mt-[70px] h-[500px] relative bg-cover bg-center" style={{ backgroundImage: `url(${Image1})` }}>
                <div className="bg-black w-full h-full opacity-50 absolute"></div>
                <div className="w-full h-full text-white text-center absolute">
                    <div className="w-3/4 h-full mx-auto mt-[150px] max-sm:w-full max-sm:px-2">
                        <h2 className="md:text-4xl text-2xl font-bold">More Than a Desk: A Community of Possibilities</h2>
                        <p className="mt-4 md:text-lg text-sm font-light">At SPACE S, we believe in more than just shared office space.
                            We offer a dynamic community where diverse talents converge, ideas flourish, and connections thrive. Whether you're a freelancer, entrepreneur, or a growing team,
                            our flexible workspaces provide the perfect environment for productivity and networking.</p>
                    </div>
                </div>
            </div>
            <Slider />
            {!client?.user ? <div className="w-4/5 mx-auto mt-[40px] rounded-xl px-8 py-4 bg-gradient-to-r from-[#1B262C] to-[#0F4C75] text-white
            flex flex-col md:flex-row md:items-center justify-between ">
                <div className="md:w-10/12">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-2xl sec-font">Sign-in to Save</h2>
                        <Link className="text-[30px] cursor-pointer md:hidden hover:text-[#1B262C]" to="login">
                            <BoxArrowInRight />
                        </Link>
                    </div>
                    <p className="text-md mt-4 sec-font">To ensure a seamless booking experience, we kindly remind you to sign in to your account
                        before proceeding in any booking. Signing in allows us to personalize your
                        experience and ensures that you have access to all available options tailored to your preferences. </p>
                </div>
                <Link className="cursor-pointer hidden md:block hover:text-[#1B262C] duration-300 flex flex-col items-center text-center" to="login">
                    <BoxArrowInRight className="text-[60px] " />
                    <h2 className="text-md sec-font px-5">Login</h2>
                </Link>
            </div> : null}
            {discoverData?.length > 0 && <div className="w-4/5 mx-auto mt-[70px]">
                <h2 className="text-left mb-8 text-5xl main-font">Discover</h2>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {discoverData ? discoverData.map((cwspace) => {
                            return <DiscoverCard discover={cwspace} key={cwspace.cwID} />
                        }) : null}
                </div>
            </div>}
            {events?.length > 0 && <div className="w-4/5 mx-auto mt-[70px]">
                <h2 className="text-left mb-8 text-4xl text-center main-font">Upcoming Events&Workshops</h2>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {events ? events.map((cwspace) => {
                            return <EventsCard event={cwspace} key={cwspace.cwID} />
                        }) : null}
                </div>
                <Link to="events&workshops" className="my-4 underline text-[#3282B8] float-right">view all</Link>
            </div>}
        </>
    )
}

export default Home;