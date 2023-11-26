/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { Search, SortDownAlt, FunnelFill, XCircleFill } from "react-bootstrap-icons";
import Filters from "../../components/Filters";
import notFoundImage from "../../components/images/WorkSpaceNotFound.png"
function ShowError() {
    return (
        <div className="flex flex-col items-center mt-[100px] text-center">
            <XCircleFill className="mb-4" style={{ fontSize: "100px", color: "red" }} />
            {/* <h2 className="mt-4 text-2xl font-medium">Failed to fetch data</h2> */}
            <p className="mt-8 text-2xl font-medium">oops, there is a problem at the moment. try again later</p>
        </div>
    )
}
function WorkSpaces() {
    const [dropdown, setDropDown] = useState(false);
    const [cwspaces, setCWSpaces] = useState([]);
    const [statusresponse, setStatusResponse] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [searchlist, setSearchList] = useState(false);
    const [fetcherror, setFetchError] = useState(false);
<<<<<<< HEAD
    let menuRef = useRef();
=======
    //const [sortedData,setSortedData] =useState();
>>>>>>> sort-1
    useEffect(() => {
        getWorkSpaces();
        setDropDown(false);
    }, [])
    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setSearchList(false)
            }
        }
        document.addEventListener("mousedown", handler)
    }, [])
    const getWorkSpaces = () => {
        fetch("http://localhost:4000/cw_spaces")
            .then(res => res.json())
            .then(responsedata => {
                console.log(responsedata)
                setCWSpaces(responsedata.data);
                setFetchError(false)
                setStatusResponse(responsedata.message)
            }
            ).catch(error => { setFetchError(true); });
    }
    const getSearchData = (event) => {
        const search = event.target.value;
        setSearchData(cwspaces.filter((workspace) => {
            return search === '' ?
                null : workspace.name.toLowerCase().includes(search.toLowerCase());
        }))
    }
    function sortData(sortDir) {
        const soretedData = [...cwspaces];
        soretedData.sort((a, b) => {
            return sortDir === "lowtohigh" ? a.rate - b.rate : b.rate - a.rate;
        })
        setCWSpaces(soretedData);
    }
    return (
        <div className="flex relative min-h-screen">
            <div className="bg-gray-100 w-52 sticky h-[100dvh] hidden">
                <Filters />
            </div>
            <div className="w-4/5 mx-auto md:mt-[30px] p-5">
                <div className="relative lg:w-4/5 md:w-3/5" ref={menuRef}>
                    <div className="w-full h-10 flex items-center">
                        <input
                            type="search"
                            className="h-full w-full p-2 border-2 border-solid border-black border-r-0 rounded-l-md focus:border-[#0F4C75] focus:outline-none"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={e => getSearchData(e)}
                            onClick={() => { setSearchList(true) }}
                        ></input>
                        <button className="duration-200 ease-in-out btn-color h-full p-4 flex items-center rounded-r-md  text-white"
                            onClick={() => { if (searchData.length > 0) setCWSpaces(searchData) }}><Search className="text-lg" /></button>
                    </div>
                    {(searchData.length > 0 && searchlist) ? <div className="flex flex-col max-h-60 w-full mt-1 shadow-md rounded-md bg-[#fafafa] overflow-x-hidden absolute z-[90]" >
                        {searchData.map((workspace) => {
                            return <Link className="w-full p-3 capitalize hover:bg-gray-200 font-semibold" to={``}>{workspace.name}</Link>
                        })}
                    </div> : null}
                </div>
                <div className="w-full flex justify-between mt-8">
                    <button id="dropdownDefaultButton" className="md:w-36 w-32 mb-5 text-white btn-color flex focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" type="button"><FunnelFill className="text-lg" /> Filters
                    </button>
<<<<<<< HEAD
                    <div id="dropdown" className="relative md:w-36 w-32" onMouseLeave={() => { setDropDown(false) }}>
                        <button id="dropdownDefaultButton" className="w-full text-white btn-color flex focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" type="button" onMouseEnter={() => { setDropDown(!dropdown) }}>Sort By <SortDownAlt className="text-lg" />
=======
                    <div id="dropdown" class="relative md:w-36 w-32" onMouseLeave={() => { setDropDown(false) }}>
                        <button id="dropdownDefaultButton" class="w-full text-white btn-color flex focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 justify-center items-center gap-2" type="button" onMouseEnter={() => { setDropDown(!dropdown) }} >Sort By <SortDownAlt className="text-lg" />
>>>>>>> sort-1
                        </button>
                        <ul className={`w-full py-2 text-sm text-gray-700 z-10 bg-white rounded-lg shadow ${dropdown ? "absolute" : "hidden"}`}>
                            <li className="hover:bg-gray-100">
                                <button className="px-4 py-2" value="low-to-high" onClick={() => { sortData("lowtohigh") }}>Low to High</button>
                            </li>
                            <li className="hover:bg-gray-100">
                                <button className="block px-4 py-2" value="high-to-low" onClick={() => sortData("hightolow")} >High to Low</button>
                            </li>
                        </ul>
                    </div>
                </div>
<<<<<<< HEAD
                {!fetcherror ? <div>
                    {cwspaces ? <div className="flex flex-col gap-8">
                        {cwspaces.map((cwspace) => {
                            return <Card cwspace={cwspace} key={cwspace.cwID} />
                        })}</div> :
                        <div className="flex gap-10 h-80 flex-col lg:flex-row items-center justify-center p-5 text-center font-medium mt-[50px]">
                            <img src={notFoundImage} alt="" className="max-h-[200px] max-w-[300px]"></img>
                            <div><p className="mt-8 uppercase  md:text-4xl text-2xl">{statusresponse}</p>
                            <p className="mt-5 text-gray-500 text-md md:text-lg">Sorry for your inconvenience</p>
                            </div>
                            </div>}
                    {/* <div className="mt-[50px] flex justify-center">
=======
                {
                    !fetcherror ? <div>
                        {cwspaces ? <div className="flex flex-col gap-8">
                            {cwspaces.map((cwspace) => {
                                return <Card cwspace={cwspace} />
                            })}</div> : null}
                        {/* <div className="mt-[50px] flex justify-center">
>>>>>>> sort-1
                        <Pagination />
                    </div> */}
                    </div> : <ShowError />
                }
            </div >
        </div >
    )
}

export default WorkSpaces;