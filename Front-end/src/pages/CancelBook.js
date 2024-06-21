import { useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import check from "../components/images/check.png";
import { useNavigate } from "react-router-dom";
import image from "../components/images/cancelbook.png"
import { ExclamationCircleFill } from "react-bootstrap-icons"
function CancelBook() {
    const token = useSelector(store => store.auth).token;
    const userData = token ? jwtDecode(token) : null;
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const [cancelComplete, setCancelComplete] = useState(false);
    const [errormessage, setErrorMessage] = useState("");
    function cancelBook(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BASE_URL}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "error") {
                setErrorMessage("We cannot cancel your book currently, please try again later.")
            } else if (data.status === "fail") {
                setErrorMessage("We cannot cancel your book currently, please try again later.")
            } else if (data.status === "success") {
                setCancelComplete(true)
                setInterval(() => {
                    navigate("/workspaces")
                }, 3000)
            }
        })
    }
    if (!cancelComplete) return (
        <div className="min-h-screen mt-[100px] w-4/5 mx-auto">
            <div className="flex flex-col gap-5 justify-center items-center font-medium text-center">
                <img src={image} alt="" className="h-[250px] w-[250px] w-[500px] h-[100px] object-contain"></img>
                <div className="my-4">
                    <h2 className="text-xl max-w-[500px]">Are you sure you want to cancel your book, you won't be able to retrieve it again?</h2>
                    <button className="px-6 py-2 bg-[#ff0000] hover:bg-[#ee0000] my-4 duration-200" onClick={(e) => { cancelBook(e) }}>Cancel Book</button>
                    {errormessage !== "" && <div className="w-full flex items-center gap-3 mt-3">
                        <ExclamationCircleFill className="text-[#ff0000]" />
                        <p className="text-[#ff0000]">{errormessage}</p>
                    </div>}
                </div>
            </div>
        </div>
    )
    else return (
        <div className="min-h-screen">
            <div className="w-[90%] mx-auto mt-[100px] mb-[50px] flex justify-center">
                <div className=" w-[600px] pb-6 px-4">
                    <img src={check} alt="payment complete" className="w-full mt-6 h-[100px] object-contain" ></img>
                    <div className="mt-3 text-center px-10">
                        <h2 className="font-bold text-3xl">Your Book is Cancelled Successfully</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CancelBook; 