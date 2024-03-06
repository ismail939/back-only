import { useState } from "react";
import { ShowErrorMessage } from "./PortalLogin";
function Ask({setCheck}) {
    return (
        <div className="p-6">
            <h1 className="my-4 main-font text-gray-900 text-2xl">
                Is this Your Email ?
            </h1>
            <h1 className="text-md my-4 font-medium text-gray-900">
                youssef@gmail.com
            </h1>
            <p className="text-md text-gray-900 mb-8">
                Make sure that you provided a valid email address to be able to recieve a code to verify your email.
            </p>
            <div className="flex items-center justify-between gap-8">
                <button type="submit" className="w-full bg-[#3282B8] rounded-sm text-md px-5 py-2.5 text-center duration-300 hover:bg-[#2272A8]"
                    onClick={(e) => { setCheck(true)}}>Yes</button>
                <button type="submit" className="w-full bg-red-600 rounded-sm text-md px-5 py-2.5 text-center duration-300 hover:bg-red-700"
                    onClick={(e) => { }}>No</button>
            </div>
        </div>
    )
}
function Verify() {
    return (
        <div className="p-6">
            <h1 className="text-xl mb-4 font-bold text-gray-900 md:text-2xl">
                Email Authentication
            </h1>
            <p className="text-md text-gray-500 my-6">
                Enter the 6 digit code sent to your email
            </p>
            <div className="">
                <div className="my-2">
                    <label htmlFor="verify" className="mb-10 text-md font-medium">Verification Code</label>
                    <input type="number" name="verify" id="verify" min={0} placeholder="" className={`my-3 bg-gray-50 border text-center text-gray-900 text-2xl main-font rounded-sm block w-full p-2.5`}
                    style={{}}
                    ></input>
                </div>
                <button type="submit" className="w-full btn-color rounded-sm text-md font-medium px-5 py-2.5 text-center duration-300"
                    onClick={(e) => { }}>Continue</button>
                    <button type="submit" className="w-full mt-3 border border-red-600 text-red-600 rounded-sm text-md font-medium px-5 py-2.5 text-center hover:bg-red-600 hover:text-white duration-100"
                    onClick={(e) => { }}>Resend Code</button>
            </div>
        </div>
    )
}
function EmailAuthentication() {
    const [check, setCheck] = useState(false);
    return (
        <div className="flex flex-col items-center mt-32 min-h-screen">
            <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0">
                {check ? <Verify/> : <Ask setCheck={setCheck}/>}
            </div>
        </div>
    )
}

export default EmailAuthentication;