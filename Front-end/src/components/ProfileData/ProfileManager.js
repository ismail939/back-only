import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
function ProfileManager() {
    const [cwspace, setCwSpace] = useState([]);
    const [active, setActive] = useState("Personal Information");
    const user = useSelector(store => store.auth);
    const token = user.token;
    const usertype = user.usertype;
    const profileData = jwtDecode(token);
    const buttonStyle = "w-48 font-semibold px-2 py-3 hover:border-blue-500 border rounded-2xl text-md"
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
                    <Link to="personal-information"><button onClick={() => setActive("Personal Information")}
                            className={`${buttonStyle} ${active === "Personal Information" ? activeStyle : "hover:text-indigo-900"}`} >Personal Information</button></Link>
                    </div>
                    {(usertype==="owner" || usertype === "moderator") && <div className="my-7">
                        <Link to="workspace-data"><button className={`${buttonStyle} ${active === "WorkSpace Information" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("WorkSpace Information")}>WorkSpace Information</button></Link>
                    </div>}
                    {(usertype==="owner" || usertype === "moderator") && profileData.cwSpaceCwID !==null&&<div className="my-7">
                    <Link to="rooms-data"><button className={`${buttonStyle} ${active === "WorkSpace Rooms" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("WorkSpace Rooms")}>WorkSpace Rooms</button></Link>
                    </div>}
                    {(usertype==="owner" || usertype === "moderator") &&  profileData.cwSpaceCwID !==null &&<div className="my-7">
                    <Link to="offers-data"><button className={`${buttonStyle} ${active === "WorkSpace Offer" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("WorkSpace Offer")}>WorkSpace Offers</button></Link>
                    </div>}
                    {(usertype==="owner" || usertype === "moderator") &&  profileData.cwSpaceCwID !==null &&<div className="my-7">
                    <Link to="events&workshops-data"><button className={`${buttonStyle} ${active === "WorkSpace Event" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("WorkSpace Event")}>WorkSpace Event</button></Link>
                    </div>}
                    {usertype==="owner"&&  profileData.cwSpaceCwID !==null &&<div className="my-7">
                    <Link to="moderators"><button className={`${buttonStyle} ${active === "Moderators" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("Moderators")}>Moderators</button></Link>
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
                }
                {active === "WorkSpace Information" &&  profileData.cwSpaceCwID !==null &&
                    <SpaceSettings cwspace={cwspace} getCworkingSpaceData={getCworkingSpaceData}/>
                }
                {active === "WorkSpace Rooms"  &&
                    <RoomSettings cwid={profileData.cwSpaceCwID} />
                }
                {active === "WorkSpace Offer"  &&
                    <OfferSeetings cwid={profileData.cwSpaceCwID} />
                }
                {active === "WorkSpace Event"  &&
                    <EventSettings cwid={profileData.cwSpaceCwID} />
                }
                {active === "Moderators"  &&
                    <Moderators cwid={profileData.cwSpaceCwID}/>
                } */}
                
            </div>
        </>
    )
}
export default ProfileManager;