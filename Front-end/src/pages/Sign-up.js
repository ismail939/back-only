import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExclamationCircleFill } from "react-bootstrap-icons";


function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhoneNumber] = useState(0)
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [username, setUserName] = useState("");
    const [checkerror , setCheckError] = useState("");
    function compPassword() {
        if ((password !== confirmpassword) && (password !== "") && (confirmpassword !== "")) return false;
        else return true
    }
    const nameError = () => {
        var letters = /^[A-Za-z]+$/;
        if (!firstName.match(letters) || !lastName.match(letters)) {
            console.log("Go edit your inputs idiot")
            return true;
        }
        else if ((firstName.length < 3 || firstName.length > 20) || (lastName.length < 3 || lastName.length > 20)) {
            console.log("Go edit your inputs idiot")
            return true;
        }
        else {
            return false;
        }
    }
    const UsernameError = () => {
        var letterNumber = /^[0-9a-zA-Z@&_]+$/;
        if (!username.match(letterNumber)) {
            console.log("Go edit your username idiot")
            return true;
        }
        else if (username.length < 3 || username.length > 20) {
            console.log("Go edit your username idiot")
            return true;
        }
        else {
            return false;
        }
    }
    const PhoneNumberError = () => {
        var numbers = /^[0-9]+$/;
        if (!phonenumber.match(numbers)) {
            console.log("Go edit your Phonenumber idiot")
            return true;
        }
        else if (phonenumber.length !== 11) {
            console.log("Go edit your Phonenumber idiot")
            return true;
        }
        else {
            return false;
        }
    }
    const PasswordError = () => {
        if (password.length < 8) {
            return "Error: Password must be at least 8 characters";
        } else if (password.search(/[a-z]/) < 0) {
            return "Error: Password must contain at least one lowercase letter";
        } else if (password.search(/[A-Z]/) < 0) {
            return "Error: Password must contain at least one uppercase letter";
        } else if (password.search(/[0-9]/) < 0) {
            return "Error: Password must contain at least one number";
        }
        else if (password.search(/[@_&]/) < 0) {
            return "Error: Password must contain at least one number";
        }
        else {
            return false;
        }
    }
    const HandleError = () =>{
        if (nameError()){
            setCheckError("name")
        }else if(UsernameError()){
            setCheckError("username")
        }else if(PhoneNumberError()){
            setCheckError("phone number")
        }else{
            setCheckError("")
        }
    }
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0] mb-[100px]">
                    <div className="p-6 space-y-4 p-8">
                        {checkerror !== "" ? <div className="p-1 bg-rose-600 text-white text-sm">
                            <div className="flex items-center gap-2"><ExclamationCircleFill /> <span>Error: Please write your {checkerror} correctly</span></div>
                        </div> : null}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign Up
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className="flex justify-between max-md:flex-col max-md:space-y-4">
                                <div>
                                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                                    <input type="text" name="firstname" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your first name" required
                                        onChange={(e) => { setFirstName(e.target.value) }}></input>
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                                    <input type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your last name" required
                                        onChange={(e) => { setLastName(e.target.value) }}></input>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your username" required
                                    onChange={(e) => { setUserName(e.target.value) }}></input>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@example.com" required
                                    onChange={(e) => { setEmail(e.target.value) }}></input>
                            </div>
                            <div>
                                <label htmlFor="phonenumber" className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                                <input type="text" name="phonenumber" id="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="0100000" required
                                    onChange={(e) => { setPhoneNumber(e.target.value) }}></input>
                            </div>
                            <div>
                                <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required
                                    onChange={(e) => { setPassword(e.target.value) }}></input>
                                <p className="m-0 mt-1 text-xs text-gray-500">Note: Password must be at least 8 charachters long</p>
                            </div>
                            <div className="">
                                <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                <input type="password" name="confirmpassword" id="confirmpassword" placeholder="••••••••" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 ${!compPassword() ? "focus:outline-rose-600" : null}`} required
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
                                {!compPassword() ? <p className="text-rose-600 text-xs mt-1 flex items-center gap-1 inline-block"><ExclamationCircleFill />Password doesn't match</p> : <div className="my-[20px]"></div>}
                            </div>
                            <br></br>
                            <button type="submit" className="mt-3 w-full text-black bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                                onClick={(e) => {HandleError() ; e.preventDefault(); }}>Sign Up</button>
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