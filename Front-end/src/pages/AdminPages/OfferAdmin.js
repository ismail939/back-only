import { useState, useEffect } from "react";
function OfferAdmin(){
    const [offers, setOffers] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    const [selected, setSelected] = useState({});
    const getOffers = () => {
        fetch("http://localhost:4000/offers")
            .then(res => res.json())
            .then(responsedata => {
                setOffers(responsedata.data);
            }
            ).catch(error => { setFetchError(true); console.log(error) });
    }
    useEffect(() => {
        getOffers();
    }, [])
    const EditOffer= (offerID) => {
        fetch(`http://localhost:4000/offers/${offerID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "home": "home",
            }),
        }).then(res => res.json()).then((data) => { console.log(data) })
    }
    const removeOffer= (offerID) => {
        fetch(`http://localhost:4000/offers/${offerID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "home": null,
            }),
        }).then(res => res.json()).then((data) => { console.log(data) })
    }
    return (
        <div className="min-h-screen mt-[70px] w-4/5 mx-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Offer Name</th>
                        <th scope="col">Discover</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {offers ? offers.map((offer, index) => {
                        return (
                            <tr>
                                <th scope="row">{++index}</th>
                                <td>{offer.name}</td>
                                <td className="min-w-100 flex gap-8 justify-center">
                                    <button className="px-3 py-2 bg-green-500" onClick={() => EditOffer(offer.offerID)}>Add</button>
                                    <button className="px-3 py-2 bg-red-500" onClick={() => removeOffer(offer.offerID)}>remove</button>
                                </td>
                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>
        </div>
    )
}

export default OfferAdmin;