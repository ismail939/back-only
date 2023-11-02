import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { useState } from "react";

function Pagination() {
    const [active, setActive] = useState(1);
    const next = () => {
        if (active === 5) return;
        setActive(active + 1);
    };
    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };
    return (
        <div className="flex items-center gap-4">
            <button
                variant="text"
                className={`flex items-center gap-2 px-3 py-1 rounded-md duration-200 ease-in-out ${active === 1 ? "text-gray-300" : "hover:bg-gray-300 hover:bg-opacity-70"}`}
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeft strokeWidth={2} className="h-4 w-4 m-0" /> Previous
            </button>
            <div className="flex items-center sm:w-32 justify-between">
                <button className={`px-2 py-1 rounded-md duration-200 ease-in-out ${active === 1 ? "bg-black text-white hover:bg-gray-700" : "hover:bg-gray-300 hover:bg-opacity-70"}`} onClick={() => {setActive(1)}}>1</button>
                <button className={`px-2 py-1 rounded-md duration-200 ease-in-out ${active === 2 ? "bg-black text-white hover:bg-gray-700" : "hover:bg-gray-300 hover:bg-opacity-70"}`} onClick={() => {setActive(2)}}>2</button>
                <button className={`px-2 py-1 rounded-md duration-200 ease-in-out ${active === 3 ? "bg-black text-white hover:bg-gray-700" : "hover:bg-gray-300 hover:bg-opacity-70"}`} onClick={() => {setActive(3)}}>3</button>
                <button className={`px-2 py-1 rounded-md duration-200 ease-in-out ${active === 4 ? "bg-black text-white hover:bg-gray-700" : "hover:bg-gray-300 hover:bg-opacity-70"}`}  onClick={() => {setActive(4)}}>4</button>
                <button className={`px-2 py-1 rounded-md duration-200 ease-in-out ${active === 5 ? "bg-black text-white hover:bg-gray-700" : "hover:bg-gray-300 hover:bg-opacity-70"}`} onClick={() => {setActive(5)}}>5</button>
            </div>
            <button
                variant="text"
                className={`flex items-center gap-2 px-3 py-1 rounded-md duration-200 ease-in-out ${active === 5 ? "text-gray-300" : "hover:bg-gray-300 hover:bg-opacity-70"}`}
                onClick={next}
                disabled={active === 5}
            >
                Next
                <ArrowRight strokeWidth={2} className="h-4 w-4" />
            </button>
        </div>
    );
}

export default Pagination;