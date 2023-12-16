import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageNotFound from "./PageNotFound";
import { Stars, StarFill, Star, StarHalf, PersonCircle, HouseDoorFill } from "react-bootstrap-icons"
import { ClockFill, TelephoneFill } from "react-bootstrap-icons"
import Image1 from "../components/images/cover.jpg"
import Image2 from "../components/images/offer1.jpg"
import Image3 from "../components/images/offer2.jpg"
import Image4 from "../components/images/HomeImage.jpg"
import Image5 from "../components/images/cover.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
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
    const date = new Date(review.dateTime)
    console.log(date.getMonth())
    const reviewDate = date.getDate().toString()+ " " + months[date.getMonth()] + " " + date.getFullYear().toString();
    return (
        <div className="md:px-10 lg:w-3/4 my-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center md:gap-5 gap-2">
                    <PersonCircle className="text-[40px]" />
                    <h2 className="md:text-2xl main-font">{review.name}</h2>
                </div>
                <ReviewStars rate={review.rate} />
            </div>
            <p className="mt-6">{review.body}</p>
            <p className="text-sm py-4 text-gray-600">{reviewDate}</p>
        </div>
    )
}
function WorkSpaceProfile() {
    const params = useParams();
    const [cwSpace, setCWSpace] = useState(null);
    const [cwSpacePhotos, setCWSpacePhotos] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [found, setFound] = useState(false);
    const [loading, setLodaing] = useState(true);
    const client = useSelector(state => state.auth)
    const imageUrl = "http://localhost:4000/images/cw_spaces/";
    const images = [Image1, Image2, Image3, Image4, Image5]
    const getWorkSpace = () => {
        fetch(`http://localhost:4000/cw_spaces/${params.cwID}`)
            .then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "error") {
                    setFound(false);
                    setLodaing(false)
                } else if (responsedata.status === "success") {
                    setCWSpace(responsedata.data[0]);
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
    useEffect(() => {
        getWorkSpace();
        getWorkSpaceImages();
        getReviews();
    }, [])
    if (found) {
        return (
            <div className="w-4/5 mx-auto mt-[50px] min-h-screen">
                <h2 className="main-font md:text-3xl text-xl mt-5 mb-[50px]">{cwSpace.name}</h2>
                <Swiper
                    className="lg:h-[30rem] md:h-[20rem] h-[15rem]"
                    effect={'coverflow'}
                    centeredSlides={true}
                    grabCursor={true}
                    loop={images.length > 2 ? true : false}
                    slidesPerView={2}
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
                        <img src={imageUrl + cwSpace.mainPhoto} className="w-full h-full object-cover" />
                    </SwiperSlide>
                    {images.map((image, index) => {
                        return (
                            <SwiperSlide >
                                <img src={image} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className="mt-[100px] grid lg:grid-cols-4 grid-cols-2 gap-5 justify-items-center">
                    <div className="flex items-center gap-2 text-lg">
                        <HouseDoorFill className="text-3xl" />
                        <span>
                            <h2 className="text-sm">Address</h2>
                            <p>{cwSpace.address}</p>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                        <TelephoneFill className="text-3xl" />
                        <span>
                            <h2 className="text-sm">Phone Number</h2>
                            <p>{cwSpace.phones[0]}</p>
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
                <p className="mt-10 mb-[30px] sec-font bg-gray-100 rounded-xl p-10">{cwSpace.description}</p>
                <Link to={client?.user ? "rooms" : "../../login"}><button className="mx-auto my-[100px] main-font btn-color py-2 px-6 sm:text-2xl text-xl w-48 flex justify-center">BOOK</button></Link>
                <div className="mt-[50px]">
                    <h2 className="text-center main-font md:text-4xl text-2xl flex items-center justify-center gap-2 mb-[50px]">
                        <Stars />Reviews</h2>
                    <Review review={{ name: "Ismail Salama", rate: 2.5, dateTime: "2023-11-23T18:08:23.684Z", body: "This pleace I really enjoyed it. It was great and the rooms were very quite and comfy which helped me to focus a lot.This pleace I really enjoyed it. It was great and the rooms were very quite and comfy which helped me to focus a lot." }} />
                    <Review review={{ name: "Abdelrahman Modather", rate: 4, dateTime: "2023-11-23T18:08:23.684Z", body: "This pleace I really enjoyed it. It was great and the rooms were very quite and comfy which helped me to focus a lot." }} />
                    <Review review={{ name: "Youssef Hesham", rate: 4.5, dateTime: "2023-01-23T18:08:23.684Z", body: "This pleace I really enjoyed it. It was great and the rooms were very quite and comfy which helped me to focus a lot." }} />
                    <Review review={{ name: "Tarek Ahmed", rate: 0.5, dateTime: "2023-03-23T18:08:23.684Z", body: "Please upgrade your business" }} />
                    <Review review={{ name: "Ismail Youssef", rate: 2.5, dateTime: "2023-11-23T18:08:23.684Z", body: "This pleace I really enjoyed it. It was great and the rooms were very quite and comfy which helped me to focus a lot." }} />
                    <Review review={{ name: "Abdelrahman Tarek", rate: 3.7, dateTime: "2023-12-23T18:08:23.684Z", body: "This pleace I really enjoyed it. It was great and the rooms were very quite and comfy which helped me to focus a lot." }} />
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