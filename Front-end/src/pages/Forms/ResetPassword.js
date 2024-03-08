import { useState } from "react";
function ResetPassword() {
    const [email, setEmail] = useState("")
    const [checkerror, setCheckError] = useState("")
    const [dataerrors, setDataErrors] = useState({
        email: false,
    });
    function sendEmail() {
        
    }
    const emailError = () => {
        const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
        if (!email.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
    function handleEmail(e) {
        e.preventDefault()
        if (emailError) {
            setDataErrors({ email: true })
            setCheckError("please write a valid email address")
        }
        else {
            setDataErrors({ email: false })
            setCheckError("")
            sendEmail();
        }

    }
    return (
        <>
            <div className="flex flex-col items-center mt-32 min-h-screen">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0">
                    <div className="p-6">
                        <h1 className="text-xl mb-4 font-bold text-gray-900 md:text-2xl">
                            Reset Passowrd
                        </h1>
                        <div className="">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">email</label>
                                <input type="email" value={email} name="email" id="username" className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="enter your email"
                                    onChange={(e) => setEmail(e.target.value)}></input>
                                {dataerrors.email ? <span className="text-[12px] text-red-500">plaese enter a valid email</span> : null}
                            </div>
                            <div className="mt-4">
                                <button type="submit" className={`w-full btn-color rounded-sm text-md font-medium px-5 py-2.5 text-center duration-300`}
                                    onClick={(e) => handleEmail(e)}>Continue</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default ResetPassword;