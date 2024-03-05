import WorkSpaceCard from "../components/WorkSpaceCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import emptyList from "../components/images/NoFavourites.png"
function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const token = useSelector(store => store.auth).token;
    const profileData = jwtDecode(token);
    useEffect(() => {
        getFavourites();
    }, [])
    const getFavourites = () => {
        fetch(`http://localhost:4000/favourites/${profileData.clientID}`)
            .then(res => res.json())
            .then(responsedata => {
                setFavourites(responsedata.data);
            }
            ).catch(error => { });
    }
    return (
        <div className="min-h-screen mt-[50px] w-4/5 mx-auto">
            <h2 className="main-font md:text-3xl text-xl">My Favourites</h2>
            <div className="mt-[20px] flex flex-col gap-8">
                {favourites?.length > 0 ? favourites?.map((cwspace) => {
                    return <WorkSpaceCard cwspace={cwspace} showFavIcon={false} profileData={profileData} getFavourites={getFavourites} key={cwspace.cwID} />
                }) : <div className="flex flex-col items-center text-center mt-10">
                    <img src={emptyList} alt="" className="md:h-[350px] md:w-[350px] h-[250px] w-[250px] object-contain"></img>
                    <div>
                        <p className="mt-5 text-gray-500 text-md md:text-lg sec-font">Your List is Empty</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Favourites;