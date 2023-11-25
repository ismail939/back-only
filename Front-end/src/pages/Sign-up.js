import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExclamationCircleFill , Eye , EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';


function SignUp() {
    const navigate = useNavigate();
    const [showpassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [username, setUserName] = useState("");
    const [checkerror, setCheckError] = useState("");
    const [reserror, setResError] = useState("");
    const [dataerrors, setDataErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phonenumber: false,
        password: false,
        username: false,
        confirmpassword: false
    });
    function compPassword() {
        if ((password !== confirmpassword) && (password !== "") && (confirmpassword !== "")) return false;
        else return true
    }
    const AddData = () => {
        fetch(`http://localhost:4000/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "data": {
                    "fname": firstName,
                    "lname": lastName,
                    "email": email,
                    "password": password,
                    "username": username,
                    "phone": phonenumber
                }
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                navigate("../login")
            } else if (data.status === "error") {
                setResError(data.message)
            } else if (data.status === "fail") {
                setResError("oops, something wrong went on !")
            }
        })
    }
    const nameError = (name) => {
        var letters = /^[A-Za-z]+$/;
        if (!name.match(letters)) {
            return true;
        }
        else if ((name.length < 3 || name.length > 20)) {
            return true;
        }
        else {
            return false;
        }
    }
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
    const emailError = () => {
        const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
        if (!email.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
    const PhoneNumberError = () => {
        var numbers = /^01[1205][0-9]{8}$/;
        if (!phonenumber.match(numbers)) {
            return true;
        } else {
            return false;
        }
    };
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
    const HandleError = (e) => {
        e.preventDefault();
        if (nameError(firstName)) {
            setDataErrors({
                firstName: true, lastName: false, email: false, phonenumber: false,
                password: false, username: false, confirmpassword: false
            })
            setCheckError("please write your first name correctly")
            window.scrollTo(0, 100);
        }
        else if (nameError(lastName)) {
            setDataErrors({
                firstName: false, lastName: true, email: false, phonenumber: false,
                password: false, username: false, confirmpassword: false
            })
            setCheckError("please write your last name correctly")
            window.scrollTo(0, 100);
        }
        else if (UsernameError()) {
            setDataErrors({
                firstName: false, lastName: false, email: false, phonenumber: false,
                password: false, username: true, confirmpassword: false
            })
            setCheckError("please write a valid username")
            window.scrollTo(0, 200);
        } else if (emailError()) {
            setDataErrors({
                firstName: false, lastName: false, email: true, phonenumber: false,
                password: false, username: false, confirmpassword: false
            })
            setCheckError("please write a valid email address")
            window.scrollTo(0, 300);
        } else if (PhoneNumberError()) {
            setDataErrors({
                firstName: false, lastName: false, email: false, phonenumber: true,
                password: false, username: false, confirmpassword: false
            })
            setCheckError("please write a valid phonenumber")
            window.scrollTo(0, 400);
        } else if (PasswordError()) {
            setDataErrors({
                firstName: false, lastName: false, email: false, phonenumber: false,
                password: true, username: false, confirmpassword: false
            })
            window.scrollTo(0, 500);
        } else if (confirmpassword === "" || !compPassword()) {
            setDataErrors({
                firstName: false, lastName: false, email: false, phonenumber: false,
                password: false, username: false, confirmpassword: true
            })
            setCheckError("please confirm your password")
            window.scrollTo(0, 600);
        } else {
            setCheckError("")
            AddData();
        }
    }
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0] mb-[100px]">
                    <div className="p-6 space-y-4 p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign Up
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className="flex justify-between max-md:flex-col max-md:space-y-4">
                                <div>
                                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                    <input type="text" name="firstname" id="firstname" className={`bg-gray-50 border ${dataerrors.firstName ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5`}
                                        placeholder="Enter your first name" required onChange={(e) => { setFirstName(e.target.value) }}></input>
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                                    <input type="text" name="lastname" id="lastname" className={`bg-gray-50 border ${dataerrors.lastName ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5`}
                                        placeholder="Enter your last name" required onChange={(e) => { setLastName(e.target.value) }}></input>
                                </div>
                            </div>
                            {dataerrors.firstName || dataerrors.lastName ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                <input type="text" name="username" id="username" className={`bg-gray-50 border ${dataerrors.username ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5`} placeholder="Enter your username" required
                                    onChange={(e) => { setUserName(e.target.value) }}></input>
                                {dataerrors.username ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input type="email" name="email" id="email" className={`bg-gray-50 border ${dataerrors.email ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5`} placeholder="name@example.com" required
                                    onChange={(e) => { setEmail(e.target.value) }}></input>
                                {dataerrors.email ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                            <div>
                                <label htmlFor="phonenumber" className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                                <input type="text" name="phonenumber" id="phonenumber" className={`bg-gray-50 border ${dataerrors.phonenumber ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5`}
                                    placeholder="write a valid phonenumber" required onChange={(e) => { setPhoneNumber(e.target.value) }}></input>
                                {dataerrors.phonenumber ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                            <div>
                                <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <div className="relative">
                                    <input type={showpassword ? "text" : "password"} name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border ${dataerrors.password ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5`} required
                                        onChange={(e) => { setPassword(e.target.value) }}></input>
                                    <span className="absolute top-[30%] right-2 text-lg z-10 cursor-pointer text-center" onClick={() => setShowPassword(!showpassword)}>
                                        {showpassword ? <EyeSlash/> : <Eye /> }
                                    </span>
                                </div>
                                {dataerrors.password ? <span className="text-[12px] text-red-500">{checkerror}</span> : <p className="m-0 mt-1 text-xs text-gray-500">Note: Password must be at least 8 charachters long with one lowercase, one uppercase and a number</p>}
                            </div>
                            <div className="">
                                <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                <input type="password" name="confirmpassword" id="confirmpassword" placeholder="••••••••" className={`bg-gray-50 border ${dataerrors.confirmpassword || !compPassword() ? "border-red-500 focus:outline-rose-600" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 `} required
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
                                {!compPassword() || dataerrors.confirmpassword ? <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 inline-block">Password doesn't match</p> : null}
                            </div>
                            <br></br>
                            {reserror !== ""  ? <span className="text-[14px] text-red-500 flex gap-2 items-center"><ExclamationCircleFill />{reserror}</span> : null}
                            <button type="submit" className="mt-3 w-full text-black bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                                onClick={(e) => { HandleError(e); }}>Sign Up</button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <Link to="../login" className="font-medium text-primary-600 hover:underline">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp; 