import { useState, useEffect } from "react";
import ProfileSettings from "../components/ProfileSettings";
import OwnerAccountSettings from "../components/OwnerAccountSettings";
function DashboardProfile() {
    const [active, setActive] = useState("account settings");
    const [profileData, setProfileData] = useState([]);
    const GetProfileData = () => {
        fetch("http://localhost:4000/owners/mango")
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
                        <button onClick={() => setActive("account settings")} className="  flex 
                        font-semibold  px-12 py-3 hover:border-blue-500
                        hover:text-indigo-900 border rounded-2xl" >account settings</button>
                    </div>
                    <div className="my-8">
                        <button className=" flex 
                        font-semibold  px-14 py-3
                        hover:text-indigo-900 border border-grey-500 rounded-2xl hover:border-blue-500" onClick={() => setActive("space settings")}>space settings</button>
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