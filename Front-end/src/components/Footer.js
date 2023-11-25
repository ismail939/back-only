import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="w-full mt-[100px] py-5" style={{ backgroundColor: "#1B262C" }}>
            <div className="md:w-3/5 w-4/5 mx-auto">
                <div className="flex text-white items-center justify-between">
                    <div className="flex flex-col">
                        <h2 className="font-bold">About Us</h2>
                        <Link>Link</Link>
                        <Link>Link</Link>
                        <Link>Link</Link>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold">Contact</h2>
                        <Link>Link</Link>
                        <Link>Link</Link>
                        <Link>Link</Link>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold">Terms&Conditions</h2>
                        <Link>Link</Link>
                        <Link>Link</Link>
                        <Link>Link</Link>
                    </div>
                </div>
                <p className="text-center text-white font-bold mt-5">Copyright © SPACE S. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;