import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageNotFound from "../PageNotFound";
import { Stars, StarFill, Star, StarHalf, PersonCircle } from "react-bootstrap-icons"
import rightMark from "../../components/images/Right mark.png"
import { ClockFill, TelephoneFill } from "react-bootstrap-icons"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import OpenStreetMap from "../../components/StreetMap";
function ReviewStars(props) {
    const rate = props.rate;
    const apxrate = Math.round(rate * 2) / 2;
    let stars = [1, 2, 3, 4, 5];
    return (
        <div className="flex items-center gap-2">
            <h2>{rate}</h2>
            <div className="flex text-md text-yellow-500">
                {stars.map(i => {
                    if (i <= apxrate) return <StarFill />
                    else if (i - 0.5 === apxrate) return <StarHalf />
                    else return <Star />
                })}
            </div>
        </div>
    )
}
function Review(props) {
    const review = props.review
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date(review.createdAt)
    const reviewDate = date.getDate().toString() + " " + months[date.getMonth()] + " " + date.getFullYear().toString();
    const imageUrl = "http://localhost:4000/images/clients/"
    return (
        <div className="md:px-10 lg:w-3/4 my-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center md:gap-5 gap-2">
                    {review.profilePic ? <img src={imageUrl + review.profilePic} className="h-[50px] w-[50px] rounded-full object-cover"></img> : <PersonCircle className="text-[40px]" />}
                    <h2 className="md:text-2xl main-font">{review.name}</h2>
                </div>
                <ReviewStars rate={review.rate} />
            </div>
            <p className="mt-6">{review.body}</p>
            <p className="text-sm py-4 text-gray-600">{reviewDate}</p>
        </div>
    )
}
const amenities = [
    "Comfortable chair",
    "Comfortable lights",
    "High-speed internet",
    "Collaboration Tools (whiteboards, projectors, ...)",
    "Drinks & Snacks",
    "Kitchen",
    "Printers and Scanners",
    "Waiting area",
    "Event Spaces",
    "Pet-Friendly Spaces",
    "Outdoor Spaces"
];
function WorkSpaceProfile() {
    const params = useParams();
    const token = useSelector(store => store.auth).token;
    const userData = token ? jwtDecode(token) : null;
    const [cwSpace, setCWSpace] = useState(null);
    const [cwSpacePhotos, setCWSpacePhotos] = useState([]);
    const [reviews, setReviews] = useState(null);
    const [found, setFound] = useState(false);
    const [loading, setLodaing] = useState(true);
    const [reviewBody, setReviewBody] = useState("")
    const [reviewRate, setReviewRate] = useState("")
    const imageUrl = "http://localhost:4000/images/cw_spaces/";
    const getWorkSpace = () => {
        fetch(`http://localhost:4000/cw_spaces/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "error") {
                    setFound(false);
                    setLodaing(false)
                } else if (responsedata.status === "success") {
                    setCWSpace(responsedata.data);
                    setFound(true)
                    setLodaing(false)
                }
            }
            );
    }
    const getWorkSpaceImages = () => {
        fetch(`http://localhost:4000/cw_spacePhotos/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "error") {
                } else if (responsedata.status === "success") {
                    setCWSpacePhotos(responsedata.data);
                }
            }
            );
    }
    const getReviews = () => {
        fetch(`http://localhost:4000/reviews/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "error") {
                } else if (responsedata.status === "success") {
                    setReviews(responsedata.data);
                }
            }
            );
    }
    function createReview(e) {
        e.preventDefault();
        let currentDate = new Date()
        console.log(reviewRate)
        fetch(`http://localhost:4000/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "rate": reviewRate,
                "dateTime": currentDate,
                "body": reviewBody,
                "clientClientID": userData?.clientID,
                "cwSpaceCwID": params.cwID
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "error") {
                console.log(data.message);
            } else if (data.status === "success") {
                getReviews();
            }
        })
    }
    useEffect(() => {
        getWorkSpace();
        getWorkSpaceImages();
        getReviews();
    }, [])
    if (found && !loading) {
        return (
            <div className="md:w-4/5 w-[90%] mx-auto mt-[50px] min-h-screen">
                <div className="flex justify-between items-center mt-5 mb-[50px]" >
                    <h2 className="main-font md:text-3xl text-xl">{cwSpace.name}</h2>
                    <div className="flex gap-3 items-center">
                        <h2 className="md:text-[35px] text-[20px] font-light">{cwSpace.rate}</h2>
                        <div>
                            <div className="text-yellow-500 md:text-xl text-sm flex items-center">
                                {[1, 2, 3, 4, 5].map(i => {
                                    if (i <= Math.round(cwSpace.rate * 2) / 2) return <StarFill />
                                    else if (i - 0.5 === Math.round(cwSpace.rate * 2) / 2) return <StarHalf />
                                    else return <Star />
                                })}
                            </div>
                            <h2 className="mt-1 md:text-sm text-[12px]">out of {cwSpace.noOfReviews} review{cwSpace.noOfReviews > 1 && "s"}</h2>
                        </div>
                    </div>
                </div>
                <Swiper
                    className="lg:h-[30rem] md:h-[20rem] h-[15rem]"
                    effect={'coverflow'}
                    centeredSlides={true}
                    grabCursor={true}
                    loop={cwSpacePhotos.length > 2 ? true : false}
                    slidesPerView={cwSpacePhotos?.length >= 1 ? 2 : 1}
                    modules={[EffectCoverflow, Navigation]}
                    coverflowEffect={
                        {
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5
                        }
                    }
                >
                    <SwiperSlide >
                        <img src={imageUrl + cwSpace.mainPhoto} alt={cwSpace.name} className="w-full h-full object-cover" />
                    </SwiperSlide>
                    {cwSpacePhotos?.map((image, index) => {
                        return (
                            <SwiperSlide >
                                <img src={imageUrl + image.photo} key={index} alt={cwSpace.name} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <h2 className="main-font text-3xl mt-[100px]">Accessibility:</h2>
                <hr className="border-black my-3"></hr>
                <div className="mt-10 grid md:grid-cols-3 grid-cols-2 gap-5 justify-items-center">
                    <div className="flex items-center gap-2 text-lg">
                        <TelephoneFill className="text-3xl" />
                        <span>
                            <h2 className="text-sm">Phone Number</h2>
                            <p>{cwSpace.phone}</p>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                        <ClockFill className="text-3xl" />
                        <span>
                            <h2 className="text-sm">Opening Time</h2>
                            <p>{cwSpace.openingTime}</p>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                        <ClockFill className="text-3xl" />
                        <span>
                            <h2 className="text-sm">Closing Time</h2>
                            <p>{cwSpace.closingTime}</p>
                        </span>
                    </div>
                </div>
                <h2 className="main-font text-3xl mt-[50px]">Description:</h2>
                <hr className="border-black my-3"></hr>
                <p className="mt-4 mb-[30px] sec-font">{cwSpace.description}</p>
                <h2 className="main-font text-3xl mt-[50px]">Facilities & Amenities:</h2>
                <hr className="border-black my-3"></hr>
                <ul className="mt-4 mb-[30px]">
                    {amenities.map((item) => {
                        return <div className="flex items-center gap-4">
                            <img src={rightMark} alt="check" className="w-5 h-5 object-contain"></img>
                            <li className="text-lg my-1">{item}</li>
                        </div>
                    })}
                </ul>
                <h2 className="main-font text-3xl mt-[50px]">Maps:</h2>
                <hr className="border-black my-3"></hr>
                <p className="mt-4 mb-[30px] sec-font">{cwSpace.address}</p>
                {/* <div className="">
                    <iframe title={cwSpace.name + " map"} src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(cwSpace.name)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                        className="w-full "
                        height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div> */}
                <OpenStreetMap />
                <Link to="rooms"><button className="mx-auto my-[100px] main-font btn-color py-2 px-6 sm:text-2xl text-xl w-48 flex justify-center">BOOK</button></Link>
                <div className="mt-[50px]">
                    <h2 className="text-center main-font md:text-4xl text-3xl flex items-center justify-center gap-2 mb-[50px]">
                        <Stars />Reviews</h2>
                    {reviews ? reviews.map((review) => {
                        return <Review review={review} key={review.clientClientID + "/" + review.cwSpaceCwID} />
                    }) : <p className="text-center my-[100px] sec-font md:text-xl text-lg">Currently there are now reviews</p>}
                    {userData?.role === "client" ? <div className="lg:w-3/4 w-full mt-4 md:px-10">
                        <h2 className="mb-4 text-2xl font-bold">Create Review</h2>
                        <textarea className="w-full border border-gray-600 p-2 min-h-[100px]" onChange={e => setReviewBody(e.target.value)}></textarea>
                        <div className="flex items-center gap-5 my-2">
                            <h2 className="text-md font-medium">Rating: </h2>
                            <input type="number" min={0} max={5} className="border border-black p-2 rounded-xl w-14 text-center"
                                onChange={e => setReviewRate(e.target.value)}></input>
                        </div>
                        <button className="bg-yellow-500 hover:bg-yellow-600 duration-100 font-medium mt-2 px-2 py-2 float-right"
                            onClick={e => createReview(e)}>Add Review</button>
                    </div> : null}
                </div>
            </div>
        )
    } else if (loading && !found) {
        return (
            <div className="w-4/5 mx-auto mt-[50px] min-h-screen">
                <div className="md:w-1/4 w-2/5">
                    <Skeleton className="w-full h-7 mb-8" />
                </div>
                <Swiper
                    className="lg:h-[30rem] md:h-[20rem] h-[15rem]"
                    effect={'coverflow'}
                    centeredSlides={true}
                    grabCursor={true}
                    loop={true}
                    slidesPerView={2}
                    modules={[EffectCoverflow]}
                    coverflowEffect={
                        {
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5
                        }
                    }
                >
                    <SwiperSlide >
                        <Skeleton className="w-full h-full" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <Skeleton className="w-full h-full" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <Skeleton className="w-full h-full" />
                    </SwiperSlide>
                    <SwiperSlide >
                        <Skeleton className="w-full h-full" />
                    </SwiperSlide>
                </Swiper>
                <div className="mt-[100px] grid lg:grid-cols-4 grid-cols-2 gap-10">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
            </div>
        )
    } else if (!loading && !found) {
        return (
            <>
                <PageNotFound />
            </>
        )
    }
}

export default WorkSpaceProfile;