import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { jwtDecode } from 'jwt-decode';
import { ExclamationCircleFill, CashStack, CreditCardFill } from "react-bootstrap-icons";
import { removePayData } from "../components/reduxtoolkit/Slices/paySlice";
import check from "../components/images/check.png";
import MoonLoader from "react-spinners/MoonLoader";
import { useDispatch } from "react-redux";
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
    CardElement
} from '@stripe/react-stripe-js';
import PageNotFound from "./PageNotFound";
function CheckoutForm() {
    const stripe = useStripe();
    const dispatch = useDispatch();
    const elements = useElements();
    const navigate = useNavigate();
    const payElements = useSelector(store => store.pay);
    const client = useSelector(store => store.auth);
    const profile = jwtDecode(client.token);
    const [payMethod, setPayMethod] = useState("cash");
    const [errormessage, setErrorMessage] = useState("");
    const [lodaing, setLodaing] = useState(false);
    const activeStyle = "border-2 text-[#197ec2] border-[#197ec2]"
    const payStyle = "border py-4 px-8 relative rounded-md flex items-center gap-2"
    useEffect(() => {
        if (elements) {
            let cardElement = elements.getElement('card');
            cardElement?.update({ style: { base: { fontSize: '18px' } } });
        }
    }, [elements])
    const [data, setData] = useState({
        name: "",
        cardNum: "",
        expire: "",
        cvv: ""
    })
    const [payComplete, setPayComplete] = useState(false);
    const [timer, setTimer] = useState(10);
    function redirect() {
        setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        setInterval(() => {
            navigate("/workspaces")
        }, 10000)
    }
    function HandleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const makePayment = async (event) => {
        event.preventDefault();
        if (payMethod === "visa") {
            if (data.name === "") {
                setErrorMessage("Please enter the name on your card.")
                return
            }
            if (!elements.getElement('card')._complete) {
                setErrorMessage("Please enter your card details.")
                return
            }
            setLodaing(true)
            stripe.createToken(elements.getElement('card'), {
                name: data.name
            }).then((result) => {
                if (result.error) {
                    // Handle tokenization errors (e.g., invalid card details)
                    setLodaing(false)
                    setErrorMessage(result.error);
                } else {
                    // Send the token to your server for further processing
                    setLodaing(false)
                    let token = result.token;
                    if(payElements.type === "room"){
                        makeBook(token.id)
                    }else{
                        makeRegister(token.id);
                    }
                    // Your code to send the token to the server (e.g., using AJAX)
                };
            }).catch(error => console.log(error))
        } else {
            setLodaing(true)
            makeBook(null);
        }
    }
    function makeBook(visaToken) {
        fetch(`http://localhost:4000/books`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${client.token}`
            },
            body: JSON.stringify({
                "date": payElements.date,
                "times": payElements.bookingTime,
                "payment": payMethod,
                "cardToken": visaToken,
                "type": payElements.type,
                "clientClientID": profile.clientID,
                "roomRoomID": payElements.roomid,
                "totalCost": payElements.totalPrice
            }),
        }).then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "success") {
                    dispatch(removePayData())
                    setPayComplete(true)
                    redirect()
                } else if (responsedata.status === "error") {
                    setErrorMessage(responsedata.message)
                } else if (responsedata.status === "fail") {
                    setErrorMessage(responsedata.message)
                }
            }
            ).catch();
    }
    function makeRegister(visaToken) {
        fetch(`http://localhost:4000/registers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${client.token}`
            },
            body: JSON.stringify({
                "payment": payMethod,
                "cardToken": visaToken,
                "clientClientID": profile.clientID,
                "eventEventID": payElements.roomid,
                "totalCost": payElements.totalPrice
            }),
        }).then(res => res.json())
            .then(responsedata => {
                if (responsedata.status === "success") {
                    dispatch(removePayData())
                    setPayComplete(true)
                    redirect()
                } else if (responsedata.status === "error") {
                    setErrorMessage(responsedata.message)
                } else if (responsedata.status === "fail") {
                    setErrorMessage(responsedata.message)
                }
            }
            ).catch();
    }
    if (!payComplete) return (
        <div className="w-[90%] min-h-screen mx-auto mt-[50px] mb-[50px]">
            <div className="w-full">
                <h2 className="main-font text-2xl">Checkout</h2>
                <div className="w-full mb-4 mt-5 main-font text-lg">
                    <div className="flex items-center gap-4">
                        <button className={`${payMethod === `cash` ? activeStyle : null} ${payStyle}`} to="/requests" onClick={() => { setErrorMessage(""); setPayMethod("cash") }}>
                            <CashStack /> Cash</button>
                        <button className={`${payMethod === `visa` ? activeStyle : null} ${payStyle}`} to="/books" onClick={() => { setErrorMessage(""); setPayMethod("visa") }}>
                            <CreditCardFill /> Visa</button>
                    </div>
                </div>
                <hr></hr>
                <div className="mt-[30px] md:w-3/5">
                    <h2 className="font-medium text-xl mb-8">Total Price: {payElements.totalPrice} L.E</h2>
                    {payMethod === "visa" && <><div className="my-4 flex items-center gap-10" >
                        <label className="block mb-2 cursor-icon text-lg w-[250px]">Name on card</label>
                        <input name="name" type="text" placeholder="Enter the name on your card"
                            className={`w-full bg-white border border-gray-300 rounded-md
                        text-gray-900 p-2.5`} onChange={HandleChange}></input>
                    </div>
                        <div className="mt-8">
                            <label className="block mb-6 cursor-icon text-lg w-[250px]">Card Details</label>
                            <div className="border border-gray-300 px-2.5 py-4 rounded-md">
                                <CardElement />
                            </div>
                        </div></>}
                    {payMethod === "cash" && <div className="">
                        <span className="font-bold">Note that:</span> Payment will be upon arrival on the registred location.
                    </div>}
                    {errormessage !== "" && <div className="w-full rounded-md bg-rose-200 border border-rose-400 flex items-center gap-3 mt-6 px-3 py-2">
                        <ExclamationCircleFill className="text-[#ff0000]" />
                        <p>{errormessage}</p>
                    </div>}
                    <button className="w-full rounded-md float-right mt-[50px] px-4 py-3 text-white font-medium text-xl bg-[#1B1A55] flex items-center justify-center" disabled={!stripe}
                        onClick={(e) => { makePayment(e) }}>{lodaing ? <MoonLoader color="#ffffff" size={20} /> : "Pay"}</button>
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
                        <h2 className="font-bold text-3xl">Booking Complete</h2>
                        <p className="mt-5">Your Booking is Completed Successfully. Thanks for using spaces.</p>
                        <p className="mt-2">You will be redirected in <span className="font-bold">{timer} seconds</span>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Payment() {
    const payElements = useSelector(store => store.pay);
    const stripePromise = loadStripe('pk_test_51P9B5SF2qDRPqlzYG8u2BPlbRks3iMIHRIH0XP2kJNBp9TWbpjBeXzFbvqMiWvnsYhvRZYz0Lt1TmFaEAFGC3rqz004ZqPn6Mm');
    const options = {
        mode: 'payment',
        amount: 1080,
        currency: 'egp',
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
    };
    if(payElements.type !== "")return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    )
    else return <PageNotFound />
};