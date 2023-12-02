import { useRef, useState } from "react";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { forwardRef , useImperativeHandle } from "react";
import Swal from "sweetalert2";
const CreateCoworkingSpace = forwardRef(({ name, address, description, email, phones, openingTime, closingTime, imageName, img, updateFields ,childRef }) => {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  const [Email, setEmail] = useState("");
  const [phonenumberOne, setPhoneNumberOne] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [checkerror, setCheckError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [offerImageName, setOfferImageName] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [image, setImg] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [dataerrors, setDataErrors] = useState({
    startDate: false,
    endDate: false,
    phonenumber1: false,
    name: false,
    address: false,
    description: false,
    email: false,
    ImageName: false
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
    if (offerImageName.slice(-4) === ".jpg" || offerImageName.slice(-5) === ".jpeg" || offerImageName.slice(-4) === ".png") return true;
    else {
      return false;
    }
  }
  const addData = () => {
    if (isImage(offerImageName)) {
      let formData = new FormData();
      formData.append('imageName', offerImageName);
      formData.append('name', Name);
      formData.append('address', Address);
      formData.append('phones', [phonenumberOne]);
      formData.append('description', Description);
      formData.append('openingTime', startDate);
      formData.append('closingTime', endDate);
      formData.append('mainPhoto', image);
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
    if (!Email.match(regex)) {
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
  const HandleError = () => {
    if (NameError(name)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": true, "address": false,
        "description": false, "email": false, "ImageName": false
      })
      setCheckError("please fill in the name"); window.scrollTo(0, 100);
    }
    else if (NameError(address)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": true,
        "description": false, "email": false, "ImageName": false
      })
      setCheckError("please fill in the location"); window.scrollTo(0, 200);
    }
    else if (NameError(description)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": true, "email": false, "ImageName": false
      })
      setCheckError("please fill in the description"); window.scrollTo(0, 300);
    }
    else if (email.length > 0 && emailError()) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": true, "ImageName": false
      })
      setCheckError("please write a valid email address"); window.scrollTo(0, 300);
    }
    else if (PhoneNumberError(phones[0])) {
      setDataErrors({
        "phonenumber1": true, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false
      })
      setCheckError("please write a correct phone number ex:010123456789"); window.scrollTo(0, 500);
    } else if (!isImage(imageName)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": true
      })
      setCheckError("plaese enter an image accepted formats are png , jpg , jpeg"); window.scrollTo(0, 600);
    } else if (DateError(openingTime)) {
      setDataErrors({
        "phonenumber1": false, "startDate": true, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false
      })
      setCheckError("openinig Hour should be in this format 00:00"); window.scrollTo(0, 600);
    } else if (DateError(closingTime)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": true, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false
      })
      setCheckError("closing Hour should be in this format 00:00"); window.scrollTo(0, 600);
    } else {
      setCheckError("");
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false
      })
      return true
      // sentData();
      // success();
      // if (formRef.current) {
      //   formRef.current.reset();
      // }
    }
  };
  useImperativeHandle(childRef , () =>({
      HandleError
  }))
  return (
    <>
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
          value={name}
          className={`bg-gray-50 border ${dataerrors.name ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
          placeholder="Enter your name"
          onChange={(e) => {
            updateFields({ name: e.target.value })
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
          value={address}
          className={`bg-gray-50 border ${dataerrors.address ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
          placeholder="Enter your Location"
          onChange={(e) => {
            updateFields({ address: e.target.value })
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
          value={description}
          className={`bg-gray-50 h-32 border  ${dataerrors.description ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder="A breif description about your place"
          onChange={(e) => {
            updateFields({ description: e.target.value })
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
          value={email}
          className={`bg-gray-50 border ${dataerrors.email ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder="name@example.com"
          onChange={(e) => {
            updateFields({ email: e.target.value })
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
          value={phones[0]}
          className={`bg-gray-50 border ${dataerrors.phonenumber1 ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
          placeholder="please write a valid phonenumber "
          onChange={(e) => {
            updateFields({ phones: [e.target.value] })
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
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Main Image<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="offerImage"
          id="offerImage"
          className={`bg-gray-50 border ${dataerrors.ImageName ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder=""
          value={img.Name}
          accept=".png,.jpg,.jpeg"
          onChange={(e) => {
            setImg(e.target.files[0]);
            updateFields({ img: e.target.files[0], imageName: e.target.files[0].name })
            setOfferImageName(e.target.files[0].name);
          }}
        ></input>
        {dataerrors.ImageName ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
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
            name="openingTime"
            id="openingTime"
            value={openingTime}
            className={`bg-gray-50 border ${dataerrors.startDate ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
            placeholder="24 hour format ex 09:30"
            onChange={(e) => {
              updateFields({ openingTime: e.target.value })
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
            name="closingTime"
            id="closingTime"
            value={closingTime}
            className={`bg-gray-50 border ${dataerrors.endDate ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
            placeholder="24 hour format ex 09:30"
            onChange={(e) => {
              updateFields({ closingTime: e.target.value })
            }}
          ></input>
        </div>
      </div>
      {(dataerrors.endDate || dataerrors.startDate) ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
      <br></br>
      {/* <button
          type="button"
          onClick={e => HandleError(e)}
          className="mt-3 w-full text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
        >
          Create Co-Work Space
        </button> */}
    </>
  );
})
export default CreateCoworkingSpace;
