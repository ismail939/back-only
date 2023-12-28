import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import ProfileSettings from "../components/ProfileSettings";
import { Link } from "react-router-dom";
import SpaceSettings from "../components/SpaceSettings";
import OfferSeetings from "../components/OfferSettings";
import RoomSettings from "../components/RoomSettings";
function DashboardProfile() {
    const [active, setActive] = useState("Personal Information");
    const [cwspace, setCWSpace] = useState();
    const [dummyState,setDummyState]=useState();
    const user = useSelector(store => store.auth);
    const token = user.token;
    const usertype = user.usertype;
    const profileData = jwtDecode(token);
    const buttonStyle = "w-48 font-semibold px-2 py-3 hover:border-blue-500 border rounded-2xl text-md"
    const activeStyle = "bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"
    useEffect(() => {
        if(usertype==="owner" && profileData.cwSpaceCwID){
            getCworkingSpaceData();}
    }, [])
    const getCworkingSpaceData = () => {
        fetch(`http://localhost:4000/cw_spaces/${profileData.cwSpaceCwID}`)
            .then(res => res.json())
            .then(responsedata => {
                setCWSpace(responsedata.data);
            }
            ).catch(error => { console.log(error); });
    }
    return (
        < >
            <div className="flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row mx-8 md:mx-auto min-h-screen">
                <div className="  mx-8 ">
                    <div className="my-8">
                        <button onClick={() => setActive("Personal Information")}
                            className={`${buttonStyle} ${active === "Personal Information" ? activeStyle : "hover:text-indigo-900"}`} >Personal Information</button>
                    </div>
                    {usertype==="owner"&& <div className="my-8">
                        <button className={`${buttonStyle} ${active === "WorkSpace Information" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("WorkSpace Information")}>WorkSpace Information</button>
                    </div>}
                    {usertype==="owner"&& profileData.cwSpaceCwID !==null&&<div className="my-8">
                        <button className={`${buttonStyle} ${active === "WorkSpace Rooms" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("WorkSpace Rooms")}>WorkSpace Rooms</button>
                    </div>}
                    {usertype==="owner"&&  profileData.cwSpaceCwID !==null &&<div className="my-8">
                        <button className={`${buttonStyle} ${active === "WorkSpace Offer" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("WorkSpace Offer")}>WorkSpace Offers</button>
                    </div>}
                </div>
                {active === "Personal Information" && <ProfileSettings profileData={profileData} />
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
            </div>
        </>
    )
}
export default DashboardProfile;