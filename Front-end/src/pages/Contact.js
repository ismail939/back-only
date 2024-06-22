import { useState } from "react";
import { GeoAltFill, TelephoneFill, ClockFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { ShowErrorMessage } from "./Forms/PortalLogin";
function Contact() {
    const [errormessage, setErrorMessage] = useState("");
    const [dataerrors, setDataErrors] = useState({
        name: false,
        email: false,
        message: false
    });
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        message: ""
    })
    function HandleChange(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const success = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your message is recieved Successfully",
            showConfirmButton: false,
        });
    }
    const HandleError = () => {
        if (inputs.name.length === 0) {
            setDataErrors({ name: true, email: false, message: false })
        }
        else if (inputs.email.length === 0) {
            setDataErrors({ name: false, email: true, message: false })
        }
        else if (inputs.message.length === 0) {
            setDataErrors({ name: false, email: false, message: true })
        }
        else {
            setDataErrors({ username: false, password: false, usertype: false }); Send();
        }
    }
    function Send() {
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        document.getElementById("name").value = "";
        setInputs({
            name: "",
            email: "",
            message: ""
        })
        success();
    }
    return <div className="min-h-screen w-[90%] mx-auto">
        <div className="lg:mt-[80px] mt-[50px] lg:flex lg:justify-between">
            <div className="w-full">
                <p className="mb-10 md:w-3/4"><span className="text-3xl font-extrabold text-[#0F4C75]">Welcome  </span> to our contact page! We’re here to help and answer any questions you might have. Whether you’re seeking more information about our services, need assistance, or have any feedback, we’d love to hear from you. Please feel free to reach out to us through the various contact options provided below.</p>
                <div className="flex items-center gap-8 mt-6">
                    <TelephoneFill className="text-3xl text-[#0F4C75]" />
                    <div>
                        <h2 className="text-xl font-medium">Contact</h2>
                        <p className="mt-1 text-gray-500">Mobile: 01157422454</p>
                        <p className="text-gray-500">Mail: spaces24.gp@gmail.com</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 mt-6">
                    <ClockFill className="text-3xl text-[#0F4C75]" />
                    <div>
                        <h2 className="text-xl font-medium">Working Hours</h2>
                        <p className="mt-1 text-gray-500">Saturday - Tuesday: 10:00 - 14:00</p>
                    </div>
                </div>
            </div>
            <div className="w-full max-lg:mt-[50px]">
                <h2 className="mb-6 main-font text-2xl">Want to Send a Message?</h2>
                <div className="mb-5">
                    <input type="text" name="name" id="name" placeholder="Your name"
                        className={`bg-gray-50 border-2 border-[#0F4C75] text-gray-900 sm:text-sm block w-full p-2.5`}
                        onChange={HandleChange}></input>
                    <ShowErrorMessage condition={dataerrors.name} value={"name can't be empty"} className="mb-5" />
                </div>
                <div className="mb-5">
                    <input type="email" name="email" id="email" placeholder="Your email address"
                        className={`bg-gray-50 border-2 border-[#0F4C75] text-gray-900 sm:text-sm block w-full p-2.5`}
                        onChange={HandleChange}></input>
                    <ShowErrorMessage condition={dataerrors.email} value={"email can't be empty"} />
                </div>
                <div className="mb-7">
                    <textarea name="message" id="message" placeholder="Write your message"
                        className={`bg-gray-50 border-2 border-[#0F4C75] h-[150px] text-gray-900 sm:text-sm block w-full p-2.5`}
                        onChange={HandleChange}></textarea>
                    <ShowErrorMessage condition={dataerrors.message} value={"message can't be empty"} />
                </div>
                <button className="text-center p-3 bg-[#0F4C75] text-white w-full hover:bg-[#1F5C85] duration-200"
                    onClick={() => HandleError()}>Send Message</button>
            </div>
        </div>
    </div>
}

export default Contact;