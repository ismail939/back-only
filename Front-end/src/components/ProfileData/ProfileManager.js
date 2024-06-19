import { useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Outlet, Link } from "react-router-dom";
import { FilterRight } from "react-bootstrap-icons";
function ProfileManager() {
    const [active, setActive] = useState(window.location.href.split("/")[3]);
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector(store => store.auth);
    const token = user.token;
    const usertype = user.usertype;
    const profileData = jwtDecode(token);
    const buttonStyle = "font-semibold px-2 py-3 text-sm md:w-48 hover:border-blue-500 border md:rounded-2xl w-full"
    const activeStyle = "bg-[#0F4C75] text-white hover:bg-[#197ec2] border-[#0F4C75] border-b-2 duration-300"
    return (
        < >
            <div className="flex flex-col gap-5 md:px-8 xl:px-28 md:flex-row mx-8 md:mx-auto min-h-screen">
                <div className="lg:mx-8 lg:w-auto md:mt-4">
                    <div className="text-[30px] my-7 flex flex-row-reverse md:hidden">
                        <FilterRight className="cursor-pointer hover:text-[#197ec2] duration-200" onClick={()=> setShowMenu(!showMenu)}/>
                    </div>
                    <div className={`md:block max-md:animate-slide-down ${showMenu ? "block" : "hidden"} duration-200`}>
                        <div className="md:my-7 my-4">
                            <Link to="personal-information"><button onClick={() => setActive("personal-information")}
                                className={`${buttonStyle} ${active === "personal-information" ? activeStyle : "hover:text-indigo-900"}`} >Personal Information</button></Link>
                        </div>
                        {(usertype === "client") && <div className="md:my-7 my-4">
                            <Link to="client-requests"><button className={`${buttonStyle} ${active === "client-requests" ? activeStyle : "hover:text-indigo-900"}`}
                                onClick={() => setActive("client-requests")}>Requests</button></Link>
                        </div>}
                        {(usertype === "client") && <div className="md:my-7 my-4">
                            <Link to="client-books"><button className={`${buttonStyle} ${active === "client-books" ? activeStyle : "hover:text-indigo-900"}`}
                                onClick={() => setActive("client-books")}>Bookings</button></Link>
                        </div>}
                        {(usertype === "owner" || usertype === "moderator") && <div className="md:my-7 my-4">
                            <Link to="workspace-data"><button className={`${buttonStyle} ${active === "workspace-data" ? activeStyle : "hover:text-indigo-900"}`}
                                onClick={() => setActive("workspace-data")}>WorkSpace Information</button></Link>
                        </div>}
                        {(usertype === "owner" || usertype === "moderator") && profileData.cwSpaceCwID !== null && <div className="md:my-7 my-4">
                            <Link to="rooms-data"><button className={`${buttonStyle} ${active === "rooms-data" ? activeStyle : "hover:text-indigo-900"}`}
                                onClick={() => setActive("rooms-data")}>WorkSpace Rooms</button></Link>
                        </div>}
                        {(usertype === "owner" || usertype === "moderator") && profileData.cwSpaceCwID !== null && <div className="md:my-7 my-4">
                            <Link to="offers-data"><button className={`${buttonStyle} ${active === "offers-data" ? activeStyle : "hover:text-indigo-900"}`}
                                onClick={() => setActive("offers-data")}>WorkSpace Offers</button></Link>
                        </div>}
                        {(usertype === "owner" || usertype === "moderator") && profileData.cwSpaceCwID !== null && <div className="md:my-7 my-4">
                            <Link to="events&workshops-data"><button className={`${buttonStyle} ${active === "events&workshops-data" ? activeStyle : "hover:text-indigo-900"}`}
                                onClick={() => setActive("events&workshops-data")}>WorkSpace Event</button></Link>
                        </div>}
                        {usertype === "owner" && profileData.cwSpaceCwID !== null && <div className="md:my-7 my-4">
                            <Link to="moderators"><button className={`${buttonStyle} ${active === "moderators" ? activeStyle : "hover:text-indigo-900"}`}
                                onClick={() => setActive("moderators")}>Moderators</button></Link>
                        </div>}
                    </div>
                </div>
                <Outlet />

            </div>
        </>
    )
}
export default ProfileManager;