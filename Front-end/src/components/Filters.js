import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
function Filters() {
    const [dropdown, setDropDown] = useState(false)
    const [value, setValue] = useState([20, 37]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="p-4 pt-8 w-full h-full">
            <h2 className="text-xl font-bold">Filters</h2>
            <div className="my-3">
                <div className="flex items-center justify-between font-medium hover:cursor-pointer" onClick={() => setDropDown(!dropdown)}>
                    <h2 className="text-md">Category</h2>
                    {dropdown ? <ChevronUp className="text-sm" /> : <ChevronDown className="text-sm" />}
                </div>
                <div className={`mt-3 text-gray-700 ${dropdown ? null : "hidden"}`}>
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
                <div className="flex items-center justify-between font-medium hover:cursor-pointer" onClick={() => setDropDown(!dropdown)}>
                    <h2 className="text-md">Price</h2>
                    {dropdown ? <ChevronUp className="text-sm" /> : <ChevronDown className="text-sm" />}
                </div>
                <div className={`mt-3 text-gray-700 ${dropdown ? null : "hidden"}`}>
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
                            />
                        </Box>
                    </div>
                </div>
                <hr class="solid my-3"></hr>
            </div>
        </div>
    )
}

export default Filters;