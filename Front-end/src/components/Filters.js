import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
function Filters({handleFilter}) {
    const [catdropdown, setCatDropDown] = useState(false)
    const [pricedropdown, setPRiceDropDown] = useState(false)
    const [value, setValue] = useState([20, 37]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="bg-white shadow rounded-xl p-5 w-3/4 sm:w-1/2">
            <h2 className="text-xl font-bold mb-5">Filters</h2>
            <div className="my-3">
                <div className="flex items-center justify-between font-medium hover:cursor-pointer" onClick={() => setCatDropDown(!catdropdown)}>
                    <h2 className="text-md">Category</h2>
                    {catdropdown ? <ChevronUp className="text-sm" /> : <ChevronDown className="text-sm" />}
                </div>
                <div className={`mt-3 text-gray-700 ${catdropdown ? null : "hidden"}`}>
                    <div className="flex gap-3 items-center">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 cursor-pointer shadow-none" required=""></input>
                        <h2>Shared</h2>
                    </div>
                    <div className="flex gap-3 items-center">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 cursor-pointer shadow-none" required=""></input>
                        <h2>Private</h2>
                    </div>
                </div>
                <hr class="solid my-3"></hr>
            </div>
            <div className="my-3">
                <div className="flex items-center justify-between font-medium hover:cursor-pointer" onClick={() => setPRiceDropDown(!pricedropdown)}>
                    <h2 className="text-md">Price</h2>
                    {pricedropdown ? <ChevronUp className="text-sm" /> : <ChevronDown className="text-sm" />}
                </div>
                <div className={`mt-3 text-gray-700 ${pricedropdown ? null : "hidden"}`}>
                    <div>
                        <Box sx={{ width: "100%" }}>
                            <Slider
                                size="small"
                                getAriaLabel={() => 'Temperature range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={100}
                                max={1000}
                                disableSwap
                            />
                        </Box>
                    </div>
                </div>
                <div className="mt-10 flex items-center justify-between">
                    <button className="btn-color px-4 py-2 rounded-lg">
                        Apply
                    </button>
                    <button className="btn-color px-4 py-2 rounded-lg" onClick={()=> handleFilter()}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filters;