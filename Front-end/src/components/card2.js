import { Link } from 'react-router-dom';
import image from './images/offer1.jpg';

function Card2(props) {
    const offer = props.offer;
    const imageUrl="http://localhost:4000/images/"+offer.img;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <Link to={`/workspaces/${offer.offerID}`}><img className="h-48 w-full object-cover md:h-full md:w-64 hover:scale-110 duration-500" src={imageUrl} alt="Modern building architecture"></img></Link>
                </div>
                <div className="px-8 py-2">
                    <Link to={`/workspaces/${offer.offerID}`} className="capitalize block font-semibold text-lg leading-tight font-medium text-black hover:text-[#3282B8] duration-300 sec-font">{offer.title}</Link>
                    <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{offer.name}</div>
                    <p className="mt-2 text-slate-500 sec-font">{offer.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Card2;