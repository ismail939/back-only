import { Link } from 'react-router-dom';
import image from './images/offer1.jpg';

function OfferCard(props) {
    const offer = props.offer;
    const imageUrl = "http://localhost:4000/images/offers/" + offer.img;

    return (
        <div className="bg-white shadow-md overflow-hidden">
            <div className="md:flex">
                <div className="md:shrink-0 md:w-1/2 relative group ">
                <Link to={`/workspaces/${offer.offerID}`}><div className="bg-black w-full h-full opacity-0 absolute group-hover:opacity-50 duration-500"></div></Link>
                    <img className="h-48 w-full object-cover md:h-72 md:w-full" src={imageUrl} alt={offer.name}></img>
                </div>
                <div className="px-8 py-2">
                    <Link to={`/workspaces/${offer.offerID}`} className="capitalize block font-semibold text-2xl md:text-3xl leading-tight font-medium text-black hover:text-[#3282B8] duration-300 main-font">{offer.title}</Link>
                    <p className="mt-2 text-slate-500 sec-font text-lg">{offer.description}
                    </p>
                    <p className="mt-2 text-slate-500 sec-font">start date : {offer.start.slice(0, 10)}</p>
                    <p className="mt-2 text-slate-500 sec-font">end date :{offer.end.slice(0, 10)}</p>
                </div>
            </div>
        </div>
    )
}

export default OfferCard;