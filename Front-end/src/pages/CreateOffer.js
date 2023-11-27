import { useRef, useState } from "react";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
function getDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString();
    const year = (today.getFullYear()).toString();
    const day = (today.getDate()).toString();
    return (`${year}-${month}-${parseInt(day) > 9 ? day : "0" + day}`);
}

function CreateOffer() {
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [checkerror, setCheckError] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [offerImage, setOfferImage] = useState([]);
    const [offerImageName, setOfferImageName] = useState("");
    const [dataerrors, setDataErrors] = useState({
        startDate: false,
        endDate: false,
        title: false,
        description: false,
        offerImage: false
    });
    const formRef = useRef(null);
    const success = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Offer is added successfully",
            showConfirmButton: false,
        });
    }
    function isImage() {
        if (offerImageName.slice(-4) === ".jpg" || offerImageName.slice(-5) === ".jpeg" || offerImageName.slice(-4) === ".png") return true;
        else {
            return false;
        }
    }
    const addData = () => {
        if (offerImage) {
            const formData = new FormData();
            formData.append('img', offerImage);
            formData.append('title', title);
            formData.append('description', Description);
            formData.append('start', startDate);
            formData.append('end', endDate);
            fetch('http://localhost:4000/offer', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Image uploaded successfully:', data);
                    // Handle the response as needed
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    // Handle the error as needed
                });
        }
    };
    const NameError = (name) => {
        if (name.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    const PhoneNumberError = (phonenumber) => {
        var numbers = /^01[1205][0-9]{8}$/;
        if (!phonenumber.match(numbers)) {
            return true;
        } else {
            return false;
        }
    };
    // const HandleError = (e) => {
    //     e.preventDefault();
    //     if (NameError(Name)) {
    //         setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": true, "address": false, "description": false, "email": false })
    //         setCheckError("please fill in the name"); window.scrollTo(0, 100);
    //     }
    //     else if (NameError(Address)) {
    //         setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": true, "description": false, "email": false })
    //         setCheckError("please fill in the location"); window.scrollTo(0, 200);
    //     }
    //     else if (NameError(Description)) {
    //         setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false, "description": true, "email": false })
    //         setCheckError("please fill in the description"); window.scrollTo(0, 300);
    //     }
    //     else if (email.length > 0 && emailError()) {
    //         setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false, "description": false, "email": true })
    //         setCheckError("please write a valid email address"); window.scrollTo(0, 300);
    //     }
    //     else if (PhoneNumberError(phonenumberOne)) {
    //         setDataErrors({ "phonenumber1": true, "startDate": false, "endDate": false, "name": false, "address": false, "description": false, "email": false })
    //         setCheckError("please write a correct phone number ex:010123456789"); window.scrollTo(0, 500);
    //     }
    //     else if (DateError(startDate)) {
    //         setDataErrors({ "phonenumber1": false, "startDate": true, "endDate": false, "name": false, "address": false, "description": false, "email": false })
    //         setCheckError("openinig Hour should be in this format 00:00"); window.scrollTo(0, 600);
    //     } else if (DateError(endDate)) {
    //         setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": true, "name": false, "address": false, "description": false, "email": false })
    //         setCheckError("closing Hour should be in this format 00:00"); window.scrollTo(0, 600);
    //     } else {
    //         setCheckError("");
    //         setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false, "description": false, "email": false })
    //         AddData();
    //         success();
    //         if (formRef.current) {
    //             formRef.current.reset();
    //         }
    //     }
    // };
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0] mb-[100px]">
                    <div className="p-6 space-y-4 p-8">
                        {/* {checkerror !== "" ? (
              <div className="px-1 py-2 bg-rose-600 text-white text-sm rounded-md font-semibold">
                <div className="flex items-center gap-2">
                  <ExclamationCircleFill />{" "}
                  <span>Please write your Inputs correctly</span>
                </div>
              </div>
            ) : null} */}
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create Offer
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" ref={formRef}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Offer Image<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name="offerImage"
                                    id="offerImage"
                                    className={`bg-gray-50 border ${dataerrors.name ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                                    placeholder=""
                                    required
                                    accept=".png,.jpg,.jpeg"
                                    onChange={(e) => {
                                        setOfferImage(e.target.files[0]);
                                        setOfferImageName(e.target.value);
                                    }}
                                ></input>
                                {dataerrors.name ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    title<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className={`bg-gray-50 border ${dataerrors.name ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                                    placeholder="Enter your name"
                                    required
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                ></input>
                                {dataerrors.name ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
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
                                    className={`bg-gray-50 h-32 border  ${dataerrors.description ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    placeholder="A breif description about your place"
                                    required
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                ></textarea>
                                {dataerrors.description ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            </div>
                            <div className="flex justify-between gap-6">
                                <div className="w-full">
                                    <label
                                        htmlFor="phonenumber1"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        start date<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        value={startDate}
                                        min={getDate()}
                                        max="2024-11-28"
                                        className={`bg-gray-50 border ${dataerrors.startDate ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                        onChange={(e) => {
                                            setStartDate(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="phonenumber1"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        end date<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        value={endDate}
                                        min={startDate ? startDate : getDate()}
                                        max="2024-11-28"
                                        className={`bg-gray-50 border ${dataerrors.endDate ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                        onChange={(e) => {
                                            setEndDate(e.target.value);
                                        }}
                                    ></input>
                                </div>
                            </div>
                            {(dataerrors.endDate || dataerrors.startDate) ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            <br></br>
                            <button
                                type="submit"
                                onClick={() => isImage() ? addData() : console.log("not an image")}
                                className="mt-3 w-full text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                            >
                                Create Offer
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default CreateOffer;
