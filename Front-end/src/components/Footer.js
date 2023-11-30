import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="w-full mt-[100px] py-5 min-h-[150px] flex items-center" style={{ backgroundColor: "#1B262C" }}>
            <div className="md:w-4/6 w-4/5 mx-auto my-auto">
                <div className="flex text-white justify-between flex-col md:flex-row gap-5">
                    <div className="flex flex-col gap-2 w-1/3">
                        <h2 className="main-font">Contact Info</h2>
                        <div className="w-full text-sm">
                            <p>Get in touch for enquiries, feedback, complaints and compliments.</p>
                            <p>{"Phone: 13 QGOV (13 64 68)"}</p>
                            <p>Email: Space-s@contact.com</p>
                            <Link to="dashboard"><button className="py-2 px-3 text-center border border-[#BBE1FA] mt-3 w-full">Contact Us</button></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="main-font">Navigation Links</h2>
                        <ul className="flex flex-col list-disc text-sm">
                            <li><Link>Home</Link></li>
                            <li><Link>Co-Working Spaces</Link></li>
                            <li><Link>Offers</Link></li>
                            <li><Link>Events & Workshops</Link></li>
                            <li><Link>About Us</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2 list-disc">
                        <h2 className="main-font">Quick Links</h2>
                        <ul className="flex flex-col list-disc text-sm">
                            <li><Link>FAQ</Link></li>
                            <li><Link>Terms of Service</Link></li>
                            <li><Link>Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <hr className="mt-8"></hr>
                <p className="text-center text-white main-font mt-[25px]">Copyright © SPACE S. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;