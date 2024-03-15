import { useEffect, useState } from "react";
import { ExclamationCircleFill, Eye, EyeSlash } from "react-bootstrap-icons";
import { ShowErrorMessage } from "./PortalLogin";
import { useParams } from "react-router-dom";
import { useUpdateClientMutation, useUpdatePhotoMutation } from "../reduxtoolkit/Slices/apiSlice";
import Swal from "sweetalert2";
function ResetPassword() {
    const [password, setPassword] = useState("")
    const [showpassword, setShowPassword] = useState(false);
    const [url, setUrl] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checkerror, setCheckError] = useState("")
    const [dataerrors, setDataErrors] = useState({
        password: false,
        confirmPassword: false,
    });
    useEffect(() => {
        const cu = window.location.href;
        setUrl(cu)
    }, [])
    console.log(url.slice(42))
    function compPassword() {
        if ((password !== confirmPassword) && (password !== "") && (confirmPassword !== "")) return false;
        else return true
    }

    const PasswordError = () => {
        if (password.length < 8) {
            setCheckError("password must be at least 8 characters");
            return true;
        } else if (password.search(/[a-z]/) < 0) {
            setCheckError("password must contain at least one lowercase letter");
            return true;
        } else if (password.search(/[A-Z]/) < 0) {
            setCheckError("password must contain at least one uppercase letter");
            return true;
        } else if (password.search(/[0-9]/) < 0) {
            setCheckError("password must contain at least one number");
            return true;
        }
        else if (password.search(/[@_&]/) < 0) {
            setCheckError("password must contain at least one special charachter ex:(@_&)");
            return true;
        }
        else {
            return false;
        }
    }
    const addPassword = () => {
        const id = usertype === "owner" ? profileData.ownerID :  profileData.clientID
        try {
            const data = JSON.stringify({
                "password": password,
                "reset":true,
                
            })
            updateData({ id: id, credentials: data , usertype: usertype })
        } catch (error) {
            console.log(error)
        }
    }
    function handlePasswords(e) {
        e.preventDefault()
        if (PasswordError()) {
            setDataErrors({
                password: true, confirmpassword: false
            })
        } else if (confirmPassword === "" || !compPassword()) {
            setDataErrors({
                password: false, confirmpassword: true
            })
            setCheckError("please confirm your password")
        } else {
            setDataErrors({
                password: false, confirmpassword: false
            })
            setCheckError("")
            sendPasswords();
        }
    }
    return (
        <>
            <div className="flex flex-col items-center mt-32 min-h-screen">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0">
                    <div className="p-6">
                        <h1 className="text-xl mb-4 font-bold text-gray-900 md:text-2xl">
                            Change Your Password
                        </h1>
                        <div className="">
                            <div>
                                <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                <div className="relative">
                                    <input type={showpassword ? "text" : "password"} name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border ${dataerrors.password ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5`} required
                                        onChange={(e) => { setPassword(e.target.value) }}></input>
                                    <span className="absolute top-[30%] right-2 text-lg z-10 cursor-pointer text-center" onClick={() => setShowPassword(!showpassword)}>
                                        {showpassword ? <Eye /> : <EyeSlash />}
                                    </span>
                                </div>
                                {dataerrors.password ? <ShowErrorMessage condition={true} value={checkerror} /> : <p className="m-0 mt-1 text-xs text-gray-500">Note: Password must be at least 8 charachters long with one lowercase, one uppercase and a number</p>}
                            </div>
                            <div className="">
                                <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                <input type="password" name="confirmpassword" id="confirmpassword" placeholder="••••••••" className={`bg-gray-50 border ${dataerrors.confirmpassword || !compPassword() ? "border-red-500 focus:outline-rose-600" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 `} required
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
                                {!compPassword() || dataerrors.confirmpassword ? <ShowErrorMessage condition={true} value={"Password doesn't match"} /> : null}
                            </div>
                            <div className="mt-4">
                                <button type="submit" className={`w-full btn-color rounded-sm text-md font-medium px-5 py-2.5 text-center duration-300`}
                                    onClick={(e) => handlePasswords(e)}>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default ResetPassword;