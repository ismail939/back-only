import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import ProfileSettings from "../components/ProfileSettings";
import OwnerAccountSettings from "../components/OwnerAccountSettings";
import { Link } from "react-router-dom";
import SpaceSettings from "../components/SpaceSettings";
function DashboardProfile() {
    const [active, setActive] = useState("account settings");
    const [cwspace, setCWSpace] = useState();
    const [dummyState,setDummyState]=useState();
    const user = useSelector(store => store.auth);
    const token = user.token;
    const [cwSpacePhotos, setCwSpacePhotos] = useState([]);
    const usertype = user.usertype;
    const profileData = jwtDecode(token);
    const buttonStyle = "w-48 font-semibold px-8 py-3 hover:border-blue-500 border rounded-2xl"
    const activeStyle = "bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"
    
    useEffect(() => {
        getCworkingSpaceData();
        getCworkingSpacePhotos();
    }, [])
    const getCworkingSpaceData = () => {
        fetch("http://localhost:4000/cw_spaces/4")
            .then(res => res.json())
            .then(responsedata => {
                console.log("1",responsedata.data)
                setCWSpace(responsedata.data);
            }
            ).catch(error => { console.log(error); });
    }
    const getCworkingSpacePhotos = () => {
        fetch(`http://localhost:4000/cw_spacePhotos/4`)
            .then(res => res.json())
            .then(responsedata => {
                
                setCwSpacePhotos(responsedata.data);
            }
            ).catch(error => { console.log(error); });
    }
    return (
        < >
        {console.log("2",cwspace)}
            <div className="flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row mx-8 md:mx-auto">
                <div className="  mx-8 ">
                    <div className="my-8">
                        <button onClick={() => setActive("account settings")}
                            className={`${buttonStyle} ${active === "account settings" ? activeStyle : "hover:text-indigo-900"}`} >Account Settings</button>
                    </div>
                    <div className="my-8">
                        <button className={`${buttonStyle} ${active === "space settings" ? activeStyle : "hover:text-indigo-900"}`}
                            onClick={() => setActive("space settings")}>Space Settings</button>
                    </div>
                </div>
                {active === "account settings" && <OwnerAccountSettings profileData={profileData} />
                }
                {/* {active === "space settings" && profileData.cwSpaceCwID===null &&
                    <div>
                        you didnt create a coworking space yet 
                        <br></br>
                        <Link to="../createworkspace" className="font-medium text-primary-600 hover:underline"> create working space </Link>
                    </div>
                } */}
                {active === "space settings" && cwspace !== null &&
                    <SpaceSettings cwspace={cwspace} cwSpacePhotos={cwSpacePhotos}/>
                }
            </div>
        </>
    )
}
export default DashboardProfile;