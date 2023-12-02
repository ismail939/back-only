import { useMultiStepForm } from "../components/useMultistepForm";
import CreateCoworkingSpace from "./CreateCoworkingSpace"
import { useState , useRef } from "react";
import { CheckLg } from "react-bootstrap-icons";
function CreateFullWorkSpace() {
    const [data, setData] = useState({
        name: "",
        address: "",
        description: "",
        email: "",
        phones: [""],
        openingTime: "",
        closingTime: "",
        imageName: "",
        img:[]
    })
    const before = `before:ml-0.5  before:absolute before:h-[2px] before:w-full before:right-2/4 before:top-1/3 before:z-[-5]`
    const childRef = useRef(null);
    const { currentStepIndex, step, steps, isFirstStep, next, back } = useMultiStepForm([
        <CreateCoworkingSpace {...data} updateFields={updateFields} childRef ={childRef}/>,
        <div>
            2
        </div>
    ])
    function updateFields(fields){
        setData(prev => {
            return {...prev , ...fields}
        })
    }
    function Validation(){
        if(currentStepIndex === 0 && childRef.current.HandleError()) next();
    }
    return (
        <section className="min-h-screen">
            <div className="w-96 flex justify-between mx-auto mt-[70px] items-center">
                {steps.map((step , index) =>{
                    return(
                        <div className={`flex flex-col relative items-center w-full gap-2 justify-between before:content-[''] ${index > 0 ? before : null}
                        ${currentStepIndex === 1 ? "before:bg-green-500" : "before:bg-red-500"}`}>
                            <div className={`flex justify-center items-center w-10 h-10 rounded-full text-white ${currentStepIndex > index ? 
                            "bg-green-500" : "bg-[#0F4C75] }"} `}>
                                {currentStepIndex > index ? <CheckLg /> : index + 1}</div>
                            <p className="uppercase font-medium">Step</p>
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
                                <button type="button" className="py-2 px-3 btn-color rounded-md" onClick={Validation}>
                                    Next
                                </button >
                                {isFirstStep ? <button type="button" className="py-2 px-3 btn-color rounded-md" onClick={back}>
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