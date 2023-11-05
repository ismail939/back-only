import { Link } from 'react-router-dom';
import image from './images/offer1.jpg';

function Card(props) {
    const cwspace1 = props.cwspace;
    return (
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="md:flex">
                <div class="md:shrink-0">
                    <Link><img class="h-48 w-full object-cover md:h-full md:w-64" src={image} alt="Modern building architecture"></img></Link>
                </div>
                <div class="px-8 py-2">
                    <Link to="#" class="capitalize block text-lg leading-tight font-medium text-black hover:underline">{cwspace1.name}</Link>
                    <div class="uppercase mt-1  tracking-wide text-sm text-indigo-500 font-semibold">{cwspace1.address}</div>
                    <p class="mt-2 text-slate-500">{cwspace1.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;