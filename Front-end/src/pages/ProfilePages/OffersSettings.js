import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
function OffersSettings() {
    const [offers, setOffers] = useState([]);
    const [noOffers, setNoOffers] = useState(false);
    const token = useSelector(store => store.auth).token;
    const profileData = jwtDecode(token);
    const [loading, setLoading] = useState(true)
    const cwid = profileData.cwSpaceCwID
    useEffect(() => {
        getOffers();
    }, [])
    const getOffers = () => {
        fetch(`http://localhost:4000/offers/cw_space/${cwid}`)
            .then(res => res.json())
            .then(responsedata => {
                setOffers(responsedata.data);
                setLoading(false);
                if (responsedata.message === "There are No Available Offers for This Co-working Space") setNoOffers(true);
            }
            ).catch(error => {
                console.error('Error during fetch operation:', error);
            });
    }
    function OfferCard(props) {
        const offer = props.offer;
        function removeOffer() {
            fetch(`http://localhost:4000/offers/${offer.offerID}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(res => res.json()).then((data) => {
                if (data.status === "success") {
                    console.log("success")
                    getOffers();
                } else if (data.status === "error") {
                    console.log(data)
                } else if (data.status === "fail") {
                    console.log(data)
                }
            }).catch(error => console.log(error))
        }
        function alert() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3282B8",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    removeOffer();
                }
            });
        }
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="">
                    <div className="md:shrink-0">
                        <img className="h-48 w-full object-cover" src={offer.img} alt="Modern building architecture"></img>
                    </div>
                    <div className="px-8 py-2">
                        <h2 className="capitalize block font-semibold text-lg leading-tight font-medium text-black sec-font">{offer.title}</h2>
                        <div className="uppercase mt-1  tracking-wide text-sm text-[#0F4C75] font-semibold sec-font">{offer.name}</div>
                        <p className="mt-2 text-slate-500 sec-font">start date : {offer.start.slice(0, 10)}</p>
                        <p className="mt-2 text-slate-500 sec-font">end date :{offer.end.slice(0, 10)}</p>
                        <div className="flex items-center justify-between gap-4">
                            <Link to={`${offer.offerID}`} className="main-font text-center my-2 btn-color py-2 px-2 w-full">Edit</Link>
                            <button className="main-font my-2 bg-[#ee0000] hover:bg-[#dd0000] duration-200 py-2 px-2 w-full" onClick={() => alert()}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (!loading) return (
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
                <div className="mt-8">
                    <Link to="../createOffer" className="px-6 py-4 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200">ADD NEW OFFER</Link>
                </div>
            </div>
            }
        </>
    )
}
export default OffersSettings;