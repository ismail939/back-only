import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
function Filters({ handleFilter, priceRange, AdjustPriceRange, ApplyFilter, setAvailableRooms }) {
    const [catdropdown, setCatDropDown] = useState(false)
    const [pricedropdown, setPRiceDropDown] = useState(false)
    let availableRooms = []
    function handleChange(e){
        if(e.target.checked){
            availableRooms.push(e.target.name)
        } else{
            availableRooms = availableRooms.filter(item => item !== e.target.name);
        }
        setAvailableRooms(availableRooms)
    }
    return (
        <div className="bg-white shadow rounded-md p-5 w-3/4 sm:w-1/2">
            <h2 className="text-xl font-bold mb-5">Filters</h2>
            <div className="my-3">
                <div className="flex items-center justify-between font-medium hover:cursor-pointer" onClick={() => setCatDropDown(!catdropdown)}>
                    <h2 className="text-md">Available Rooms</h2>
                    {catdropdown ? <ChevronUp className="text-sm" /> : <ChevronDown className="text-sm" />}
                </div>
                <div className={`mt-3 text-gray-700 ${catdropdown ? null : "hidden"}`}>
                    <div className="flex gap-3 items-center mb-3">
                        <input name="Shared" type="checkbox" className="w-5 h-5 cursor-pointer" 
                        onChange={handleChange}></input>
                        <h2 className="font-medium text-md">Shared</h2>
                    </div>
                    <div className="flex gap-3 items-center">
                        <input name="Private" type="checkbox" className="w-5 h-5 cursor-pointer"
                        onChange={handleChange}></input>
                        <h2 className="font-medium text-md">Private</h2>
                    </div>
                </div>
                <hr class="solid my-3"></hr>
            </div>
            <div className="my-3">
                <div className="flex items-center justify-between font-medium hover:cursor-pointer" onClick={() => setPRiceDropDown(!pricedropdown)}>
                    <h2 className="text-md">Shared Room Price</h2>
                    {pricedropdown ? <ChevronUp className="text-sm" /> : <ChevronDown className="text-sm" />}
                </div>
                <div className={`mt-3 text-gray-700 ${pricedropdown ? null : "hidden"}`}>
                    <div className="my-3 text-md flex items-center gap-5">Price: 
                    <input type="number" min={0} max={500} value={priceRange[0]} className="border verify-input text-center w-20 px-4 py-1 focus:outline-none"
                    onChange={e => AdjustPriceRange([e.target.value, priceRange[1]])}></input>
                        -
                        <input type="number" min={500} max={1000} value={priceRange[1]} className="border verify-input text-center w-20 px-4 py-1 focus:outline-none"
                        onChange={e => AdjustPriceRange([ priceRange[0], e.target.value])}></input>
                    </div>
                    <div>
                        <Box sx={{ width: "100%" }}>
                            <Slider
                                size="small"
                                getAriaLabel={() => 'Temperature range'}
                                value={priceRange}
                                onChange={e => AdjustPriceRange(e.target.value)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                                disableSwap
                            />
                        </Box>
                    </div>
                </div>
                <div className="mt-10 flex items-center justify-between">
                    <button className="btn-color px-4 py-2 rounded-lg" onClick={() => ApplyFilter()}>
                        Apply
                    </button>
                    <button className="btn-color px-4 py-2 rounded-lg" onClick={() => handleFilter()}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filters;