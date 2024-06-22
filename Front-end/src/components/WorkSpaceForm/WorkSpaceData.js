import { useRef, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
let availablefacilities = [];
const WorkSpaceData = forwardRef(({ name, address, description, email, phone, openingTime, closingTime, facilities,
  mainImgName, mainimg, updateFields, childRef, ShowError }) => {
  const [checkerror, setCheckError] = useState("");
  const [dataerrors, setDataErrors] = useState({
    startDate: false,
    endDate: false,
    phonenumber1: false,
    name: false,
    address: false,
    description: false,
    email: false,
    ImageName: false,
    facilities: false
  });
  const amenities = [
    "Comfortable chair",
    "Comfortable lights",
    "High-speed internet",
    "Collaboration Tools (whiteboards, projectors, ...)",
    "Drinks & Snacks",
    "Kitchen",
    "Printers and Scanners",
    "Waiting area",
    "Event Spaces",
    "Pet-Friendly Spaces",
    "Outdoor Spaces"
  ];
  const formRef = useRef(null);
  function handleChange(e) {
    if (e.target.checked) {
      availablefacilities.push(e.target.name)
    } else {
      availablefacilities = availablefacilities.filter(item => item !== e.target.name);
    }
    updateFields({ facilities: availablefacilities.join("/") })
  }
  function isImage(ImageName) {
    if (ImageName.slice(-4) === ".jpg" || ImageName.slice(-5) === ".jpeg" || ImageName.slice(-4) === ".png") return true;
    else {
      return false;
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
  const urlError = (fbPage) => {
    var regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)|localhost(:\d+)?(\/[.\w-]*)*(\?[\w%&=-]*)?(#[\w-]*)?$/;
    if (!fbPage.match(regex)) {
      return true;
    }
    else {
      return false;
    }
  }
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
        "description": false, "email": false, "ImageName": false, "facilities": false
      })
      setCheckError("Please fill in the name"); window.scrollTo(0, 100);
    }
    else if (NameError(address)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": true,
        "description": false, "email": false, "ImageName": false, "facilities": false
      })
      setCheckError("Please fill in the location"); window.scrollTo(0, 200);
    }
    else if (NameError(description)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": true, "email": false, "ImageName": false, "facilities": false
      })
      setCheckError("Please fill in the description"); window.scrollTo(0, 300);
    }
    else if (email.length !== 0 && emailError()) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": true, "ImageName": false, "facilities": false
      })
      setCheckError("Please write a valid email Link"); window.scrollTo(0, 300);
    }
    else if (PhoneNumberError(phone)) {
      setDataErrors({
        "phonenumber1": true, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false, "facilities": false
      })
      setCheckError("Please write a correct phone number ex:010123456789"); window.scrollTo(0, 500);
    } else if (!isImage(mainImgName)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": true, "facilities": false
      })
      setCheckError("Please select a valid image, accepted formats are: png, jpg, jpeg"); window.scrollTo(0, 600);
    } else if (DateError(openingTime)) {
      setDataErrors({
        "phonenumber1": false, "startDate": true, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false, "facilities": false
      })
      setCheckError("Please select the opening hour"); window.scrollTo(0, 600);
    } else if (DateError(closingTime)) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": true, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false, "facilities": false
      })
      setCheckError("Please select the closing hour"); window.scrollTo(0, 600);
    } else if (availablefacilities < 2) {
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false, "facilities": true
      })
      setCheckError("Please select at least two facilities"); window.scrollTo(0, 900);
    } else {
      setCheckError("");
      setDataErrors({
        "phonenumber1": false, "startDate": false, "endDate": false, "name": false, "address": false,
        "description": false, "email": false, "ImageName": false, "facilities": false
      })
      return true
      // if (formRef.current) {
      //   formRef.current.reset();
      // }
    }
  };
  useImperativeHandle(childRef, () => ({
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
        <input type="text" name="name" id="name"
          value={name}
          className={`bg-gray-50 border ${dataerrors.name ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
          placeholder="Enter your name"
          onChange={(e) => {
            updateFields({ name: e.target.value })
          }}
        ></input>
        <ShowError condition={dataerrors.name} value={checkerror} />
      </div>
      <div>
        <label
          htmlFor="Location"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Address<span className="text-red-500">*</span>
        </label>
        <input type="text" name="Address" id="Location"
          value={address}
          className={`bg-gray-50 border ${dataerrors.address ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
          placeholder="Enter your Address"
          onChange={(e) => {
            updateFields({ address: e.target.value })
          }}
        ></input>
        <ShowError condition={dataerrors.address} value={checkerror} />
      </div>
      <div>
        <label htmlFor="Description"
          className=" block mb-2 text-sm font-medium text-gray-900 "
        >
          Description<span className="text-red-500">*</span>
        </label>
        <textarea type="text" name="Description" id="Description"
          value={description}
          className={`bg-gray-50 h-32 border  ${dataerrors.description ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder="A breif description about your place"
          onChange={(e) => {
            updateFields({ description: e.target.value })
          }}
        ></textarea>
        <ShowError condition={dataerrors.description} value={checkerror} />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Email
        </label>
        <input type="email" name="email" id="email"
          value={email}
          className={`bg-gray-50 border ${dataerrors.email ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder="name@example.com"
          onChange={(e) => {
            updateFields({ email: e.target.value })
          }}
        ></input>
        <ShowError condition={dataerrors.email} value={checkerror} />
      </div>
      <div>
        <label
          htmlFor="phonenumber1"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Phone Number<span className="text-red-500">*</span>
        </label>
        <input type="text" name="phonenumber1" id="phonenumber1"
          value={phone}
          className={`bg-gray-50 border ${dataerrors.phonenumber1 ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
          placeholder="please write a valid phonenumber "
          onChange={(e) => {
            updateFields({ phone: e.target.value })
          }}
        ></input>
        <ShowError condition={dataerrors.phonenumber1} value={checkerror} />
      </div>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Main Image<span className="text-red-500">*</span>
        </label>
        <input type="file" name="offerImage" id="offerImage"
          className={`bg-gray-50 border ${dataerrors.ImageName ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder=""
          files={mainimg}
          accept=".png,.jpg,.jpeg"
          onChange={(e) => {
            updateFields({ mainimg: e.target.files[0], mainImgName: e.target.files[0]?.name })
          }}
        ></input>
        <ShowError condition={dataerrors.ImageName} value={checkerror} />
      </div>
        <div>
          <label
            htmlFor="phonenumber1"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Opening hour<span className="text-red-500">*</span>
          </label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={openingTime}
              onChange={(e) => {
                updateFields({ openingTime: e.getHours().toString().padStart(2, '0') + ":" + e.getMinutes().toString().padStart(2, '0')})
              }} />
            </DemoContainer>
          </LocalizationProvider>
          <ShowError condition={(dataerrors.startDate)} value={checkerror} />
        </div>
        <div>
          <label
            htmlFor="phonenumber1"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Closing hour<span className="text-red-500">*</span>
          </label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={closingTime}
              onChange={(e) => {
                updateFields({ closingTime: e.getHours().toString().padStart(2, '0') + ":" + e.getMinutes().toString().padStart(2, '0')})
              }} />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      <ShowError condition={(dataerrors.endDate)} value={checkerror} />
      <div>
        <label
          htmlFor="name"
          className="block mb-4 text-sm font-medium text-gray-900 "
        >
          Facilities & Amentities
        </label>
        {
          amenities.map((item) => {
            return <div className="flex gap-3 items-center my-2">
              <input name={item} type="checkbox" className="w-4 h-4 cursor-pointer"
                onChange={handleChange}></input>
              <h2 className="text-md">{item}</h2>
            </div>
          })
        }
        <ShowError condition={dataerrors.facilities} value={checkerror} />
      </div>
    </>
  );
})
export default WorkSpaceData;
