import { useState } from "react";
import { GeoAltFill, TelephoneFill, ClockFill } from "react-bootstrap-icons";
function Contact() {
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        message:""
    })
    function HandleChange(e){
        setInputs({...inputs, [e.target.name]: e.target.value})
    }
    function Send(){
        console.log(inputs)
    }
    return <div className="min-h-screen w-[90%] mx-auto">
        <div className="lg:mt-[80px] mt-[50px] lg:flex lg:justify-between">
            <div className="w-full">
                <p className="mb-10 md:w-3/4"><span className="text-3xl font-extrabold text-[#0F4C75]">Welcome  </span> to our contact page! We’re here to help and answer any questions you might have. Whether you’re seeking more information about our services, need assistance, or have any feedback, we’d love to hear from you. Please feel free to reach out to us through the various contact options provided below.</p>
                <div className="flex items-center gap-8">
                    <GeoAltFill className="text-3xl text-[#0F4C75]" />
                    <div>
                        <h2 className="text-xl font-medium">Our Address</h2>
                        <p className="mt-1 text-gray-500">120, Abbassiya Street</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 mt-6">
                    <TelephoneFill className="text-3xl text-[#0F4C75]" />
                    <div>
                        <h2 className="text-xl font-medium">Contact</h2>
                        <p className="mt-1 text-gray-500">Mobile: 01012345678</p>
                        <p className="text-gray-500">Mail: spaces@info.com</p>
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
                <input type="text" name="name" id="name" placeholder="Your name"
                    className={`mb-5 bg-gray-50 border-2 border-[#0F4C75] text-gray-900 sm:text-sm block w-full p-2.5`}
                    onChange={HandleChange}></input>
                    <input type="email" name="email" id="email" placeholder="Your email address"
                    className={`mb-5 bg-gray-50 border-2 border-[#0F4C75] text-gray-900 sm:text-sm block w-full p-2.5`}
                    onChange={HandleChange}></input>
                    <textarea name="message" id="message" placeholder="Write your message"
                    className={`mb-7 bg-gray-50 border-2 border-[#0F4C75] h-[150px] text-gray-900 sm:text-sm block w-full p-2.5`}
                    onChange={HandleChange}></textarea>
                    <button className="text-center p-3 bg-[#0F4C75] text-white w-full hover:bg-[#1F5C85] duration-200"
                    onClick={()=> Send()}>Send Message</button>
            </div>
        </div>
    </div>
}

export default Contact;