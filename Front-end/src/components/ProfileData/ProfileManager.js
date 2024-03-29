import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
function ProfileManager() {
    const [cwspace, setCwSpace] = useState([]);
    const [active, setActive] = useState(window.location.href.split("/")[3]);
    const user = useSelector(store => store.auth);
    const token = user.token;
    const usertype = user.usertype;
    const profileData = jwtDecode(token);
    const buttonStyle = "w-48 font-semibold px-2 py-3 hover:border-blue-500 border rounded-2xl text-sm"
    const activeStyle = "bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"
    const getCworkingSpaceData = () => {
        fetch(`http://localhost:4000/cw_spaces/${profileData.cwSpaceCwID}`)
            .then(res => res.json())
            .then(responsedata => {
                setCwSpace(responsedata.data);
            }
            ).catch(error => { console.log(error); });
    }
    useEffect(() => {
        getCworkingSpaceData();
    }, [])
    return (
        < >
            <div className="flex flex-col gap-5 px-3 lg:px-16 lg:px-28 lg:flex-row mx-8 lg:mx-auto min-h-screen">
                <div className="mx-8">
                    <div className="my-7">
                    <Link to="personal-information"><button onClick={() => setActive("personal-information")}
                            className={`${buttonStyle} ${active === "personal-information" ? activeStyle : "hover:text-indigo-900"}`} >Personal Information</button></Link>
                    </div>
                    {(usertype==="owner" || usertype === "moderator") && <div className="my-7">
                        <Link to="workspace-data"><button className={`${buttonStyle} ${active === "WorkSpace Information" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("WorkSpace Information")}>WorkSpace Information</button></Link>
                    </div>}
                    {(usertype==="owner" || usertype === "moderator") && profileData.cwSpaceCwID !==null&&<div className="my-7">
                    <Link to="rooms-data"><button className={`${buttonStyle} ${active === "rooms-data" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("rooms-data")}>WorkSpace Rooms</button></Link>
                    </div>}
                    {(usertype==="owner" || usertype === "moderator") &&  profileData.cwSpaceCwID !==null &&<div className="my-7">
                    <Link to="offers-data"><button className={`${buttonStyle} ${active === "offers-data" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("offers-data")}>WorkSpace Offers</button></Link>
                    </div>}
                    {(usertype==="owner" || usertype === "moderator") &&  profileData.cwSpaceCwID !==null &&<div className="my-7">
                    <Link to="events&workshops-data"><button className={`${buttonStyle} ${active === "events&workshops-data" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("events&workshops-data")}>WorkSpace Event</button></Link>
                    </div>}
                    {usertype==="owner"&&  profileData.cwSpaceCwID !==null &&<div className="my-7">
                    <Link to="moderators"><button className={`${buttonStyle} ${active === "moderators" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("moderators")}>Moderators</button></Link>
                    </div>}
                </div>
                <Outlet context={[cwspace,getCworkingSpaceData]}/>
                {/* {active === "Personal Information" && <ProfileSettings profileData={profileData} />
                }
                {active === "WorkSpace Information" && profileData.cwSpaceCwID===null &&
                    <div className="w-full flex flex-col items-center md:mt-[250px] mt-[100px] text-center">
                        <p className="text-xl font-medium">You don't have any created Coworking space yet</p>
                        <p className="my-6">Create your first Coworking Space Here:</p>
                        <Link to="../createworkspace" className="px-2 py-4 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"> create working space</Link>
                    </div>
                } */}
                
            </div>
        </>
    )
}
export default ProfileManager;