import { useMultiStepForm } from "../../components/WorkSpaceForm/useMultistepForm";
import WorkSpaceData from "../../components/WorkSpaceForm/WorkSpaceData"
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../components/reduxtoolkit/Slices/authSlice"
import { CheckLg, ExclamationCircleFill, CheckCircleFill } from "react-bootstrap-icons";
import BounceLoader from "react-spinners/BounceLoader";
import WorkSpaceImages from "../../components/WorkSpaceForm/WorkSpaceImages";
import Swal from "sweetalert2";
import RoomForm from "../../components/WorkSpaceForm/RoomForm";
import { ShowErrorMessage } from "./PortalLogin";
function CreateFullWorkSpace() {
    const IntitialValue = {
        name: "",
        address: "",
        description: "",
        email: "",
        phone: "",
        facilities: "",
        openingTime: "",
        closingTime: "",
        mainImgName: "",
        mainimg: [],
        photos: []
    }
    const IntitialRoomData = {
        type: "Select Room Type",
        hourPrice: "0",
        dayPrice: "0",
        maxRoomSize: "0",
        minRoomSize: "0",
        roomImg: null,
        number: "1"
    }
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);
    let ownerData = jwtDecode(auth.token);
    const [data, setData] = useState(IntitialValue)
    const [roomData, setRoomData] = useState(IntitialRoomData)
    const [dataSuccess, setDataSuccess] = useState(false)
    const [lodaing, setLodaing] = useState(false);
    const [resError, setResError] = useState("");
    const stepNames = ["Main Data", "Photos", "Room"]
    const buttonNames = ["SUBMIT DATA", "ADD PHOTOS", "ADD ROOM"]
    const beforeStyle = `before:ml-0.5  before:absolute before:h-[2px] before:w-full before:right-2/4 before:top-1/3 before:z-[-5] before:content-['']`
    const childRef = useRef(null);
    const { currentStepIndex, step, steps, isFirstStep, isLastStep, next, back } = useMultiStepForm([
        <WorkSpaceData {...data} updateFields={updateFields} childRef={childRef} ShowError={ShowError} />,
        <WorkSpaceImages  {...data} updateFields={updateFields} childRef={childRef} ShowError={ShowError} />,
        <RoomForm roomData={roomData} updateRoomData={updateRoomData} childRef={childRef} ShowError={ShowError} />
    ])
    function updateFields(fields) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }
    function updateRoomData(fields) {
        setRoomData(prev => {
            return { ...prev, ...fields }
        })
    }
    function ShowError(props) {
        const condition = props.condition;
        const value = props.value;
        return (
            <>
                {condition ? <span className="text-[12px] text-red-500 flex gap-1 items-center mt-1"><ExclamationCircleFill />{value}</span> : null}
            </>
        )
    }
    const addMainData = () => {
        setLodaing(true)
        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('description', data.description);
        formData.append('amenities', data.facilities);
        if(data.email !== "") formData.append('email', data.email);
        formData.append('openingTime', data.openingTime);
        formData.append('closingTime', data.closingTime);
        formData.append('ownerOwnerID', ownerData.ownerID);
        formData.append('mainPhoto', data.mainimg);
        fetch(`${process.env.REACT_APP_BASE_URL}/cw_spaces`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${auth.token}`, // Add the token to the headers
            },
        })
            .then(res => res.json())
            .then(response => {
                if (response.status === "error") {
                    setLodaing(false)
                    setResError(response.message);
                } else if (response.status === "fail") {
                    setLodaing(false)
                    setResError("Server error, please try again later");
                } else if (response.status === "success") {
                    setLodaing(false)
                    dispatch(setCredentials({ ...auth, token: response.data.token }));
                    ownerData = jwtDecode(response.data.token);
                    next();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const addPhotos = () => {
        setLodaing(true)
        let formData = new FormData();
        data.photos.forEach(image => {
            formData.append('img', image);
        });
        fetch(`${process.env.REACT_APP_BASE_URL}/cw_spacePhotos/${ownerData.cwSpaceCwID}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${auth.token}`, // Add the token to the headers
            },
        })
            .then(res => res.json())
            .then(response => {
                if (response.status === "error") {
                    setLodaing(false)
                    setResError(response.message);
                } else if (response.status === "fail") {
                    setLodaing(false)
                    setResError("Server error, please try again later");
                } else if (response.status === "success") {
                    setLodaing(false);
                    next()
                }
            })
    }
    const addRoom = () => {
        setLodaing(true)
        let formData = new FormData();
        formData.append('type', roomData.type);
        formData.append('hourPrice', roomData.hourPrice);
        formData.append('dayPrice', roomData.dayPrice);
        formData.append('maxRoomSize', roomData.maxRoomSize);
        formData.append('minRoomSize', roomData.minRoomSize);
        formData.append('number', roomData.number);
        formData.append('cwSpaceCwID', ownerData.cwSpaceCwID);
        formData.append('img', roomData.roomImg);
        fetch(`${process.env.REACT_APP_BASE_URL}/rooms`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${auth.token}`, // Add the token to the headers
            },
        })
            .then(res => res.json())
            .then(response => {
                if (response.status === "error") {
                    setLodaing(false)
                    setResError(response.message);
                } else if (response.status === "fail") {
                    setLodaing(false)
                    setResError("Server error, please try again later");
                } else if (response.status === "success") {
                    setLodaing(false)
                    setDataSuccess(true)
                }
            })
    }
    function HandleNext() {
        if (isFirstStep && childRef.current.HandleError()) {
            addMainData();
        }
        else if (currentStepIndex === 1 && childRef.current.checkImages()) {
            addPhotos();
        }
        else if (isLastStep && childRef.current.HandleRoomError()) {
            addRoom();
        }
    }
    return (
        <section className="min-h-screen">
            <div className="w-96 flex justify-between mx-auto mt-[70px] items-center">
                {steps.map((step, index) => {
                    return (
                        <div key={index} className={`flex flex-col relative items-center w-full gap-2 justify-between ${index > 0 ? beforeStyle : null}
                        ${currentStepIndex >= index ? "before:bg-green-500" : "before:bg-red-500"}`}>
                            <div className={`flex justify-center items-center w-10 h-10 rounded-full text-white ${currentStepIndex > index || (isLastStep && dataSuccess) ?
                                "bg-green-500" : "bg-[#0F4C75] }"} `}>
                                {currentStepIndex > index || (isLastStep && dataSuccess) ? <CheckLg /> : index + 1}</div>
                            <p className="uppercase font-medium text-sm">{stepNames[index]}</p>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow mt-[50px] max-w-md mb-[100px]">
                    <div className="p-6 space-y-4 p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create Co-Working Space
                        </h1>
                        {!dataSuccess ? <form className="space-y-4 md:space-y-6" action="#" >
                            {step}
                            <ShowErrorMessage condition={resError !== ""} value={resError}/>
                            <div className="flex gap-4 flex-row-reverse justify-between text-white">
                                <button type="button" className="py-2 px-3 btn-color min-w-[100px] rounded-md flex items-center justify-center" disabled={lodaing} onClick={HandleNext}>
                                    {lodaing ? <BounceLoader color="#ffffff" size={20} /> : buttonNames[currentStepIndex]}
                                </button >
                            </div>
                        </form> : <div className="text-center flex flex-col items-center justify-center">
                            <CheckCircleFill className="text-green-500 rounded-full text-[70px] m-6" />
                            <p className="text-2xl m-2">
                                Your WorkSpace is created successfully
                            </p>
                            <p className="text-sm text-gray-500">
                                You can check or update your WorkSpace<br></br> data in your profile page
                            </p>
                            <p className="mt-1 text-sm text-yellow-500">
                                Please note: Your Workspace location need to be set on the maps in your profile
                            </p>
                            <p className="text-[13px] my-4">You can follow this link to your workspace profile <Link to="/workspace-data"
                            className="underline">Workspace Data</Link></p>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateFullWorkSpace;