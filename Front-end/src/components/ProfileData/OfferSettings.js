import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function OfferSeetings({ cwid }) {
    const [offers, setOffers] = useState([]);
    const [noOffers, setNoOffers] = useState(false);
    useEffect(() => {
        getOffers();
    }, [])
    const getOffers = () => {
        fetch(`http://localhost:4000/offers/cw_space/${cwid}`)
            .then(res => res.json())
            .then(responsedata => {
                setOffers(responsedata.data);

                if (responsedata.message === "There are No Available Offers for This Co-working Space") setNoOffers(true);
            }
            )
    }
    function OfferCard(props) {
        const offer = props.offer;
        const imageUrl = "http://localhost:4000/images/offers/" + offer.img;
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="">
                    <div className="md:shrink-0 cursor-pointer">
                        <img className="h-48 w-full object-cover hover:scale-110 duration-500" src={imageUrl} alt="Modern building architecture"></img>
                    </div>
                    <div className="px-8 py-2">
                        <Link to={`/workspaces/${offer.offerID}`} className="capitalize block font-semibold text-lg leading-tight font-medium text-black hover:text-[#3282B8] duration-300 sec-font">{offer.title}</Link>
                        <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{offer.name}</div>
                        <p className="mt-2 text-slate-500 sec-font">{offer.description}
                        </p>
                        <p className="mt-2 text-slate-500 sec-font">start date : {offer.start.slice(0, 10)}</p>
                        <p className="mt-2 text-slate-500 sec-font">end date :{offer.end.slice(0, 10)}</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {noOffers && <div className="w-full flex flex-col items-center mt-[250px]">
                <p className="text-xl">You don't have any offers yet</p>
                <p className="my-6">Create your first offer Here:</p>
                <Link to="../createOffer" className="px-6 py-3 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"> Create Offer</Link>
            </div>}
            {!noOffers && <div className="mt-8 w-3/4 mx-auto">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    {offers?.map((offer) => {
                        return <OfferCard offer={offer} key={offer.offerID} />
                    })}
                </div>
                <div className="mt-8 float-right">
                    <Link to="../createOffer" className="px-6 py-4 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200">ADD NEW OFFER</Link>
                </div>
            </div>
            }
        </>
    )
}
export default OfferSeetings;