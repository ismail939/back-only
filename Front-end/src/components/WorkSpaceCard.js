import { Link } from 'react-router-dom';
import { Star, StarFill, TrashFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function WorkSpaceCard(props) {
    const cwspace = props.cwspace;
    const token = useSelector(store => store.auth).token;
    const profileData = props.profileData;
    const getFavourites = props.getFavourites;
    const favourites = props.favourites;
    const showFavIcon = props.showFavIcon;
    const isInFavourites = favourites?.some(item => item.cwID === cwspace.cwID);
    const [selected, setSelected] = useState(isInFavourites)
    function addToFavourites(){
        fetch(`${process.env.REACT_APP_BASE_URL}/favourites`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "clientClientID": profileData.clientID,
                "cwSpaceCwID": cwspace.cwID
            }),
        }).then(res => res.json()).then((resdata) => {
            console.log(resdata)
            if (resdata.status === "success") {
                setSelected(!selected);
            }
        })
    }
    function RemoveFromFavourites(){
        fetch(`${process.env.REACT_APP_BASE_URL}/favourites`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "clientClientID": profileData.clientID,
                "cwSpaceCwID": cwspace.cwID
            }),
        }).then(res => res.json()).then((resdata) => {
            if (resdata.status === "success") {
                if(!showFavIcon) getFavourites();
                setSelected(!selected);
            }
        })
    }
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden relative md:h-[170px]">
            <div className="md:flex md:h-full">
                <div className="md:shrink-0">
                    <Link to={`/workspaces/${cwspace.cwID}`}><img className="h-48 w-full object-cover md:h-full md:w-64 hover:scale-105 duration-500" src={cwspace.img} alt={cwspace.name}></img></Link>
                </div>
                <div className="px-8 py-2">
                    <Link to={`/workspaces/${cwspace.cwID}`} className="capitalize block font-semibold text-lg leading-tight font-medium text-black hover:text-[#3282B8] duration-300 sec-font">{cwspace.name}</Link>
                    <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{cwspace.address}</div>
                    <p className="mt-2 text-slate-500 sec-font">{cwspace.description}</p>
                </div>
            </div>
            {showFavIcon && profileData?.clientID && <div className="absolute top-3 right-3 text-yellow-500 text-xl cursor-pointer hover:text-yellow-600 duration-300" onClick={() => {if(!selected) addToFavourites(); else RemoveFromFavourites();}}>
                {selected ? <StarFill /> : <Star/>}
            </div>}
            {!showFavIcon && <div className="absolute top-3 right-3 text-red-500 text-xl cursor-pointer hover:text-red-600 duration-300" onClick={() => { RemoveFromFavourites()}}>
                <TrashFill />
            </div>}
        </div>
    )
}

export default WorkSpaceCard;