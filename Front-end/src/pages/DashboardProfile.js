import { useState, useEffect } from "react";
import ProfileSettings from "../components/ProfileSettings";
function DashboardProfile() {
    const [active, setActive] = useState("account settings");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confrimPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [img, setImg] = useState([]);
    const [imgName, setImgName] = useState("");
    const [email, setEmail] = useState("");
    const [profileData, setProfileData] = useState([]);
    const [checkerror, setCheckError] = useState("");
    const [dataerrors, setDataErrors] = useState({
        fname: false,
        lname: false,
        email: false,
        imgName: false,
        phonenumber: false,
        oldpassword: false,
        newpassword: false,
        confrimpassword: false
    });
    const addImg = () => {
        const formData = new FormData();
        formData.append('profilePic', img);
        fetch('http://localhost:4000/owners/addPhoto/mango', {
            method: 'PATCH',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "error") { console.log(data.message) }
                else if (data.status === "success") { console.log(data) }
            })
    }
    const addData = () => {
        fetch('http://localhost:4000/owners/mango', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fname": firstName ? firstName : profileData.fname,
                "lname": lastName ? lastName : profileData.lname,
                "email": email ? email : profileData.email
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") { console.log(data) }
            })
    }
    const addPhone = () => {
        fetch('http://localhost:4000/owners/mango', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "phone": phoneNumber ? phoneNumber : profileData.phone,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") { console.log(data) }
            })
    }
    const addPassword = () => {
        fetch('http://localhost:4000/owners/mango', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "password": newPassword ? newPassword : profileData.password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") { console.log(data) }
            })
    }
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
    const imageUrl = "http://localhost:4000/images/owners/" + profileData.profilePic;
    function isImage(imageName) {
        if (imageName.slice(-4) === ".jpg" || imageName.slice(-5) === ".jpeg" ||
            imageName.slice(-4) === ".png" || imageName.length === 0) return true;
        else {
            return false;
        }
    }
    const NameError = (name) => {
        const regex = /^[A-Za-z]+$/;
        if (!name.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
    const emailError = () => {
        const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
        if (!email.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
    const PhoneNumberError = (phonenumber) => {
        var numbers = /^01[1205][0-9]{8}$/;
        if (!phonenumber.match(numbers)) {
            return true;
        } else {
            return false;
        }
    };
    const HandleError = (e) => {
        e.preventDefault();
        if (firstName.length > 0 && NameError(firstName)) {
            setDataErrors({
                "fname": true, "lname": false,
                "email": false, "imgName": false, "phonenumber": false, oldpassword: false, newpassword: false, confrimpassword: false
            })
            setCheckError("please fill in the first name correctly"); window.scrollTo(0, 100);
        }
        else if (lastName.length > 0 && NameError(lastName)) {
            setDataErrors({
                "fname": false, "lname": true,
                "email": false, "imgName": false, "phonenumber": false, oldpassword: false, newpassword: false, confrimpassword: false
            })
            setCheckError("please fill in the last name correctly"); window.scrollTo(0, 100);
        }
        else if (email.length > 0 && emailError()) {
            setDataErrors({
                "fname": false, "lname": false,
                "email": true, "imgName": false, "phonenumber": false, oldpassword: false, newpassword: false, confrimpassword: false
            })
            setCheckError("please write a valid email address"); window.scrollTo(0, 300);
        }
        else {
            setCheckError("");
            setDataErrors({
                "fname": false, "lname": false,
                "email": false, "imgName": false, "phonenumber": false, oldpassword: false, newpassword: false, confrimpassword: false
            })
            addData();
        }
    };
    const handleImage = (e) => {
        e.preventDefault();
        if (!isImage(imgName)) {
            setDataErrors({
                "fname": false, "lname": false,
                "email": false, "imgName": true, "phonenumber": false, oldpassword: false, newpassword: false, confrimpassword: false
            })
            setCheckError("accepted formats are png,jpg,jpeg");
        }
        else {
            addImg();
            setCheckError("");
        }
    }
    const handlePhone = (e) => {
        e.preventDefault();
        if (PhoneNumberError(phoneNumber)) {
            setDataErrors({
                "fname": false, "lname": false,
                "email": false, "imgName": false, "phonenumber": true, oldpassword: false, newpassword: false, confrimpassword: false
            })
            setCheckError("please write a correct phone number ex:01012345678");
        }
        else {
            setCheckError("");
            addPhone();
        }
    }
    function compPassword() {
        if ((newPassword !== confrimPassword) && (newPassword !== "") && (confrimPassword !== "")) return false;
        else return true
    }
    const newPasswordError = () => {
        if (newPassword.length < 8) {
            setCheckError("password must be at least 8 characters");
            return true;
        } else if (newPassword.search(/[a-z]/) < 0) {
            setCheckError("password must contain at least one lowercase letter");
            return true;
        } else if (newPassword.search(/[A-Z]/) < 0) {
            setCheckError("password must contain at least one uppercase letter");
            return true;
        } else if (newPassword.search(/[0-9]/) < 0) {
            setCheckError("password must contain at least one number");
            return true;
        }
        else if (newPassword.search(/[@_&]/) < 0) {
            setCheckError("password must contain at least one special charachter ex:(@_&)");
            return true;
        }
        else {
            return false;
        }
    }

    const handlePassword = (e) => {
        e.preventDefault();
        if (profileData.password != oldPassword) {
            setDataErrors({
                "fname": false, "lname": false,
                "email": false, "imgName": false, "phonenumber": false, oldpassword: true, newpassword: false, confrimpassword: false
            })
            setCheckError("old password is not correct")
        }
        else if (newPasswordError()) {
            setDataErrors({
                "fname": false, "lname": false,
                "email": false, "imgName": false, "phonenumber": false, oldpassword: false, newpassword: true, confrimpassword: false
            })
            setCheckError("password must contain capital letter and special character")
        } else if (confrimPassword === "" || !compPassword()) {
            setDataErrors({
                "fname": false, "lname": false,
                "email": false, "imgName": false, "phonenumber": true, oldpassword: false, newpassword: false, confrimpassword: true
            })
            setCheckError("please confirm your password")

        }
        else {
            setCheckError("")
            addPassword();
        }
    }
    return (
        < >
            <div className="w-full grid grid-cols-12">
                <div className="p-2 overflow-y-auto rounded-3xl text-center bg-gray-100 col-span-3">
                    <div className="my-8">
                        <button onClick={() => setActive("account settings")} className="md:w-36 w-32 mb-5 text-white btn-color flex
                     focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 
                     justify-center items-center gap-2">account settings</button>
                    </div>
                    <div className="my-8">
                        <button className="md:w-36 w-32 mb-5 text-white btn-color flex
                     focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 
                     justify-center items-center gap-2" onClick={() => setActive("space settings")}>space settings</button>
                    </div>
                </div>
                {active === "account settings" && <div className="w-full  bg-gray-100 p-8 rounded-3xl col-span-9 " >
                    <div className="" >
                        <div className="my-4 border  border-black-90 rounded-3xl   ">
                            <label className="mb-4 text-xl text-center" />Profile Photo
                            <img className=" rounded-full h-32 w-32 mb-4 " src={imageUrl} alt="no image added"></img>
                            <input className={`bg-gray-50 border mb-4 ${dataerrors.imgName ? "border-red-500" : "border-gray-300"}
                         text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                onChange={(e) => { setImg(e.target.files[0]); setImgName(e.target.files[0].name) }}
                                accept=".png,.jpg,.jpeg" type="file" ></input>
                            {dataerrors.imgName ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            <button className="md:w-36 w-32 mb-5 text-white btn-color flex focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" disabled={!imgName.trim()} onClick={(e) => handleImage(e)}>save</button>
                        </div>
                    </div>
                    <div className="mb-4 border  border-black-90 rounded-3xl">
                        <h1 className="text-xl text-center">basic information</h1>
                        <div className="">
                            <div className="my-4" >
                                <label className="" />First Name
                                <input className={`bg-gray-50 border ${dataerrors.fname ? "border-red-500" : "border-gray-300"}
                         text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                                    onChange={(e) => setFirstName(e.target.value)} type="text" placeholder={profileData.fname} ></input>
                                {dataerrors.fname ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                            <div className="my-4">
                                <label className="" />Last Name
                                <input className={`bg-gray-50 border ${dataerrors.lname ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                                    onChange={(e) => setLastName(e.target.value)} type="text" placeholder={profileData.lname}></input>
                                {dataerrors.lname ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div >
                            <div className="my-4">
                                <label className="" />email
                                <input className={`bg-gray-50 border ${dataerrors.email ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                                    type="email" onChange={(e) => setEmail(e.target.value)} placeholder={profileData.email}></input>
                                {dataerrors.email ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                            <div>
                                <button cla disabled={!firstName.trim() && !lastName.trim() && !email.trim()}
                                    onClick={e => HandleError(e)} className="md:w-36 w-32 mb-5 text-white btn-color flex focus:outline-none font-medium
                             rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" >save</button>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 border  border-black-90 rounded-3xl">
                        <label className="" />phone number
                        <input className={`bg-gray-50 border ${dataerrors.email ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                            onChange={(e) => setPhoneNumber(e.target.value)} type="text"
                            placeholder={profileData.phone} ></input>
                        {dataerrors.phonenumber ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                        <button className="md:w-36 w-32 mb-5 text-white btn-color flex focus:outline-none 
                    font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" disabled={!phoneNumber.trim()}
                            onClick={e => handlePhone(e)} >change Phone Number </button>
                    </div>

                    <div className="my-4 my-4 border  border-black-90 rounded-3xl">
                        <div className="my-4" >
                            <label className="mx-4" />old password
                            <input type="password" onChange={(e) => setOldPassword(e.target.value)} className={`bg-gray-50 border ${dataerrors.oldpassword ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}></input>
                            {dataerrors.oldpassword ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                        </div>
                        <div className="my-4">
                            <label className="mx-4" />new password
                            <input type="password" onChange={(e) => setNewPassword(e.target.value)} className={`bg-gray-50 border ${dataerrors.newpassword ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}></input>
                            {dataerrors.newpassword ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                        </div>
                        <div className="my-4">
                            <label className="mx-4" />confirm new password
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className={`bg-gray-50 border ${dataerrors.confrimpassword ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}></input>
                            {dataerrors.confrimpassword ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            {!compPassword() ? <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 inline-block">Password doesn't match</p> : null}
                        </div>
                        <button className="md:w-36 w-32 mb-5 text-white btn-color flex
                     focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 
                     justify-center items-center gap-2" disabled={!oldPassword.trim() && !newPassword.trim() && !confrimPassword.trim()} onClick={(e) => handlePassword(e)} >change password </button>
                    </div>
                </div>
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