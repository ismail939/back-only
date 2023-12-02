import { useState } from "react";
import ProfileSettings from "../components/ProfileSettings";
function DashboardProfile() {
    const [active, setActive] = useState("account settings");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [userName, setUserName] = useState("");
    // const [password, setPassword] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
    // const [profilePhoto,setProfilePhoto]=useState("");
    // const [email,setEmail]=useState("");
    const [profileData,setProfileData]=useState([]);
    const getProfileData= ()=>{
        fetch("")
        .then(res => res.json())
        .then(responseData=>
            {
                console.log(responseData)
                setProfileData(responseData.data);
            })
        .catch(error=>console.log(error))
    }
    return (
        < >
            <div>
                <div className="my-8">
                    <button className="btn-color">account settings</button>
                </div>
                <div className="my-8">
                    <button className="btn-color" onClick={() => setActive("space settings")}>space settings</button>
                </div>
            </div>
            <br></br>
            {active==="account settings"&&<div>
                {getProfileData()}
                <div>
                    <h1 className="text-xl">basic information</h1>
                </div>
                <div className="m-8">
                    <div >
                        <button >change First Name</button>
                        <input className="mx-4"  type="email" placeholder={profileData.firstName}></input>
                        <label className="mx-4"/>First Name
                    </div>
                    <div>
                        <button>change Last Name</button>
                        <input className="mx-4"  type="email" placeholder={profileData.lastName}></input>
                        <label className="mx-4"/>Last Name
                    </div>
                    <div>
                        <button>change Email </button>
                        <input className="mx-4"  type="email" placeholder={profileData.email}></input>
                        <label className="mx-4"/>email
                    </div>
                    <div>
                        <button>change profile picture</button>
                        <input className="mx-4"  accept=".png,.jpg,.jpeg" type="file" placeholder={profileData.mainPhoto}></input>
                        <label className="mx-4"/>Profile Photo 
                    </div>
                </div>
            </div>
            }
        </>

    )
}
export default DashboardProfile;