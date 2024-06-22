import { useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { ShowErrorMessage } from "./PortalLogin";
function getDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString();
    const year = (today.getFullYear()).toString();
    const day = (today.getDate()).toString();
    return (`${year}-${parseInt(month) > 9 ? month : "0" + month}-${parseInt(day) > 9 ? day : "0" + day}`);
}
function CreateEvent() {
    const auth = useSelector(store => store.auth);
    const ownerData = jwtDecode(auth.token);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [checkerror, setCheckError] = useState("");
    const [start, setStart] = useState("");
    const [lodaing, setLodaing] = useState(false);
    const [end, setEnd] = useState("");
    const [img, setImg] = useState([]);
    const [errormessage, setErrorMessage] = useState("");
    const [offerImageName, setOfferImageName] = useState("");
    const navigate = useNavigate();
    const [dataerrors, setDataErrors] = useState({
        start: false,
        end: false,
        title: false,
        description: false,
        offerImageName: false,
        price: false,
        maxCapacity: false
    });
    const formRef = useRef(null);
    function isImage(offerImage) {
        if (offerImage.slice(-4) === ".jpg" || offerImage.slice(-5) === ".jpeg" || offerImage.slice(-4) === ".png") return true;
        else {
            return false;
        }
    }
    function isNumber(Number) {
        var regex = /^\d+$/;
        if (!Number.match(regex)) {
            return true;
        } else if (Number < 0) {
            return true;
        } else {
            return false;
        }
    }
    const addData = () => {
        setLodaing(true)
        if (isImage(offerImageName)) {
            let formData = new FormData();
            formData.append('name', title);
            formData.append('description', description);
            formData.append('start', start);
            formData.append('end', end);
            formData.append('price', price);
            formData.append('maxCapacity', maxCapacity);
            formData.append('cwSpaceCwID', ownerData.cwSpaceCwID);
            formData.append('img', img);
            fetch(`${process.env.REACT_APP_BASE_URL}/events`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${auth.token}`, // Add the token to the headers
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "error") {
                        setLodaing(false)
                        setErrorMessage(data.message)
                    } else if (data.status === "fail") {
                        setLodaing(false)
                        setErrorMessage(data.message)
                    } else if (data.status === "success") {
                        setLodaing(false)
                        setErrorMessage("")
                        setImg([]);
                        document.getElementById("offerImage").value = "";
                        setTitle("")
                        setDescription("")
                        setStart("")
                        setEnd("")
                        setMaxCapacity("")
                        setPrice("")
                        navigate("/events&workshops-data")
                    }
                })
                .catch(error => {
                    setErrorMessage("unfortunately there was a server error")
                });
        }
    }
    const HandleError = (e) => {
        e.preventDefault();
        if (!isImage(offerImageName)) {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: true, price: false, maxCapacity: false })
        }
        else if (title.length === 0) {
            setDataErrors({ title: true, description: false, start: false, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (description.length === 0) {
            setDataErrors({ title: false, description: true, start: false, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (isNumber(maxCapacity)) {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: false, price: false, maxCapacity: true })
        }
        else if (isNumber(price)) {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: false, price: true, maxCapacity: false })
        }
        else if (start.length === 0) {
            setDataErrors({ title: false, description: false, start: true, end: false, offerImageName: false, price: false, maxCapacity: false })
        }
        else if (end.length === 0) {
            setDataErrors({ title: false, description: false, start: false, end: true, offerImageName: false, price: false, maxCapacity: false })
        }
        else {
            setDataErrors({ title: false, description: false, start: false, end: false, offerImageName: false, price: false, maxCapacity: false });
            addData();
        }
    }
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0] mb-[100px]">
                    <div className="p-6 space-y-4 p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create Event
                        </h1>
                        <div>{console.log(getDate())}</div>
                        <form className="space-y-4 md:space-y-6" action="#" ref={formRef}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Event Image<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name="offerImage"
                                    id="offerImage"
                                    className={`bg-gray-50 border ${dataerrors.offerImageName ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    placeholder=""
                                    required
                                    accept=".png,.jpg,.jpeg"
                                    onChange={(e) => {
                                        setImg(e.target.files[0]);
                                        setOfferImageName(e.target.files[0].name);
                                    }}
                                ></input>
                                {dataerrors.offerImageName ? <span className="text-[12px] text-red-500">plaese enter an image accepted formats are png , jpg , jpeg</span> : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    className={`bg-gray-50 border ${dataerrors.title ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    placeholder="Enter your name"
                                    required
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                ></input>
                                {dataerrors.title ? <span className="text-[12px] text-red-500">plaese enter a title</span> : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="Description"
                                    className=" block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Description<span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    type="text"
                                    name="Description"
                                    id="Description"
                                    value={description}
                                    className={`bg-gray-50 border ${dataerrors.description ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    placeholder="A breif description about your place"
                                    required
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                ></textarea>
                                {dataerrors.description ? <span className="text-[12px] text-red-500">plaese enter a description</span> : null}
                            </div>
                            <div className="flex items-center justify-between gap-8 mb-3">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Max Capacity<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="title"
                                        min={1}
                                        id="title"
                                        value={maxCapacity}
                                        className={`bg-gray-50 border ${dataerrors.title ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        placeholder="Enter your name"
                                        required
                                        onChange={(e) => {
                                            setMaxCapacity(e.target.value);
                                        }}
                                    ></input>
                                    {dataerrors.maxCapacity ? <span className="text-[12px] text-red-500">plaese enter a valid number </span> : null}
                                </div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Price<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="title"
                                        min={1}
                                        id="title"
                                        value={price}
                                        className={`bg-gray-50 border ${dataerrors.title ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        placeholder="Enter your name"
                                        required
                                        onChange={(e) => {
                                            setPrice(e.target.value);
                                        }}
                                    ></input>
                                    {dataerrors.price ? <span className="text-[12px] text-red-500">plaese enter a vaild number</span> : null}
                                </div>
                            </div>

                            <div className="flex justify-between gap-6">
                                <div className="w-full">
                                    <label
                                        htmlFor="phonenumber1"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Start Date<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        value={start}
                                        min={getDate()}
                                        max={end ? end : "2030-03-05"}
                                        className={`bg-gray-50 border ${dataerrors.start ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                        onChange={(e) => {
                                            setStart(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="phonenumber1"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        End Date<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        value={end}
                                        min={start ? start : getDate()}
                                        max="2030-03-05"
                                        className={`bg-gray-50 border ${dataerrors.end ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                        onChange={(e) => {
                                            setEnd(e.target.value);
                                        }}
                                    ></input>
                                </div>
                            </div>
                            {(dataerrors.end || dataerrors.start) ? <span className="text-[12px] text-red-500">{checkerror}please enter start and end date</span> : null}
                            <br></br>
                            {errormessage !== "" ? <ShowErrorMessage condition={true} value={errormessage} /> : null}
                            <button
                                type="submit"
                                onClick={(e) => { HandleError(e) }}
                                className="mt-3 w-full text-white btn-color font-medium rounded-lg text-md px-5 py-2.5 flex items-center justify-center duration-300 ease-in-out"
                            >
                                {lodaing ? <BounceLoader color="#ffffff" size={20} /> : "Create Event"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default CreateEvent;
