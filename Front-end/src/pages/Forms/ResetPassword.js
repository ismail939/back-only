import { useEffect, useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { ShowErrorMessage } from "./PortalLogin";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
    const [password, setPassword] = useState("")
    const [showpassword, setShowPassword] = useState(false);
    const [token, setToken] = useState("");
    const [profileData, setProfileData] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checkerror, setCheckError] = useState("")
    const navigate = useNavigate();
    const [dataerrors, setDataErrors] = useState({
        password: false,
        confirmPassword: false,
    });
    useEffect(() => {
        const url = window.location.href;
        const token = url.slice(42);
        setToken(token)
        if(token) { const usertype = jwtDecode(url.slice(42))
        setProfileData(usertype)}
    }, [])
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
    const sendPassword = () => {
        const id = profileData.role === "owner" ? profileData.ownerID : profileData.clientID
        fetch(`${process.env.REACT_APP_BASE_URL}/${profileData.role}s/updatePassword/${id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "reset": true,
                "newPassword": password,
            })
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                profileData.role === "owner" ? navigate("../portal-login") : navigate("../login")
            } else if (data.status === "error") {
                console.log(data.message)
            } else if (data.status === "fail") {
                console.log("There is problem in the server")
            }
        })
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
            sendPassword();
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
                            <div className="mb-3">
                                <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                <div className="relative">
                                    <input type={showpassword ? "text" : "password"} name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border ${dataerrors.password ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5`} required
                                        onChange={(e) => { setPassword(e.target.value) }}></input>
                                    <span className="absolute top-[30%] right-2 text-lg z-10 cursor-pointer text-center" onClick={() => setShowPassword(!showpassword)}>
                                        {showpassword ? <Eye /> : <EyeSlash />}
                                    </span>
                                </div>
                                {dataerrors.password ? <ShowErrorMessage condition={true} value={checkerror} /> : <p className="m-0 mt-1 text-[11px] text-gray-500">Note: Password must be at least 8 charachters long with one lowercase, one uppercase and a number</p>}
                            </div>
                            <div className="mb-8">
                                <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm New Password</label>
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