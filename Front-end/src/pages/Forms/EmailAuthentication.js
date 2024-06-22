import { useState } from "react";
import { useSelector } from "react-redux";
import { ShowErrorMessage } from "./PortalLogin";
import { useNavigate } from "react-router-dom";
function Ask({ data, setCheck, SendCode }) {
    const navigate = useNavigate();
    return (
        <div className="p-6">
            <h1 className="my-4 main-font text-gray-900 text-2xl">
                Is this Your Email ?
            </h1>
            <h1 className="text-md my-4 font-medium text-gray-900">
                {data.email}
            </h1>
            <p className="text-md text-gray-900 mb-8">
                Make sure that you provided a valid email address to be able to recieve a code to verify your email.
            </p>
            <div className="flex items-center justify-between gap-8">
                <button type="submit" className="w-full bg-[#3282B8] rounded-sm text-md px-5 py-2.5 text-center duration-300 hover:bg-[#2272A8]"
                    onClick={(e) => { SendCode(); setCheck(true) }}>Yes</button>
                <button type="submit" className="w-full bg-red-600 rounded-sm text-md px-5 py-2.5 text-center duration-300 hover:bg-red-700"
                    onClick={(e) => { navigate("../sign-up") }}>No</button>
            </div>
        </div>
    )
}
function Verify({ data, SendCode }) {
    const [code, setCode] = useState("")
    const [enable, setEnable] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const usertype = useSelector(store => store.auth).usertype;
    const navigate = useNavigate();
    function HandleChange(e) {
        const input = e.target.value;
        if (/^(?:\d+)?$/.test(input) && input.length <= 6) { setCode(e.target.value); }
        if (input.length < 6) {
            setEnable(false)
        } else {
            setEnable(true)
        }
    }
    function Continue() {
        fetch(`${process.env.REACT_APP_BASE_URL}/${data.usertype}s/verify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": data.email,
                "verificationCode": code
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "success") {
                usertype === "Owner" ? navigate("/portal-login") :  navigate("/login")
            }else if (data.status === "error") {
                setIncorrect(true)
            }
        })
    }
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
                    <input type="number" name="verify" id="verify" min={0} placeholder="" value={code}
                        className={`verify-input my-3 bg-gray-50 border text-center text-gray-900 text-2xl main-font rounded-sm block w-full p-2.5`}
                        onChange={HandleChange}></input>
                </div>
                <div className="my-3">
                    <ShowErrorMessage condition={incorrect} value={"Invalid Verification Code"} />
                </div>
                <button type="submit" className={`w-full ${enable ? "btn-color" : "bg-gray-400 text-white"} rounded-sm text-md font-medium px-5 py-2.5 text-center duration-300`}
                    disabled={!enable}
                    onClick={(e) => { Continue() }}>Continue</button>
                <button type="submit" className="w-full mt-3 border border-red-600 text-red-600 rounded-sm text-md font-medium px-5 py-2.5 text-center hover:bg-red-600 hover:text-white duration-100"
                    onClick={(e) => { SendCode(); }}>Resend Code</button>
            </div>
        </div>
    )
}
function EmailAuthentication() {
    const [check, setCheck] = useState(false);
    const data = useSelector(store => store.signUp);
    function SendCode() {
        fetch(`${process.env.REACT_APP_BASE_URL}/${data.usertype}s/sendVerification`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": data.email,
            }),
        })
    }
    return (
        <div className="flex flex-col items-center mt-32 min-h-screen">
            <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0">
                {check ? <Verify data={data} SendCode={SendCode} /> : <Ask data={data} setCheck={setCheck} SendCode={SendCode} />}
            </div>
        </div>
    )
}

export default EmailAuthentication;