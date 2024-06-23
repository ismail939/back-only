import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { setCredentials } from "../../components/reduxtoolkit/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import moderator from "../../components/images/Modaerator.png"
import businnesman from "../../components/images/businessman.png"
import { ExclamationCircleFill } from "react-bootstrap-icons"
import logo from "../../components/images/Spaces logo.png"
import { setData } from "../../components/reduxtoolkit/Slices/signUpSlice";
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
    const [remember, setRemeber] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataerrors, setDataErrors] = useState({
        username: false,
        password: false,
        usertype: false
    });
    useEffect(()=>{
        if(localStorage.getItem(type)){
            setUserName(localStorage.getItem(type))
            setRemeber(true)
        }
    },[])
    function checkState() {
        if(remember){
            localStorage.setItem(type , username)
        }else{
            if(localStorage.getItem(type)) localStorage.removeItem(type)
        }
    }
    const AddData = () => {
        let apitype;
        if (type === "Owner") apitype = "owners"
        else apitype = "moderators"
        fetch(`${process.env.REACT_APP_BASE_URL}/${apitype}/login`, {
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
                setErrorMessage(resdata.message)
            } else if (resdata.status === "unverified") {
                dispatch(setData({
                    email: resdata.message,
                    usertype: "owner"
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
            setDataErrors({ username: false, password: false });checkState(); AddData();
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
                                value={username} onChange={(e) => setUserName(e.target.value)}></input>
                            <ShowErrorMessage condition={dataerrors.username} value={"please enter your username"} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border ${dataerrors.password ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                onChange={(e) => setPassword(e.target.value)}></input>
                            <ShowErrorMessage condition={dataerrors.password} value={"please enter your password"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer" required=""
                                        checked={remember} onClick={() => { setRemeber(!remember) }}></input>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="text-gray-500">Remember me</label>
                                </div>
                            </div>
                        </div>
                        {errormessage !== "" ? <ShowErrorMessage condition={true} value={errormessage} /> : null}
                        <button type="submit" className="w-full btn-color font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                            onClick={(e) => HandleError(e)}>Sign in</button>
                        {type === "Owner" && <div>
                            <p className="text-sm text-gray-800 font-medium mb-2 ">
                                Don’t have an account yet? <Link to="../sign-up" className="text-gray-500 text-light text-[13px] hover:underline">Sign up</Link>
                            </p>
                            <p className="text-[12px] font-light text-gray-500">
                                Forgot your Password? <Link onClick={()=>{dispatch(setData({email: null,usertype: "owner"
                                }))}} to="../forgotpassword" className="font-medium text-primary-600 hover:underline">Reset Password</Link>
                            </p></div>}
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