import { Link } from "react-router-dom";
import { PersonFill, List, X, HouseDoorFill, PersonWorkspace, GiftFill,CalendarEventFill } from "react-bootstrap-icons";
import { useState } from "react";
import logo from "../components/images/Spaces logo.png"
import './NavBar.css';
function NavBar() {
    const [listActive, setlistActive] = useState(false);
    function clicked(){
        setlistActive(!listActive)
    }
    return (
        <div className="mx-auto px-1 py-3 w-[95%] mt-3 rounded-3xl" style={{ backgroundColor: "#1B262C" }}>
            <div className="mx-auto w-11/12 flex justify-between items-center text-white">
                <Link to="/"><img src={logo} alt ="space s logo" className="w-[150px] h-[30px] object-cover cursor-pointer"></img></Link>
                <ul className={`flex w-[500px] justify-between text-lg nv-response main-font ${listActive ? "max-lg:right-[-50%]" : "max-lg:right-[0%]"}`}>
                    <li className="lg:hidden block"><X className="cursor-pointer text-3xl hover:text-[#BBE1FA] duration-200 ease-in-out" onClick={() => clicked()} /></li>
                    <li><Link  className="hover:text-[#BBE1FA] duration-200 flex gap-2 items-center" to="/"><HouseDoorFill className="md:hidden block"/>Home</Link></li>
                    <li><Link className="hover:text-[#BBE1FA] duration-200 flex gap-2 items-center" to="workspaces"><PersonWorkspace className="md:hidden block"/>Co-Working Spaces</Link></li>
                    <li><Link className="hover:text-[#BBE1FA] duration-200 flex gap-2 items-center" to="offers"><GiftFill className="md:hidden block"/>Offers</Link></li>
                    <li><Link className="hover:text-[#BBE1FA] duration-200 flex gap-2 items-center" ><CalendarEventFill className="md:hidden block"/>Events & Workshops</Link></li>
                </ul>
                <div className="flex max-lg:w-[75px] max-lg:justify-between rounded-full">
                    <Link className="text-2xl bg-[#BBE1FA] text-[#0F4C75] p-1 rounded-full hover:bg-[#AAD1DA] duration-200 ease-in-out" to="login"><PersonFill/></Link>
                    <List className="text-3xl cursor-pointer lg:hidden block rounded-full hover:text-[#BBE1FA] duration-200 ease-in-out" onClick={() => clicked()}/>
                </div>
            </div>
        </div>
    )
}

export default NavBar;