import { useState } from "react";
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
function Review() {
    const token = useSelector(store => store.auth).token;
    const userData = token ? jwtDecode(token) : null;
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const [reviewBody, setReviewBody] = useState("")
    const [errormessage, setErrorMessage] = useState("");
    const [reviewRate, setReviewRate] = useState(1)
    const [reviewComplete, setReviewComplete] = useState(false);
    function createReview(e) {
        e.preventDefault();
        if (reviewBody === "") {
            setErrorMessage("Please fill all the required fields")
            return;
        }
        fetch(`http://localhost:4000/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "rate": reviewRate,
                "body": reviewBody,
                "clientClientID": userData.clientID,
                "cwSpaceCwID": id
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "error") {
                setErrorMessage(data.message)
            } else if (data.status === "fail") {
                setErrorMessage(data.message)
            } else if (data.status === "success") {
                setReviewComplete(true)
                setInterval(() => {
                    navigate("/workspaces")
                }, 3000)
            }
        })
    }
    if (!reviewComplete) return (
        <div className="min-h-screen mt-[50px] w-4/5 mx-auto">
            <div className="w-full mt-4 md:px-10">
                <h2 className="mb-4 text-2xl font-bold">Write your review</h2>
                <textarea className="w-full border border-gray-600 p-2 min-h-[200px] focus:outline-none" onChange={e => setReviewBody(e.target.value)}></textarea>
                <div className="flex items-center gap-5 my-2">
                    <h2 className="text-xl main-font">Rating: </h2>
                    <ReviewStars reviewRate={reviewRate} setReviewRate={setReviewRate} />
                </div>
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
                        <p className="mt-5">Thanks for using our platform.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;