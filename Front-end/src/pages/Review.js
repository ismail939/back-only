import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { ExclamationCircleFill, StarFill, Star } from "react-bootstrap-icons"
import check from "../components/images/check.png";
import { useNavigate } from "react-router-dom";
function ReviewStars({ reviewRate, setReviewRate }) {
    const [hover, setHover] = useState(reviewRate);
    let stars = [1, 2, 3, 4, 5];
    return (
        <div className="">
            <div className="flex text-xl text-yellow-500 gap-1">
                {stars.map(i => {
                    return i > reviewRate ? <Star className="cursor-pointer"
                        onMouseEnter={() => { setReviewRate(i); setHover(reviewRate); }} /> :
                        <StarFill className="cursor-pointer" onClick={() => { setReviewRate(i); setHover(i) }}
                            onMouseLeave={() => { if (reviewRate !== hover) setReviewRate(hover) }} />
                })}
            </div>
        </div>
    )
}
function CertainReview({ reviews, object, setReviews }) {
    const [reviewRate, setReviewRate] = useState(0);
    useEffect(() => {
        setReviews({ ...reviews, [object.criteria]: reviewRate })
    }, [reviewRate])
    return (
        <div className="my-6">
            <h2 className="text-2xl font-medium">{object.question}</h2>
            <div className="flex items-center gap-5 my-2">
                <h2 className="text-xl main-font text-gray-400">Rating: </h2>
                <ReviewStars reviewRate={reviewRate} setReviewRate={setReviewRate} />
            </div>
        </div>
    )
}
function Review() {
    const token = useSelector(store => store.auth).token;
    const userData = token ? jwtDecode(token) : null;
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const [reviewBody, setReviewBody] = useState("")
    const [errormessage, setErrorMessage] = useState("");
    const [reviewComplete, setReviewComplete] = useState(false);
    const questions = [
        {
            "question": "On a scale of 1 to 5 stars, how would you rate the quality of the internet at our co-working space?",
            "criteria": "internetQuality"
        },
        {
            "question": "On a scale of 1 to 5 stars, how would you rate the cost of our co-working space?",
            "criteria": "cost"
        },
        {
            "question": "On a scale of 1 to 5 stars, how would you rate the atmosphere of our co-working space?",
            "criteria": "atmosphere"
        },
        {
            "question": "On a scale of 1 to 5 stars, how would you rate the helpfulness and friendliness of our staff?",
            "criteria": "staff"
        },
        {
            "question": "On a scale of 1 to 5 stars, how would you rate the level of privacy at our co-working space?",
            "criteria": "privacy"
        },
        {
            "question": "On a scale of 1 to 5 stars, how would you rate the design and aesthetics of our co-working space?",
            "criteria": "design"
        },
        {
            "question": "On a scale of 1 to 5 stars, how would you rate your overall experience in our co-working space?",
            "criteria": "overall"
        }
    ];
    const [reviews, setReviews] = useState({
        internetQuality: 0,
        cost: 0,
        atmosphere: 0,
        staff: 0,
        privacy: 0,
        design: 0,
        overall: 0,
    });
    function createReview(e) {
        e.preventDefault();
        if (Object.values(reviews).every(value => value === 0)) {
            setErrorMessage("Please rate any of the previous fields before submitting your review")
            return;
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "totalRate": reviews.overall,
                "body": reviewBody,
                "clientClientID": userData.clientID,
                "cwSpaceCwID": parseInt(id),
                "internetQualityRate": reviews.internetQuality,
                "costRate": reviews.cost,
                "atmosphereRate": reviews.atmosphere,
                "staffRate": reviews.staff,
                "privacyRate": reviews.privacy,
                "designRate": reviews.design,
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "error") {
                setErrorMessage("We cannot proceed with your request, please try again later.")
            } else if (data.status === "fail") {
                console.log(data.message)
                setErrorMessage("We cannot proceed with your request, please try again later.")
            } else if (data.status === "success") {
                setReviewComplete(true)
                setInterval(() => {
                    navigate("/workspaces")
                }, 3000)
            }
        })
    }
    if (!reviewComplete) return (
        <div className="min-h-screen mt-[50px] w-4/5 mx-auto" >
            <div className="lg:w-3/4 w-full mt-4 md:px-10">
                <h2 className="mb-3 text-4xl main-font">Review</h2>
                <p className="mb-8 ">Your feedback is incredibly valuable to us as we strive to provide the best possible experience. We would greatly appreciate it if you could take a moment to share your thoughts on various aspects of our space. Your insights will help us improve and better serve you and our community.</p>
                <div className="my-4">
                    {questions.map((object) => {
                        return <CertainReview reviews={reviews} object={object} setReviews={setReviews} />
                    })}
                </div>
                <p className="mt-5 text-xl">Any additional comments:</p>
                <textarea className="w-full mt-4 border border-gray-600 p-2 min-h-[200px] focus:outline-none" onChange={e => setReviewBody(e.target.value)}></textarea>
                {errormessage !== "" && <div className="w-full flex items-center gap-3 mt-6">
                    <ExclamationCircleFill className="text-[#ff0000]" />
                    <p className="text-[#ff0000]">{errormessage}</p>
                </div>}
                <button className="bg-yellow-500 hover:bg-yellow-600 duration-100 font-medium mt-2 px-2 py-2 float-right"
                    onClick={e => createReview(e)}>Add Review</button>
            </div>
        </div>
    )
    else return (
        <div className="min-h-screen">
            <div className="w-[90%] mx-auto mt-[100px] mb-[50px] flex justify-center">
                <div className=" w-[600px] pb-6 px-4">
                    <img src={check} alt="payment complete" className="w-full mt-6 h-[100px] object-contain" ></img>
                    <div className="mt-3 text-center px-10">
                        <h2 className="font-bold text-3xl">Review Submitted</h2>
                        <p className="mt-5">Thanks for sharing your opinion.</p>
                        <p>Your insights will help us improve and better serve you and our community.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;