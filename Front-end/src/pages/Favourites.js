import WorkSpaceCard from "../components/WorkSpaceCard";
import { useState, useEffect } from "react";
import emptyList from "../components/images/NoFavourites.png"
function Favourites() {
    const [favourites, setFavourites] = useState([]);
    // useEffect(() => {
    //     getFavourites();
    // }, [])
    const getFavourites = () => {

    }
    return (
        <div className="min-h-screen mt-[50px] w-4/5 mx-auto">
            <h2 className="main-font md:text-3xl text-lg">My Favourites</h2>
            <div className="mt-[20px] flex flex-col gap-8">
                {favourites?.length > 0 ? favourites?.map((cwspace) => {
                    return <WorkSpaceCard cwspace={cwspace} showFavIcon={false} key={cwspace.cwID} />
                }) : <div className="flex flex-col items-center text-center mt-10">
                    <img src={emptyList} alt="" className="h-[300px] w-[300px] object-contain"></img>
                    <div>
                        <p className="mt-5 text-gray-500 text-md md:text-lg sec-font">Your List is Empty</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Favourites;