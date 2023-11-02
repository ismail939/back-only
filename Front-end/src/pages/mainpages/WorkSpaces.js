import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { Search, SortDownAlt } from "react-bootstrap-icons";
import { click } from "@testing-library/user-event/dist/click";

function WorkSpaces() {
    const [dropdown, setDropDown] = useState(false);
    useEffect(()=>{
        setDropDown(false)
    },[])
    return (
        <div className="w-4/5 mx-auto md:mt-[100px] p-5">
            <div className="w-full flex md:flex-row flex-col md:justify-between gap-5 md:mb-8 mb-4">
                <div className="lg:w-2/5 w-full h-10 flex items-center">
                    <input
                        type="search"
                        className="h-full w-full p-2 border-2 border-solid border-black border-r-0 rounded-l-md focus:border-indigo-500 focus:outline-none"
                        placeholder="Search"
                        aria-label="Search"
                    ></input>
                    <button className="duration-200 ease-in-out bg-indigo-500 h-full p-4 flex items-center rounded-r-md hover:bg-indigo-700 text-white"><Search className="text-lg" /></button>
                </div>
                <div id="dropdown" class="relative w-36 " onMouseLeave={()=>{setDropDown(false)}}>
                    <button id="dropdownDefaultButton" class="w-full text-white bg-blue-700 hover:bg-blue-800 flex focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" type="button" onClick={() => { setDropDown(!dropdown) }}>Sort By <SortDownAlt className="text-lg" />
                    </button>
                    <ul className={`w-full py-2 text-sm text-gray-700 z-10 bg-white rounded-lg shadow ${dropdown ? "absolute" : "hidden"}`}>
                        <li className="hover:bg-gray-100">
                            <button className="px-4 py-2">Dashboard</button>
                        </li>
                        <li className="hover:bg-gray-100">
                            <button className="block px-4 py-2">Settings</button>
                        </li>
                        <li className="hover:bg-gray-100">
                            <button className="block px-4 py-2">Earnings</button>
                        </li>
                        <li className="hover:bg-gray-100">
                            <button className="block px-4 py-2">Sign out</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            <div className="mt-[50px] flex justify-center">
                <Pagination />
            </div>
        </div>
    )
}

export default WorkSpaces;