import {useState, useEffect } from "react";
import { Link, useNavigate , useLocation } from "react-router-dom";
import { ExclamationCircleFill, PatchCheckFill } from "react-bootstrap-icons";
import { useDispatch , useSelector } from "react-redux";
import { setCredentials } from "../components/reduxtoolkit/Slices/authSlice";
function Login() {
    const client = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const prevPage = location?.state?.from.pathname || "/"
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemeber] = useState(false);
    const [usertype, setUsertype] = useState("");
    const [errormessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [dataerrors, setDataErrors] = useState({
        username: false,
        password: false,
        usertype:false
    });
    function checkState() {
        remember ? console.log("checked") : console.log("not checked")
    }
    const AddData = () => {
        let apitype;
        if(usertype === "Client") apitype = "clients"
        else apitype = "owners"
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
            console.log(resdata)
            if (resdata.status === "success") {
                setErrorMessage("");
                dispatch(setCredentials({user : username , token: resdata.data.token , usertype: usertype.toLocaleLowerCase()}))
                setSuccess(true);
                navigate(prevPage, {replace : true})
            } else if (resdata.status === "error") {
                setSuccess(false);
                setErrorMessage(resdata.message)
            } else if (resdata.status === "fail") {
                setSuccess(false);
                setErrorMessage("oops, something wrong went on !")
            }
        })
    }
    const handleUserType = (event) => {
        setUsertype(event.target.value);
    };
    const HandleError = (e) => {
        e.preventDefault();
        if (username.length === 0) {
            setDataErrors({ username: true, password: false , usertype:false })
        }
        else if (password.length === 0) {
            setDataErrors({ username: false, password: true , usertype:false })
        }else if(usertype.length === 0){
            setDataErrors({ username: false, password: false , usertype:true });
            setErrorMessage("please select user type")
        }
        else {
            setDataErrors({ username: false, password: false , usertype:false }); checkState(); AddData()
        }
    }
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0">
                    <div className="p-6 space-y-4 p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                <input type="text" name="username" id="username" className={`bg-gray-50 border ${dataerrors.username ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="enter your username"
                                    onChange={(e) => setUserName(e.target.value)}></input>
                                {dataerrors.username ? <span className="text-[12px] text-red-500">plaese enter your username</span> : null}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border ${dataerrors.password ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    onChange={(e) => setPassword(e.target.value)}></input>
                                {dataerrors.password ? <span className="text-[12px] text-red-500">plaese enter your password</span> : null}
                            </div>
                            <div>
                                <label htmlFor="usertype" className="block mb-2 text-sm font-medium text-gray-900">User Type</label>
                                <div name="usertype" className="text-gray-900 rounded-lg w-full py-2.5 flex gap-10 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="Client"
                                            className="w-4 h-4 cursor-pointer"
                                            checked={usertype === 'Client'}
                                            onChange={handleUserType}
                                        />
                                        <span>Client</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="Owner"
                                            className="w-4 h-4 cursor-pointer"
                                            checked={usertype === 'Owner'}
                                            onChange={handleUserType}
                                        />
                                        <span>Owner</span>
                                    </div>
                                </div>
                            </div>
                            {errormessage !== "" ? <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 inline-block"><ExclamationCircleFill />{errormessage}</p> : null}
                            {success ? <p className="text-green-500 text-md mt-1 flex items-center gap-1 inline-block"><PatchCheckFill />Login is successful</p> : null}
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
                            <button type="submit" className="w-full  btn-color hover:bg-blue-600 focus:bg-blue-700 font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                                onClick={(e) => { HandleError(e) }}>Sign in</button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <Link to="../sign-up" className="font-medium text-primary-600 hover:underline">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;