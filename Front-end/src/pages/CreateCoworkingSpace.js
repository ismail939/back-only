import { useState } from "react";
import { ExclamationCircleFill } from "react-bootstrap-icons";
function CreateCoworkingSpace() {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumberOne, setPhoneNumberOne] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [checkerror, setCheckError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataerrors , setDataErrors] = useState({
    startDate : false,
    endDate : false,
    phonenumber1 : false
  });
  const AddData = () => {
    fetch(`http://localhost:4000/cw_spaces`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "data": {
          "name": Name,
          "address": Address,
          "openingTime": startDate,
          "closingTime": endDate,
          "description": Description
        },
        "phones": [phonenumberOne]
      }),
    }).then(res => res.json()).then((data) => { console.log(data) })
  }
  const PhoneNumberError = (phonenumber) => {
    var numbers = /^[0-9]+$/;
    if (!phonenumber.match(numbers)) {
      return true;
    } else if (phonenumber.length !== 11) {
      return true;
    } else {
      setDataErrors({...dataerrors , "phonenumber1":false})
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
      if (PhoneNumberError(phonenumberOne)) {
        setDataErrors({...dataerrors , "phonenumber1":true})
        setCheckError("Error: Please write your First phone number correctly"); window.scrollTo(0, 0);
      }
      else if (DateError(startDate)) {
        setCheckError("Error: Please write your opening hour correctly"); window.scrollTo(0, 0);
      } else if (DateError(endDate)) {
        setCheckError("Error: Please write your closing hour correctly"); window.scrollTo(0, 0);
      } else {
        setCheckError("");
        AddData();
        window.alert("Data submitted Successfully");
      }
  };
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0] mb-[100px]">
          <div className="p-6 space-y-4 p-8">
            {checkerror !== "" ? (
              <div className="px-1 py-2 bg-rose-600 text-white text-sm rounded-md font-semibold">
                <div className="flex items-center gap-2">
                  <ExclamationCircleFill />{" "}
                  <span>{checkerror}</span>
                </div>
              </div>
            ) : null}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create Co-Working Space
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={HandleError}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="Location"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Location*
                </label>
                <input
                  type="text"
                  name="Location"
                  id="Location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter your Location"
                  required
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="Description"
                  className=" block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description*
                </label>
                <textarea
                  type="text"
                  name="Description"
                  id="Description"
                  className="bg-gray-50 h-32 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="A breif description about your place"
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="phonenumber1"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Phone Number 1*
                </label>
                <input
                  type="text"
                  name="phonenumber1"
                  id="phonenumber1"
                  className={`bg-gray-50 border ${dataerrors.phonenumber1 ? "border-red-500" :"border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                  placeholder="0100000"
                  required
                  onChange={(e) => {
                    setPhoneNumberOne(e.target.value);
                  }}
                ></input>
                {dataerrors.phonenumber1 ? <span className="text-[12px] text-red-500">Please Enter phonenumber correctly</span> : null}
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
                    Opening hour*
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    id="startDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                    Closing hour*
                  </label>
                  <input
                    type="text"
                    name="endDate"
                    id="endDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="24 hour format ex 09:30"
                    required
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <br></br>
              <button
                type="submit"
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
