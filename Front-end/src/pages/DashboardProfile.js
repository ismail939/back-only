import { useState, useEffect } from "react";
import ProfileSettings from "../components/ProfileSettings";
import OwnerAccountSettings from "../components/OwnerAccountSettings";
function DashboardProfile() {
    const [active, setActive] = useState("account settings");
    const [profileData, setProfileData] = useState([]);
    const buttonStyle = "w-48 font-semibold px-8 py-3 hover:border-blue-500 border rounded-2xl"
    const activeStyle= "bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"
    const GetProfileData = () => {
        fetch("http://localhost:4000/owners/owner123")
            .then(res => res.json())
            .then(responseData => {
                console.log(responseData)
                setProfileData(responseData.data);
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        GetProfileData();
    }, [])
    
    
    return (
        < >
            <div className="flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row">
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
                {active === "account settings" && <OwnerAccountSettings profileData={profileData}/>
                }
                {active === "space settings" &&
                    <div>
                    </div>
                }
            </div>
        </>

    )
}
export default DashboardProfile;