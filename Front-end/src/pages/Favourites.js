import WorkSpaceCard from "../components/WorkSpaceCard";
import { useState, useEffect } from "react";
function Favourites(){
    const [favourites, setFavourites] = useState([]);
    // useEffect(() => {
    //     getFavourites();
    // }, [])
    const getFavourites = () => {

    }
    return(
        <div className="min-h-screen mt-[50px] w-4/5 mx-auto">
            <h2 className="main-font md:text-3xl text-lg">My Favourites</h2>
            <div className="mt-[20px] flex flex-col gap-8">
                {favourites?.map((cwspace) =>{
                    return <WorkSpaceCard cwspace={cwspace} showFavIcon={false} key={cwspace.cwID} />
                })}
            </div>
        </div>
    )
}

export default Favourites;