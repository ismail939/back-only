import { Link } from 'react-router-dom';
import { Star, StarFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import image from './images/offer1.jpg';

function WorkSpaceCard(props) {
    const cwspace = props.cwspace;
    const imageUrl="http://localhost:4000/images/cw_spaces/"+cwspace.mainPhoto;
    const showFavIcon = props.showFavIcon;
    const [selected, setSelected] = useState(false)
    function addToFavourites(){
        // add api
    }
    function RemoveFromFavourites(){
        //remove api
    }
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <Link to={`/workspaces/${cwspace.cwID}`}><img className="h-48 w-full object-cover md:h-full md:w-64 hover:scale-110 duration-500" src={imageUrl} alt={cwspace.name}></img></Link>
                </div>
                <div className="px-8 py-2">
                    <Link to={`/workspaces/${cwspace.cwID}`} className="capitalize block font-semibold text-lg leading-tight font-medium text-black hover:text-[#3282B8] duration-300 sec-font">{cwspace.name}</Link>
                    <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{cwspace.address}</div>
                    <p className="mt-2 text-slate-500 sec-font">{cwspace.description}</p>
                </div>
            </div>
            {showFavIcon && <div className="absolute top-3 right-3 text-yellow-500 text-xl cursor-pointer hover:text-yellow-600 duration-300" onClick={() => {if(!selected) addToFavourites(); else RemoveFromFavourites(); setSelected(!selected);}}>
                {selected ? <StarFill /> : <Star/>}
            </div>}
        </div>
    )
}

export default WorkSpaceCard;