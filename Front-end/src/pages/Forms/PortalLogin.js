import { useState } from "react"
import { useDispatch } from "react-redux";
import { setCredentials } from "../../components/reduxtoolkit/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import moderator from "../../components/images/Modaerator.png"
import businnesman from "../../components/images/businessman.png"
import { ExclamationCircleFill } from "react-bootstrap-icons"
import logo from "../../components/images/Spaces logo.png"
export function ShowErrorMessage(props) {
    const condition = props.condition;
    const value = props.value;
    return (
        <>
            {condition ? <span className="text-[12px] text-red-500 flex gap-1 items-center mt-1"><ExclamationCircleFill />{value}</span> : null}
        </>
    )
}
function TypeSelection({ setType }) {
    return (
        <div className="flex sm:flex-row flex-col items-center gap-8">
            <div className="bg-white p-4 flex flex-col gap-8 items-center justify-center shadow-md cursor-pointer hover:shadow-xl duration-500" onClick={() => setType("Moderator")}>
                <h2 className="main-font text-lg">Login as Moderator</h2>
                <img className="w-60 h-60 object-contain" src={moderator}></img>
            </div>
            <div className="bg-white p-4 flex flex-col gap-8 items-center justify-center shadow-md cursor-pointer hover:shadow-xl duration-500" onClick={() => setType("Owner")}>
                <h2 className="main-font text-lg">Login as Owner</h2>
                <img className="w-60 h-60 object-contain" src={businnesman}></img>
            </div>
        </div>
    )
}
function Login({ type }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataerrors, setDataErrors] = useState({
        username: false,
        password: false,
        usertype: false
    });
    const AddData = () => {
        let apitype;
        if (type === "Owner") apitype = "owners"
        else apitype = "moderators"
        fetch(`http://localhost:4000/${apitype}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        }).then(res => res.json()).then((resdata) => {
            if (resdata.status === "success") {
                setErrorMessage("");
                dispatch(setCredentials({ user: username, token: resdata.data.token, usertype: type.toLocaleLowerCase() }))
                navigate("/", { replace: true })
            } else if (resdata.status === "error") {
                setErrorMessage(resdata.message)
            } else if (resdata.status === "fail") {
                setErrorMessage("oops, something wrong went on !")
            }
        })
    }
    const HandleError = (e) => {
        e.preventDefault();
        if (username.length === 0) {
            setDataErrors({ username: true, password: false })
        }
        else if (password.length === 0) {
            setDataErrors({ username: false, password: true })
        }
        else {
            setDataErrors({ username: false, password: false }); AddData();
        }
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0">
                <div className="p-6 space-y-4 p-8">
                    <img src={logo} alt="space s logo" className="w-[150px] h-[50px] object-cover mb-8"></img>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign in to your {type} account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                            <input type="text" name="username" id="username" className={`bg-gray-50 border ${dataerrors.username ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="enter your username"
                                onChange={(e) => setUserName(e.target.value)}></input>
                            <ShowErrorMessage condition={dataerrors.username} value={"please enter your username"} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border ${dataerrors.password ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                onChange={(e) => setPassword(e.target.value)}></input>
                            <ShowErrorMessage condition={dataerrors.password} value={"please enter your password"} />
                        </div>
                        {errormessage !== "" ? <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 inline-block"><ExclamationCircleFill />{errormessage}</p> : null}
                        <button type="submit" className="w-full btn-color font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                            onClick={(e) => HandleError(e)}>Sign in</button>
                        <p className="text-sm font-light text-gray-500">
                            Forgot your Password? <Link to="../forgotpassword" className="font-medium text-primary-600 hover:underline">Reset Password</Link>
                        </p>
                        {type === "Owner" && <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <Link to="../sign-up" className="font-medium text-primary-600 hover:underline">Sign up</Link>
                        </p>}
                    </form>
                </div>
            </div>
        </div>
    )
}
function PortalLogin() {
    const [type, setType] = useState("")
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            {type === "" ? <TypeSelection setType={setType} /> : <Login type={type} />}
        </div>
    )
}

export default PortalLogin;