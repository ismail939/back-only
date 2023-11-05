/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { Search, SortDownAlt, FunnelFill } from "react-bootstrap-icons";
import Filters from "../../components/Filters";
function WorkSpaces() {
    const [dropdown, setDropDown] = useState(false);
    const [cwspaces, setCWSpaces] = useState([]);
    useEffect(() => {
        getWorkSpaces();
        setDropDown(false);
    }, [])
    const getWorkSpaces = () => {
        fetch("http://localhost:4000/cw_spaces")
            .then(res => res.json())
            .then(responsedata => {setCWSpaces(responsedata.data); console.log(responsedata)}
            );
    }
    return (
        <div className="flex relative">
            <div className="bg-gray-100 w-52 sticky h-[100dvh]">
                <Filters />
            </div>
            <div className="w-4/5 mx-auto md:mt-[100px] p-5">
                <div className="w-full flex md:flex-row flex-col md:justify-between gap-5 md:mb-8 mb-4">
                    <div className="lg:w-2/5 md:w-3/5 h-10 flex items-center">
                        <input
                            type="search"
                            className="h-full w-full p-2 border-2 border-solid border-black border-r-0 rounded-l-md focus:border-indigo-500 focus:outline-none"
                            placeholder="Search"
                            aria-label="Search"
                        ></input>
                        <button className="duration-200 ease-in-out bg-indigo-500 h-full p-4 flex items-center rounded-r-md hover:bg-indigo-700 text-white"><Search className="text-lg" /></button>
                    </div>
                    <div id="dropdown" class="relative w-36 " onMouseLeave={() => { setDropDown(false) }}>
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
                <button id="dropdownDefaultButton" class="w-36 mb-5 text-white bg-blue-700 hover:bg-blue-800 flex focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" type="button"><FunnelFill className="text-lg" /> Filters
                </button>
                {cwspaces.length > 0 ? <div className="flex flex-col gap-8">
                {cwspaces.length > 0 ? cwspaces.map((cwspace) =>{
                    return <Card cwspace ={cwspace} />
                }) : null}
                </div> : null}
                <div className="mt-[50px] flex justify-center">
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default WorkSpaces;