/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { Search, SortDownAlt, FunnelFill, XCircleFill } from "react-bootstrap-icons";
import Filters from "../../components/Filters";
function ShowError() {
    return (
        <div className="flex flex-col items-center mt-[100px] text-center">
            <XCircleFill className="" style={{ fontSize: "100px", color: "red" }} />
            <h2 className="mt-4 text-2xl font-medium">Failed to fetch data</h2>
            <p>Some data requirments failed to load please try again later</p>
        </div>
    )
}
function WorkSpaces() {
    const [dropdown, setDropDown] = useState(false);
    const [cwspaces, setCWSpaces] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    useEffect(() => {
        getWorkSpaces();
        setDropDown(false);
    }, [])
    const getWorkSpaces = () => {
        fetch("http://localhost:4000/cw_spaces")
            .then(res => res.json())
            .then(responsedata => {
                setCWSpaces(responsedata.data);
                setFetchError(false)
            }
            ).catch(error => setFetchError(true));
    }
    return (
        <div className="flex relative">
            <div className="bg-gray-100 w-52 sticky h-[100dvh] hidden">
                <Filters />
            </div>
            <div className="w-4/5 mx-auto md:mt-[30px] p-5">
                <div className="lg:w-4/5 md:w-3/5 h-10 flex items-center">
                    <input
                        type="search"
                        className="h-full w-full p-2 border-2 border-solid border-black border-r-0 rounded-l-md focus:border-[#0F4C75] focus:outline-none"
                        placeholder="Search"
                        aria-label="Search"
                    ></input>
                    <button className="duration-200 ease-in-out btn-color h-full p-4 flex items-center rounded-r-md  text-white"><Search className="text-lg" /></button>
                </div>
                <div className="w-full flex justify-between mt-8">
                    <button id="dropdownDefaultButton" class="md:w-36 w-32 mb-5 text-white btn-color flex focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" type="button"><FunnelFill className="text-lg" /> Filters
                    </button>
                    <div id="dropdown" class="relative md:w-36 w-32" onMouseLeave={() => { setDropDown(false) }}>
                        <button id="dropdownDefaultButton" class="w-full text-white btn-color flex focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" type="button" onMouseEnter={() => { setDropDown(!dropdown) }}>Sort By <SortDownAlt className="text-lg" />
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
                {!fetcherror ? <div>
                    {<div className="flex flex-col gap-8">
                        {cwspaces.map((cwspace) => {
                            return <Card cwspace={cwspace} />
                        })}</div>}
                    {/* <div className="mt-[50px] flex justify-center">
                        <Pagination />
                    </div> */}
                </div> : <ShowError />}
            </div>
        </div>
    )
}

export default WorkSpaces;