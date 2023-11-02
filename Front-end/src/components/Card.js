import { Link } from 'react-router-dom';
import image from './images/offer1.jpg';

function Card() {
    return (
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="md:flex">
                <div class="md:shrink-0">
                    <Link><img class="h-48 w-full object-cover md:h-full md:w-64" src={image} alt="Modern building architecture"></img></Link>
                </div>
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
                    <Link to="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</Link>
                    <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.
                    Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.
                    Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
                </div>
            </div>
        </div>
    )
}

export default Card;