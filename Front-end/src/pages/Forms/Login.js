import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../components/reduxtoolkit/Slices/authSlice";
import { ShowErrorMessage } from "./PortalLogin";
import { setData } from "../../components/reduxtoolkit/Slices/signUpSlice";
import logo from "../../components/images/Spaces logo.png"
function Login() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const prevPage = location?.state?.from.pathname || "/"
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemeber] = useState(false);
    const [errormessage, setErrorMessage] = useState("");
    const [dataerrors, setDataErrors] = useState({
        username: false,
        password: false,
        usertype: false
    });
    function checkState() {
        remember ? console.log("checked") : console.log("not checked")
    }
    const AddData = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/clients/login`, {
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
                dispatch(setCredentials({ user: username, token: resdata.data.token, usertype: "client" }))
                navigate(prevPage, { replace: true })
            } else if (resdata.status === "error") {
                setErrorMessage(resdata.message)
            } else if (resdata.status === "fail") {
                setErrorMessage("oops, something wrong went on !")
            } else if (resdata.status === "unverified") {
                dispatch(setData({
                    email: resdata.message,
                    usertype: "client"
                }))
                navigate("../email authentication")
            }
        }).catch(error => {
            setErrorMessage("unfortunately there was a server error")
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
            setDataErrors({ username: false, password: false, usertype: false }); checkState(); AddData()
        }
    }
    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0">
                <div className="p-6 space-y-4 p-8">
                    <img src={logo} alt="space s logo" className="w-[150px] h-[50px] object-cover mb-8"></img>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign in to your account
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
                        {errormessage !== "" ? <ShowErrorMessage condition={true} value={errormessage} /> : null}
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer" required=""
                                        onClick={() => { setRemeber(!remember) }}></input>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="text-gray-500">Remember me</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-color font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                            onClick={(e) => { HandleError(e) }}>Sign in</button>
                        <div>
                            <p className="text-sm text-gray-800 font-medium mb-2 ">
                                Don’t have an account yet? <Link to="../sign-up" className="text-gray-500 text-light text-[13px] hover:underline">Sign up</Link>
                            </p>
                            <p className="text-[12px] font-light text-gray-500">
                                Forgot your Password? <Link to="../forgotpassword" className="font-medium text-primary-600 hover:underline">Reset Password</Link>
                            </p></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;