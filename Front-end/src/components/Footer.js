import { Link } from "react-router-dom";

function FooterLink({ title, link }) {
    return (
        <li className="hover:underline hover:text-[#BBE1FA] duration-100"><Link to={link}>{title}</Link></li>
    )
}
function Footer() {
    return (
        <div className="w-full mt-[100px] py-5 min-h-[150px] flex items-center" style={{ backgroundColor: "#1B262C" }}>
            <div className="md:w-4/6 w-4/5 mx-auto my-auto">
                <div className="flex text-white justify-between flex-col md:flex-row gap-5">
                    <div className="flex flex-col gap-2 md:w-1/3 w-2/3">
                        <h2 className="main-font">Contact Info</h2>
                        <div className="w-full text-sm">
                            <p>Get in touch for enquiries, feedback, complaints and compliments.</p>
                            <p>{"Phone: 13 QGOV (13 64 68)"}</p>
                            <p>Email: Space-s@contact.com</p>
                            <Link to="contact"><button
                                className="py-2 px-3 main-font text-center border border-[#BBE1FA] mt-3 w-full hover:bg-[#BBE1FA] hover:text-[#1B262C] duration-200"
                            >Contact Us</button></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="main-font">Navigation Links</h2>
                        <ul className="flex flex-col text-sm">
                            <FooterLink title="Home" link="/" />
                            <FooterLink title="Co-Working Spaces" link="workspaces" />
                            <FooterLink title="Offers" link="offers" />
                            <FooterLink title="Events & Workshops" link="events&workshops" />
                            <FooterLink title="About Us" link={"aboutus"} />
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="main-font">Quick Links</h2>
                        <ul className="flex flex-col text-sm">
                            <FooterLink title="Portal Login" link="portal-login" />
                            <FooterLink title="FAQs" link={"faQs"} />
                            <FooterLink title="Terms of Service" link={"termsofservice"} />
                            <FooterLink title="Privacy Policy" link={"privacypolicy"} />
                        </ul>
                    </div>
                </div>
                <hr className="mt-8"></hr>
                <p className="text-center text-white main-font mt-[25px]" style={{ fontFamily: "Brush Script MT" }}>Copyright © SPACE S. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;