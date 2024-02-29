import { useState } from "react";
import { ExclamationCircleFill } from "react-bootstrap-icons";
function ShowErrorMessage(props) {
    const condition = props.condition;
    const value = props.value;
    return (
        <>
            {condition ? <span className="text-[12px] text-red-500 flex gap-1 items-center mt-1"><ExclamationCircleFill />{value}</span> : null}
        </>
    )
}
function Moderators() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkerror, setCheckError] = useState("");
    const [dataerrors, setDataErrors] = useState({
        username: false,
        password: false,
        confirmPassword: false,
    });
    const UsernameError = () => {
        var letterNumber = /^[0-9a-zA-Z@&_]+$/;
        if (!username.match(letterNumber)) {
            return true;
        }
        else if (username.length < 3 || username.length > 20) {
            return true;
        }
        else {
            return false;
        }
    }
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
    function createModerator(){
        fetch(`http://localhost:4000/moderators`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
            } else if (data.status === "error") {
                checkerror(data.message)
            } else if (data.status === "fail") {
                checkerror("oops, something wrong went on !")
            }
        })
    }
    const HandleError = (e) => {
        e.preventDefault();
        if (UsernameError()) {
            setDataErrors({
                username: true, password: false, confirmPassword: false
            })
            setCheckError("please write a valid username")
        } else if (PasswordError()) {
            setDataErrors({
                username: false, password: true, confirmPassword: false
            })
        } else if (confirmPassword === "" || !compPassword()) {
            setDataErrors({
                username: false, password: false, confirmPassword: true
            })
            setCheckError("please confirm your password")
        } else {
            setDataErrors({
                username: false, password: false, confirmPassword: false
            })
            setCheckError("")
        }
    }
    return (
        <div className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 " >
            <h2 className="mx-auto mt-8 px-2 font-bold text-2xl">Moderators</h2>
            <div className="mx-auto mt-8 px-2">
                <h2 className="my-4 font-bold text-lg">Create Moderator</h2>
                <form className="space-y-4 md:space-y-6 lg:w-3/5 w-full" action="#">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                        <input type="text" name="username" id="username"
                            className={`bg-gray-50 border-b-2 ${dataerrors.username ? "border-red-500 outline-red-500" : "border-[#3282B8] outline-[#3282B8]"} text-gray-900 sm:text-sm block w-full p-2.5`} placeholder="enter your username"
                            onChange={(e) => setUserName(e.target.value)}></input>
                        <ShowErrorMessage condition={dataerrors.username} value={checkerror} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            className={`bg-gray-50 border-b-2 ${dataerrors.password ? "border-red-500 outline-red-500" : "border-[#3282B8] outline-[#3282B8]"} text-gray-900 sm:text-sm block w-full p-2.5`}
                            onChange={(e) => setPassword(e.target.value)}></input>
                        <ShowErrorMessage condition={dataerrors.password} value={checkerror} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
                            className={`bg-gray-50 border-b-2 ${!compPassword() || dataerrors.password ? "border-red-500 outline-red-500" : "border-[#3282B8] outline-[#3282B8]"} text-gray-900 sm:text-sm block w-full p-2.5`}
                            onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        {!compPassword() || dataerrors.confirmpassword ? <ShowErrorMessage condition={true} value={"Password doesn't match"} /> : null}
                    </div>
                    <button className="py-2 px-4 float-right btn-color main-font" onClick={HandleError}>Create Moderator</button>
                </form>
            </div>
        </div>
    )
}


export default Moderators;