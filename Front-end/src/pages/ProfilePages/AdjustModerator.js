import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShowErrorMessage } from "../Forms/PortalLogin";
import { useSelector } from "react-redux";
function AdjustModerator() {
    const params = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [confrimPassword, setConfirmPassword] = useState("");
    const [checkerror, setCheckError] = useState("");
    const token = useSelector(store => store.auth).token;
    const [dataerrors, setDataErrors] = useState({
        newpassword: false,
        confrimpassword: false
    });
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
    function HandleChange(e){
        e.preventDefault();
        if (newPasswordError()) {
            setDataErrors({
                newpassword: true, confrimpassword: false
            })
            setCheckError("password must contain capital letter and special character")
        } else if (confrimPassword === "" || !compPassword()) {
            setDataErrors({
                newpassword: false, confrimpassword: true
            })
        }
        else {
            setCheckError("")
            setDataErrors({
                newpassword: false, confrimpassword: false
            })
            changePassword();
        }
    }
    function changePassword(){
        fetch(`http://localhost:4000/owners/updateModeratorPassword`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "password": newPassword,
                "ID": params.moderid
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                window.location.reload();
            } else if (data.status === "error") {
                console.log(data)
            } else if (data.status === "fail") {
                console.log(data)
            }
        }).catch(error =>console.log(error))
    }
    return(
        <div className="w-full min-h-screen py-1 lg:w-3/4">
            <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Change Password</h2>
                <div className="mt-8 border border-black-90 rounded-sm max-w-3xl mx-auto mt-4">
                    <div className="w-full md:px-10 px-4">
                        <div className="my-4 w-full flex justify-between items-center gap-2">
                            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5">New Password</label>
                            <div className="w-full">
                                <input type="password" className={`bg-gray-50 border ${dataerrors.newpassword ? "border-red-500" : "border-gray-300"}
                        text-gray-900 sm:text-sm rounded-sm w-full p-2.5`} onChange={(e) => setNewPassword(e.target.value)}></input>
                        <ShowErrorMessage condition={dataerrors.newpassword} value={checkerror} />
                            </div>
                        </div>
                        <div className="my-4 w-full flex justify-between items-center gap-2">
                            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5">Confirm Password</label>
                            <div className="w-full">
                                <input type="password" className={`bg-gray-50 border ${dataerrors.confrimpassword ? "border-red-500" : "border-gray-300"}
                        text-gray-900 sm:text-sm rounded-sm  w-full p-2.5`} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                <ShowErrorMessage condition={!compPassword() || dataerrors.confrimpassword} value={"Password doesn't match"} />
                            </div>
                        </div>
                        <div className="flex flex-row-reverse w-full">
                            <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${!newPassword.trim() || !confrimPassword.trim() ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-md border`} disabled={!newPassword.trim() || !confrimPassword.trim()} onClick={(e) => HandleChange(e)}>Save</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AdjustModerator