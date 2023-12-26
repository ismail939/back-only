import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PersonFill, List, X, HouseDoorFill, PersonWorkspace, GiftFill, CalendarEventFill } from "react-bootstrap-icons";
import { useRef, useState, useEffect } from "react";
import logo from "../components/images/Spaces logo.png"
import './NavBar.css';
import { logOut } from "./reduxtoolkit/Slices/authSlice";
function NavBar() {
    const [listActive, setlistActive] = useState(false);
    const [subMenu, setSubMenu] = useState(false);
    const client = useSelector(store => store.auth).token
    const dispatch = useDispatch();
    const subMenuRef = useRef();
    const profileBtn = useRef();
    const loggedIn = [{ name: "Login", link: "login" }, { name: "Sign-Up", link: "sign-up" }];
    function clicked() {
        setlistActive(!listActive)
    }
    function ShowSubMenu() {
        setSubMenu(!subMenu)
    }
    useEffect(() => {
        let handler = (e) => {
            if (subMenuRef.current && !subMenuRef.current.contains(e.target) && !profileBtn.current.contains(e.target)) {
                setSubMenu(false)
            }
        }
        document.addEventListener("mousedown", handler)
    }, [])
    return (
        <div className="mx-auto px-1 py-3 w-[95%] mt-3 rounded-3xl relative" style={{ backgroundColor: "#1B262C" }}>
            <div className="mx-auto w-11/12 flex justify-between items-center text-white">
                <Link to="/"><img src={logo} alt="space s logo" className="w-[150px] h-[30px] object-cover cursor-pointer"></img></Link>
                <ul className={`flex w-[500px] justify-between text-lg nv-response main-font ${listActive ? "max-lg:right-[0%]" : "max-lg:right-[-50%]"}`}>
                    <li className="lg:hidden block"><X className="cursor-pointer text-3xl hover:text-[#BBE1FA] duration-200 ease-in-out" onClick={() => clicked()} /></li>
                    <li><Link className="hover:text-[#BBE1FA] duration-200 flex gap-2 items-center" to="/"><HouseDoorFill className="lg:hidden block" />Home</Link></li>
                    <li><Link className="hover:text-[#BBE1FA] duration-200 flex gap-2 items-center" to="workspaces"><PersonWorkspace className="lg:hidden block" />Co-Working Spaces</Link></li>
                    <li><Link className="hover:text-[#BBE1FA] duration-200 flex gap-2 items-center" to="offers"><GiftFill className="lg:hidden block" />Offers</Link></li>
                    <li><Link className="hover:text-[#BBE1FA] duration-200 flex gap-2 items-center" ><CalendarEventFill className="lg:hidden block" />Events&Workshops</Link></li>
                </ul>
                <div className="flex max-lg:w-[75px] max-lg:justify-between rounded-full">
                    <Link className="text-2xl bg-[#BBE1FA] text-[#0F4C75] p-1 rounded-full hover:bg-[#AAD1DA] duration-200 ease-in-out" onClick={() => ShowSubMenu()} ref={profileBtn}><PersonFill /></Link>
                    <List className="text-3xl cursor-pointer lg:hidden block rounded-full hover:text-[#BBE1FA] duration-200 ease-in-out" onClick={() => clicked()} />
                </div>
            </div>
            <div className={`absolute w-56 top-[60px] right-[2.5%] z-50 shadow bg-[#1B262C] ${subMenu ? null : "hidden"}`} ref={subMenuRef}>
                <ul className="w-full text-lg main-font text-white">
                    {!client ? loggedIn.map((item, index) => {
                        return <><Link to={item.link} onClick={() => ShowSubMenu()}><li className="px-5 py-4 hover:bg-[#0c3d5e] cursor-pointer duration-200">{item.name}</li></Link>
                            {index !== loggedIn.length - 1 ? <hr className="border-[#BBE1FA]"></hr> : null}</>
                    }) : (
                        <>
                            <Link to="dashboardProfile" onClick={() => ShowSubMenu()}><li className="px-5 py-4 hover:bg-[#0c3d5e] cursor-pointer duration-200">My Profile</li></Link>
                            <hr className="border-[#BBE1FA]"></hr>
                            <Link to="" onClick={() => {ShowSubMenu() ; dispatch(logOut())}}><li className="px-5 py-4 hover:bg-[#0c3d5e] cursor-pointer duration-200">Sign-Out</li></Link>
                        </>
                    )
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBar;