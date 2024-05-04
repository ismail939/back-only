import { useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useUpdateClientMutation, useUpdatePhotoMutation } from "../../components/reduxtoolkit/Slices/apiSlice";
function PersonalInformation(props) {
    const user = useSelector(store => store.auth);
    const profileData = jwtDecode(user.token);
    const usertype = user.usertype;
    const [updateData] = useUpdateClientMutation();
    const [updatePhoto] = useUpdatePhotoMutation();
    const [firstName, setFirstName] = useState(profileData.fname);
    const [lastName, setLastName] = useState(profileData.lname);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confrimPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(profileData.phone);
    const [img, setImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const [email, setEmail] = useState(profileData.email);
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

    const imageUrl = `http://localhost:4000/images/${usertype}s/` + profileData.profilePic;
    const addImg = () => {
        const formData = new FormData();
        formData.append('profilePic', img);
        const id = usertype === "owner" ? profileData.ownerID : (usertype === "moderator" ? profileData.moderatorID : profileData.clientID)
        try {
            updatePhoto({ id: id, credentials: formData, usertype: usertype })
            setImgName("")
        } catch (error) {
            console.log(error)
        }
    }
    const addData = () => {
        const id = usertype === "owner" ? profileData.ownerID : profileData.clientID
        try {
            const data = JSON.stringify({
                "fname": firstName ? firstName : profileData.fname,
                "lname": lastName ? lastName : profileData.lname,
                "email": email ? email : profileData.email
            })
            updateData({ id: id, credentials: data, usertype: usertype })
        } catch (error) {
            console.log(error)
        }
    }
    const addPhone = () => {
        const id = usertype === "owner" ? profileData.ownerID : profileData.clientID
        try {
            const data = JSON.stringify({
                "phone": phoneNumber ? phoneNumber : profileData.phone
            })
            updateData({ id: id, credentials: data, usertype: usertype })
        } catch (error) {
            console.log(error)
        }
    }
    const addPassword = () => {
        const id = usertype === "owner" ? profileData.ownerID : (usertype === "moderator" ? profileData.moderatorID : profileData.clientID)
        try {
            const data = JSON.stringify({
                "reset": false,
                "oldPassword": oldPassword,
                "newPassword": newPassword,
            })
            updateData({ id: id, credentials: data, usertype: usertype })
        } catch (error) {
            console.log(error)
        }
    }
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
            setCheckError("Invalid Image format, accepted formats are png,jpg,jpeg");
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
    const reader = new FileReader();
    const handlePassword = (e) => {
        e.preventDefault();
        if (newPasswordError()) {
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
        <>
            <div className="w-full min-h-screen py-1 lg:w-3/4 " >
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Profile Photo</h2>
                <div className="my-4 border border-black-90 rounded-3xl max-w-3xl mx-auto mt-4" >
                    <div className="w-full flex flex-col items-center justify-center lg:px-16 md:px-8 px-4">
                        <img className=" object-cover w-60 h-60 p-1 rounded-full ring-2 ring-indigo-300 m-8 " src={img ? URL.createObjectURL(img) : imageUrl} alt="no-picture-added"></img>
                        <input className={`hidden`} id="uploadProfileImg"
                            onChange={(e) => { setImg(e.target.files[0]); setImgName(e.target.files[0]?.name) }}
                            accept=".png,.jpg,.jpeg" type="file" ></input>
                        {dataerrors.imgName ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                        <div className="flex flex-row-reverse w-full justify-center items-center gap-5">
                            <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${!imgName?.trim() ? "bg-gray-500" : "btn-color border-indigo-200"}
                        rounded-lg border`} disabled={!imgName?.trim()} onClick={(e) => handleImage(e)}>Save</button>
                            <label htmlFor="uploadProfileImg" className="py-2 px-4 font-medium text-white rounded-lg bg-[#3282B8] hover:bg-[#4292C8] duration-200 cursor-pointer">Change Image</label>
                        </div>
                    </div>
                </div>
                {usertype !== "moderator" && <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Basic Information</h2>}
                {usertype !== "moderator" && <div className="my-4 border border-black-90 rounded-3xl max-w-3xl mx-auto mt-4">
                    <div className="w-full xl:px-16 md:px-6 px-4">
                        <div className="my-4 w-full flex justify-between items-center" >
                            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5 gap-2">First Name</label>
                            <div className="w-full">
                                <input className={`bg-gray-50 border placeholder-gray-900 ${dataerrors.fname ? "border-red-500" : "border-gray-300"}
                            text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 w-full`}
                                    onChange={(e) => setFirstName(e.target.value)} type="text" value={firstName} ></input>
                                {dataerrors.fname ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                        </div>
                        <div className="my-4 w-full flex justify-between items-center">
                            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5 gap-2">Last Name</label>
                            <div className="w-full">
                                <input className={`bg-gray-50 border placeholder-gray-900 ${dataerrors.lname ? "border-red-500" : "border-gray-300"} 
                            text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                                    onChange={(e) => setLastName(e.target.value)} type="text" value={lastName}></input>
                                {dataerrors.lname ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                        </div >
                        <div className="my-4 w-full flex justify-between items-center">
                            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5 gap-2">Email</label>
                            <div className="w-full">
                                <input className={`bg-gray-50 border placeholder-gray-900 ${dataerrors.email ? "border-red-500" : "border-gray-300"} 
                            text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                                    type="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                                {dataerrors.email ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                        </div>
                        <div className="flex flex-row-reverse w-full">
                            <button disabled={firstName === profileData.fname && lastName === profileData.lname && email === profileData.email}
                                onClick={e => HandleError(e)} className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${firstName === profileData.fname && lastName === profileData.lname && email === profileData.email ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-lg border`} >Save</button>
                        </div>
                    </div>
                </div>}
                {usertype !== "moderator" && <><h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">PhoneNumber</h2>
                    <div className="my-4 border  border-black-90 rounded-3xl max-w-3xl mx-auto mt-4">
                        <div className="flex justify-between items-center py-4 xl:px-16 md:px-6 px-4 gap-8">
                            <input className={`bg-gray-50 border ${dataerrors.phonenumber ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                                onChange={(e) => setPhoneNumber(e.target.value)} type="text"
                                value={phoneNumber} ></input>
                            <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${phoneNumber === profileData.phone ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-lg border`} disabled={phoneNumber === profileData.phone}
                                onClick={e => handlePhone(e)} >Save</button>
                        </div>
                        <div className="px-16 mb-3">
                            {dataerrors.phonenumber ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                        </div>
                    </div></>}
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Passsword</h2>
                <div className="my-4 border border-black-90 rounded-3xl max-w-3xl mx-auto mt-4">
                    <div className="w-full xl:px-16 md:px-6 px-4">
                        <div className="my-4 w-full flex justify-between items-center gap-2" >
                            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5">Old Password</label>
                            <div className="w-full">
                                <input type="password" onChange={(e) => setOldPassword(e.target.value)} className={`bg-gray-50 border ${dataerrors.oldpassword ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg w-full p-2.5`}></input>
                                {dataerrors.oldpassword ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                        </div>
                        <div className="my-4 w-full flex justify-between items-center gap-2">
                            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5">New Password</label>
                            <div className="w-full">
                                <input type="password" onChange={(e) => setNewPassword(e.target.value)} className={`bg-gray-50 border ${dataerrors.newpassword ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg w-full p-2.5`}></input>
                                {dataerrors.newpassword ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                        </div>
                        <div className="my-4 w-full flex justify-between items-center gap-2">
                            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5">Confirm Password</label>
                            <div className="w-full">
                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className={`bg-gray-50 border ${dataerrors.confrimpassword ? "border-red-500" : "border-gray-300"} 
                        text-gray-900 sm:text-sm rounded-lg  w-full p-2.5`}></input>
                                {dataerrors.confrimpassword ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                                {!compPassword() ? <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 inline-block">Password doesn't match</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-row-reverse w-full">
                            <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${!oldPassword.trim() || !newPassword.trim() || !confrimPassword.trim() ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-lg border`} disabled={!oldPassword.trim() || !newPassword.trim() || !confrimPassword.trim()} onClick={(e) => handlePassword(e)} >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PersonalInformation;