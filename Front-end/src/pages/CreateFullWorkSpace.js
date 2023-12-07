import { useMultiStepForm } from "../components/WorkSpaceForm/useMultistepForm";
import CreateCoworkingSpace from "../components/WorkSpaceForm/CreateCoworkingSpace"
import { useState, useRef } from "react";
import { CheckLg , ExclamationCircleFill } from "react-bootstrap-icons";
import WorkSpaceImages from "../components/WorkSpaceForm/WorkSpaceImages";
import Swal from "sweetalert2";
function CreateFullWorkSpace() {
    const IntitialValue ={
        name: "",
        address: "",
        description: "",
        email: "",
        phones: [""],
        facebookLink: "",
        openingTime: "",
        closingTime: "",
        mainImgName: "",
        mainimg: [],
        photos: []
    }
    const [data, setData] = useState(IntitialValue)
    const [dataSuccess, setDataSuccess] = useState(false)
    const stepNames = ["Main Data", "Photos"]
    const beforeStyle = `before:ml-0.5  before:absolute before:h-[2px] before:w-full before:right-2/4 before:top-1/3 before:z-[-5] before:content-['']`
    const childRef = useRef(null);
    const { currentStepIndex, step, steps, isFirstStep, isLastStep, next, back } = useMultiStepForm([
        <CreateCoworkingSpace {...data} updateFields={updateFields} childRef={childRef} ShowError={ShowError} />,
        <WorkSpaceImages  {...data} updateFields={updateFields} childRef={childRef} ShowError={ShowError} />
    ])
    function updateFields(fields) {
        setData(prev => {
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
        formData.append('imageName', data.offerImageName);
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('phones', data.phones);
        formData.append('description', data.description);
        formData.append('openingTime', data.openingTime);
        formData.append('closingTime', data.closingTime);
        formData.append('mainPhoto', data.mainimg);
        fetch('http://localhost:4000/cw_spaces', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // if (data.status === "error") { setErrorMessage(data.message) }
                // else if (data.status === "success") { console.log(data) }
                console.log(data)
            })
    }
    const addPhotos = () => {
        let formData = new FormData();
        data.photos.forEach(image => {
            formData.append('img', image);
        });
        fetch('http://localhost:4000/cw_spacePhotos', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // if (data.status === "error") { setErrorMessage(data.message) }
                // else if (data.status === "success") { console.log(data) }
                console.log(data)
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
        if (isFirstStep && childRef.current.HandleError()) next();
        else if (isLastStep && childRef.current.checkImages()) {
            addMainData();
            addPhotos();
            success();
            setDataSuccess(true)
        }
    }
    function HandleBack() {
        if(dataSuccess){
            setDataSuccess(false)
            setData(IntitialValue)
            back()
        }else{
            back()
        }
    }
    return (
        <section className="min-h-screen">
            <div className="w-96 flex justify-between mx-auto mt-[70px] items-center">
                {steps.map((step, index) => {
                    return (
                        <div key={index} className={`flex flex-col relative items-center w-full gap-2 justify-between ${index > 0 ? beforeStyle : null}
                        ${currentStepIndex === 1 ? "before:bg-green-500" : "before:bg-red-500"}`}>
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
                        <form className="space-y-4 md:space-y-6" action="#" >
                            {step}
                            <div className="flex gap-4 flex-row-reverse justify-between text-white">
                                <button type="button" className="py-2 px-3 btn-color rounded-md" onClick={HandleNext}>
                                    {isLastStep ? "Submit" : "Next"}
                                </button >
                                {!isFirstStep ? <button type="button" className="py-2 px-3 btn-color rounded-md" onClick={HandleBack}>
                                    Back
                                </button> : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateFullWorkSpace;