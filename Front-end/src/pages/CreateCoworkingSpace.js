import { useRef, useState } from "react";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
function CreateCoworkingSpace() {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumberOne, setPhoneNumberOne] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [checkerror, setCheckError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [offerImageName, setOfferImageName] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [img, setImg] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [dataerrors, setDataErrors] = useState({
    startDate: false,
    endDate: false,
    phonenumber1: false,
    name: false,
    address: false,
    description: false,
    email: false,
    offerImageName: false
  });
  const formRef = useRef(null);
  const success = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Workspace is added successfully",
      showConfirmButton: false,
    });
  }
  function isImage(offerImageName) {
    if (offerImageName.slice(-4) === ".jpg" || offerImageName.slice(-5) === ".jpeg" || offerImageName.slice(-4) === ".png"||offerImageName.length===0) return true;
    else {
      return false;
    }
  }
  const addData = () => {
    if (isImage(offerImageName)) {
      const formData = new FormData();
      formData.append('img', img);
      formData.append('imageName', offerImageName);
      formData.append('name', Name);
      formData.append('adress', Address);
      formData.append('phones', [phonenumberOne]);
      formData.append('description', Description);
      formData.append('openingTime', startDate);
      formData.append('closingTime', endDate);
      fetch('http://localhost:4000/cw_spaces', {

        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "error") { setErrorMessage(data.message) }
          else if (data.status === "success") { console.log(data) }
        })
    }
  }

  const NameError = (name) => {
    if (name.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  const emailError = () => {
    const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    if (!email.match(regex)) {
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
  const DateError = (date) => {
    var regex = "([01]?[0-9]|2[0-3]):[0-5][0-9]";
    if (!date.match(regex)) {
      return true;
    } else if (date.length !== 5) {
      return true;
    } else {
      return false;
    }
  };
  const HandleError = (e) => {
    e.preventDefault();
    if (!isImage(offerImageName)) {
      setDataErrors({"phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false, "description": false, "email": false ,"offerImageName":true })
      setCheckError("plaese enter an image accepted formats are png , jpg , jpeg"); window.scrollTo(0, 50);
    }
    else if (NameError(Name)) {
      setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": true, "address": false, "description": false, "email": false ,"offerImageName":false})
      setCheckError("please fill in the name"); window.scrollTo(0, 100);
    }
    else if (NameError(Address)) {
      setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": true, "description": false, "email": false ,"offerImageName":false})
      setCheckError("please fill in the location"); window.scrollTo(0, 200);
    }
    else if (NameError(Description)) {
      setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false, "description": true, "email": false ,"offerImageName":false})
      setCheckError("please fill in the description"); window.scrollTo(0, 300);
    }
    else if (email.length > 0 && emailError()) {
      setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false, "description": false, "email": true,"offerImageName":false })
      setCheckError("please write a valid email address"); window.scrollTo(0, 300);
    }
    else if (PhoneNumberError(phonenumberOne)) {
      setDataErrors({ "phonenumber1": true, "startDate": false, "endDate": false, "name": false, "address": false, "description": false, "email": false,"offerImageName":false })
      setCheckError("please write a correct phone number ex:010123456789"); window.scrollTo(0, 500);
    }
    else if (DateError(startDate)) {
      setDataErrors({ "phonenumber1": false, "startDate": true, "endDate": false, "name": false, "address": false, "description": false, "email": false,"offerImageName":false })
      setCheckError("openinig Hour should be in this format 00:00"); window.scrollTo(0, 600);
    } else if (DateError(endDate)) {
      setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": true, "name": false, "address": false, "description": false, "email": false,"offerImageName":false })
      setCheckError("closing Hour should be in this format 00:00"); window.scrollTo(0, 600);
    } else {
      setCheckError("");
      setDataErrors({ "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false, "description": false, "email": false,"offerImageName":false })
      addData();
      success();
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };
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
              Create Co-Working Space
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

                  className={`bg-gray-50 border ${dataerrors.offerImageName ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder=""
                  required
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => {


                    setImg(e.target.files[0]);
                    setOfferImageName(e.target.value);
                  }}
                ></input>
                {dataerrors.offerImageName ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}

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
                  name="name"
                  id="name"
                  className={`bg-gray-50 border ${dataerrors.name ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                  placeholder="Enter your name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
                {dataerrors.name ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
              </div>
              <div>
                <label
                  htmlFor="Location"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Location<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="Location"
                  id="Location"
                  className={`bg-gray-50 border ${dataerrors.address ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                  placeholder="Enter your Location"
                  required
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></input>
                {dataerrors.address ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
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
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border ${dataerrors.email ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
                {dataerrors.email ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
              </div>
              <div>
                <label
                  htmlFor="phonenumber1"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phonenumber1"
                  id="phonenumber1"
                  className={`bg-gray-50 border ${dataerrors.phonenumber1 ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                  placeholder="please write a valid phonenumber "
                  required
                  onChange={(e) => {
                    setPhoneNumberOne(e.target.value);
                  }}
                ></input>
                {dataerrors.phonenumber1 ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
              </div>
              <div>
                <label
                  htmlFor="facebookLink"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Facebook Link
                </label>
                <input
                  type="text"
                  name="facebookLink"
                  id="facebookLink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="facebook page"
                  onChange={(e) => {
                    setFacebookLink(e.target.value);
                  }}
                ></input>
              </div>
              <div className="flex justify-between gap-8">
                <div>
                  <label
                    htmlFor="phonenumber1"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Opening hour<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    id="startDate"
                    className={`bg-gray-50 border ${dataerrors.startDate ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="24 hour format ex 09:30"
                    required
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="phonenumber1"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Closing hour<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="endDate"
                    id="endDate"
                    className={`bg-gray-50 border ${dataerrors.endDate ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="24 hour format ex 09:30"
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
                onClick={e => HandleError(e)}
                className="mt-3 w-full text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
              >
                Create Co-Work Space
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CreateCoworkingSpace;
