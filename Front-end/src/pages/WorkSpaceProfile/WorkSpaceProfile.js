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
    return (
        <div className="lg:w-3/5 my-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center md:gap-5 gap-2">
                    {review.img ? <img src={review.img} className="h-[50px] w-[50px] rounded-full object-cover"></img> : <PersonCircle className="text-[40px]" />}
                    <h2 className="md:text-2xl main-font">{review.name}</h2>
                </div>
                <ReviewStars rate={review.totalRate} />
            </div>
            <p className="mt-6">{review.body}</p>
            <p className="text-sm py-4 text-gray-600">{reviewDate}</p>
        </div>
    )
}
function WorkSpaceProfile() {
    const params = useParams();
    const [cwSpace, setCWSpace] = useState(null);
    const [cwSpacePhotos, setCWSpacePhotos] = useState([]);
    const [reviews, setReviews] = useState(null);
    const [found, setFound] = useState(false);
    const [loading, setLodaing] = useState(true);
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
    const amenities = cwSpace?.amenities?.split("/");
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
                        <img src={cwSpace.img} alt={cwSpace.name} className="w-full h-full object-cover" />
                    </SwiperSlide>
                    {cwSpacePhotos?.map((image, index) => {
                        return (
                            <SwiperSlide >
                                <img src={image.img} key={index} alt={cwSpace.name} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className="flex items-center justify-center gap-10  mt-[100px]">
                    <hr className="border-gray-300 my-3 w-1/4"></hr>
                    <h2 className="main-font text-3xl">Accessibility</h2>
                    <hr className="border-gray-300 my-3 w-1/4"></hr>
                </div>
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
                <div className="flex items-center justify-center gap-10 mt-[100px]">
                    <hr className="border-gray-300 my-3 w-1/4"></hr>
                    <h2 className="main-font text-3xl">Description</h2>
                    <hr className="border-gray-300 my-3 w-1/4"></hr>
                </div>
                <p className="mt-7 mb-[30px] sec-font">{cwSpace.description}</p>
                <h2 className="main-font text-3xl mt-[80px]">Facilities & Amenities:</h2>
                <hr className="border-gray-400 my-3"></hr>
                <ul className="mt-4 mb-[30px]">
                    {amenities?.map((item) => {
                        return <div className="flex items-center gap-4">
                            <img src={rightMark} alt="check" className="w-5 h-5 object-contain"></img>
                            <li className="text-lg my-1">{item}</li>
                        </div>
                    })}
                </ul>
                <h2 className="main-font text-3xl mt-[50px]">Maps:</h2>
                <hr className="border-gray-400 my-3"></hr>
                <p className="mt-4 mb-[30px] sec-font">{cwSpace.address}</p>
                {/* <div className="">
                    <iframe title={cwSpace.name + " map"} src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(cwSpace.name)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                        className="w-full "
                        height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div> */}
                <OpenStreetMap adjust={false} position={{ lat: cwSpace.lat, lng: cwSpace.lng }} />
                <Link to="rooms" className="mx-auto my-[100px] main-font btn-color py-2 px-6 sm:text-2xl text-xl w-48 flex justify-center">BOOK</Link>
                <div className="mt-[50px] mx-5 sm:mx-auto">
                    <h2 className="text-center main-font md:text-4xl text-3xl flex items-center justify-center gap-2">
                        <Stars />Reviews</h2>
                    <div className="flex justify-center">
                        <div className="grid md:my-[50px] my-[30px] sm:grid-cols-2 gap-8">
                            <div className="flex items-center text-xl gap-10">
                                <h2 className="font-bold w-[90px]">Design: </h2>
                                <ReviewStars rate={cwSpace.designRate} />
                            </div>
                            <div className="flex items-center text-xl gap-10">
                                <h2 className="font-bold w-[90px]">Staff: </h2>
                                <ReviewStars rate={cwSpace.staffRate} />
                            </div>
                            <div className="flex items-center text-xl gap-10">
                                <h2 className="font-bold w-[90px]">Internet Quality:</h2>
                                <ReviewStars rate={cwSpace.internetQualityRate} />
                            </div>
                            <div className="flex items-center text-xl gap-10">
                                <h2 className="font-bold w-[90px]">Cost: </h2>
                                <ReviewStars rate={cwSpace.costRate} />
                            </div>
                            <div className="flex items-center text-xl gap-10">
                                <h2 className="font-bold w-[90px]">Privacy: </h2>
                                <ReviewStars rate={cwSpace.privacyRate} />
                            </div>
                            <div className="flex items-center text-xl gap-10 ">
                                <h2 className="font-bold w-[90px]">Atmosphere:</h2>
                                <ReviewStars rate={cwSpace.atmosphereRate} />
                            </div>
                        </div>
                    </div>
                    {reviews ? reviews.map((review) => {
                        return <Review review={review} key={review.clientClientID + "/" + review.cwSpaceCwID} />
                    }) : <p className="text-center my-[100px] sec-font md:text-xl text-lg">Currently there are now reviews</p>}
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