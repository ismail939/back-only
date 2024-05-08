import { useEffect, useState } from "react"
import Offer1 from "./images/offer1.jpg"
import Offer2 from "./images/offer2.jpg"
import { Link } from "react-router-dom"

function Slider(){
    const images = [Offer1, Offer2, Offer1,Offer2]
    const [homeoffers, setHomeOffers] = useState([]);
    const [fetcherror, setFetchError] = useState(false);
    const getOfferImages = () => {
        fetch("http://localhost:4000/offers/home")
            .then(res => res.json())
            .then(responsedata => {
                setHomeOffers(responsedata.data);
            }
            ).catch(error => { setFetchError(true); });
    }
    useEffect(() => {
        getOfferImages();
    }, [])
    const [current, setcurrent] = useState(0);
    const next = () =>{
        homeoffers ? setcurrent((current) => current === homeoffers.length - 1 ? 0 : current + 1) : 
        setcurrent((current) => current === images.length - 1 ? 0 : current + 1)
    }
    useEffect(() =>{
        const slideInterval = setInterval(next , 5000);
        return() => clearInterval(slideInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[homeoffers])
    return(
        <div className="w-4/5 mx-auto mt-[70px] overflow-hidden mb-[100px] relative">
            <h2 className="text-center mb-8 text-5xl main-font">Offers</h2>
            <div className="relative">
                <div className="h-[500px] flex transition-transform ease-in-out duration-500" style={{transform: `translateX(-${current *100}%)`}}>
                    {homeoffers ? homeoffers.map((offer) =>{
                        return <img className="object-cover h-full w-full rounded-xl" src={offer.img} alt="" style={{flexShrink:"0" , flexGrow:"0"}}></img>
                    }) : images.map((image) =>{
                        return <img className="object-cover h-full w-full rounded-xl" src={image} alt="" style={{flexShrink:"0" , flexGrow:"0"}}></img>
                    })}
                </div>
                <div className="absolute bottom-4 right-0 left-0">
                    <div className="flex justify-center items-center gap-2">
                        {homeoffers ? homeoffers.map((img , i) =>{
                            return <div className={`transiton-all cursor-pointer w-2 h-2 bg-white rounded-full 
                            ${current === i ? "p-1.5" : "opacity-50" }`} onClick={() => setcurrent(i)}></div>
                        }) : images.map((img , i) =>{
                            return <div className={`transiton-all cursor-pointer w-2 h-2 bg-white rounded-full 
                            ${current === i ? "p-1.5" : "opacity-50" }`} onClick={() => setcurrent(i)}></div>
                        })}
                    </div>
                </div>
                <Link to="offers"><button className="md:w-36 absolute bottom-2 right-4 btn-color rounded-lg py-2 px-4 text-white  ease-in-out duration-100 max-sm:right-1">View all</button></Link>
            </div>
            
        </div>
    )
}

export default Slider;