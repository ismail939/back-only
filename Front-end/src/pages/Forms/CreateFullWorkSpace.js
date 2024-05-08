import { useMultiStepForm } from "../../components/WorkSpaceForm/useMultistepForm";
import WorkSpaceData from "../../components/WorkSpaceForm/WorkSpaceData"
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {setCredentials} from "../../components/reduxtoolkit/Slices/authSlice"
import { CheckLg, ExclamationCircleFill, CheckCircleFill } from "react-bootstrap-icons";
import WorkSpaceImages from "../../components/WorkSpaceForm/WorkSpaceImages";
import Swal from "sweetalert2";
import RoomForm from "../../components/WorkSpaceForm/RoomForm";
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
        let formData = new FormData();
        formData.append('imgName', data.offerImageName);
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('description', data.description);
        formData.append('amenities', data.facilities);
        formData.append('email', data.email);
        formData.append('openingTime', data.openingTime);
        formData.append('closingTime', data.closingTime);
        formData.append('ownerOwnerID', ownerData.ownerID)
        formData.append('img', data.mainimg);
        fetch('http://localhost:4000/cw_spaces', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(response => {
                if (response.status === "error") { console.log(response.message) }
                else if (response.status === "success") {
                    dispatch(setCredentials({...auth , token: response.data.token}))
                    ownerData = jwtDecode(response.data.token);
                    next();
                }
                console.log(response)
            })
    }
    const addPhotos = () => {
        let formData = new FormData();
        data.photos.forEach(image => {
            formData.append('img', image);
        });
        fetch(`http://localhost:4000/cw_spacePhotos/${ownerData.cwSpaceCwID}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(response => {
                if (response.status === "error") { console.log(response) }
                else if (response.status === "success") {
                    next()
                }
                console.log(response)
            })
    }
    const addRoom = () => {
        let formData = new FormData();
        formData.append('type', roomData.type);
        formData.append('hourPrice', roomData.hourPrice);
        formData.append('dayPrice', roomData.dayPrice);
        formData.append('maxRoomSize', roomData.maxRoomSize);
        formData.append('minRoomSize', roomData.minRoomSize);
        formData.append('number', roomData.number);
        formData.append('cwSpaceCwID', ownerData.cwSpaceCwID);
        formData.append('img', roomData.roomImg);
        fetch(`http://localhost:4000/rooms`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(response => {
                if (response.status === "error") { console.log(response) }
                else if (response.status === "success") {
                    success();
                    setDataSuccess(true)
                }
                console.log(response)
            })
    }
    const success = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Workspace is added successfully",
            showConfirmButton: false,
        });
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
    function HandleBack() {
        // if(dataSuccess){
        //     setDataSuccess(false)
        //     setData(IntitialValue)
        //     back()
        // }else{
        //     back()
        // }
        // back()
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
                            <div className="flex gap-4 flex-row-reverse justify-between text-white">
                                <button type="button" className="py-2 px-3 btn-color rounded-md" onClick={HandleNext}>
                                    {buttonNames[currentStepIndex]}
                                </button >
                                {/* {!isFirstStep ? <button type="button" className="py-2 px-3 btn-color rounded-md" onClick={HandleBack}>
                                    Back
                                </button> : null} */}
                            </div>
                        </form> : <div className="text-center flex flex-col items-center justify-center">
                            <CheckCircleFill className="text-green-500 rounded-full text-[70px] m-6" />
                            <p className="text-xl m-2">
                                Your WorkSpace is created successfully
                            </p>
                            <p className="text-sm text-gray-500">
                                You can check or update your WorkSpace<br></br> data in your profile page
                            </p>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateFullWorkSpace;