import { Link } from "react-router-dom";
import { Person, List, X } from "react-bootstrap-icons";
import { useState } from "react";
import './NavBar.css';
function NavBar() {
    const [listActive, setlistActive] = useState(false);
    function clicked(){
        setlistActive(!listActive)
    }
    return (
        <div className="mx-auto px-1 py-3 w-[95%] mt-3 rounded-3xl" style={{ backgroundColor: "#1B262C" }}>
            <div className="mx-auto w-11/12 flex justify-between items-center text-white">
                <h1 className="text-2xl font-bold">Space S</h1>
                <ul className={listActive ? "flex w-[500px] justify-between text-lg nv-response max-lg:right-[0px]" : "flex w-[500px] justify-between text-lg nv-response max-lg:right-[-200px]"}>
                    <li className="lg:hidden block"><X className="cursor-pointer text-3xl" onClick={() => clicked()} /></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="workspaces">WorkSpaces</Link></li>
                    <li><Link >Offers</Link></li>
                    <li><Link >Events&Workshops</Link></li>
                </ul>
                <div className="flex max-lg:w-[75px] max-lg:justify-between rounded-full">
                    <Link className="text-2xl bg-white text-black p-1 rounded-full hover:bg-gray-300 duration-200 ease-in-out" to="login"><Person/></Link>
                    <List className="text-3xl cursor-pointer lg:hidden block rounded-full hover:bg-gray-600 hover:bg-opacity-70 hover:p-1 duration-200 ease-in-out" onClick={() => clicked()}/>
                </div>
            </div>
        </div>
    )
}

export default NavBar;