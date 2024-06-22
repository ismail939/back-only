import { useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import RoomForm from "../../components/WorkSpaceForm/RoomForm";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import BounceLoader from "react-spinners/BounceLoader";
import { ShowErrorMessage } from "./PortalLogin";
function CreateRoom() {
    const IntitialRoomData = {
        type: "Select Room Type",
        hourPrice: "",
        dayPrice: "",
        maxRoomSize: "",
        minRoomSize: "",
        roomImg: null,
        number: ""
    }
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState(IntitialRoomData)
    const auth = useSelector(store => store.auth);
    const [resError, setResError] = useState("")
    const [lodaing, setLodaing] = useState(false);
    const ownerData = jwtDecode(auth.token);
    const childRef = useRef(null);
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
                    setResError(response.message)
                }
                else if (response.status === "fail") {
                    setLodaing(false)
                    setResError(response.message)
                }
                else if (response.status === "success") {
                    setLodaing(false)
                    setRoomData(IntitialRoomData)
                    navigate("/rooms-data")
                }
            }).catch(error => setResError("unfortunately there was a server error"))
    }
    function HandleClick(e) {
        e.preventDefault();
        if (childRef.current.HandleRoomError()) {
            addRoom()
        }
        
    }
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow mt-[100px] max-w-md xl:p-0] mb-[100px]">
                    <div className="p-6 space-y-4 p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create Room
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" >
                            <RoomForm roomData={roomData} updateRoomData={updateRoomData} childRef={childRef} ShowError={ShowError} />
                            <ShowErrorMessage condition={resError !== ""} value={resError} />
                            <button
                                type="submit"
                                disabled={lodaing}
                                onClick={e => HandleClick(e)}
                                className="mt-3 w-full text-white btn-color font-medium rounded-lg text-md px-5 py-2.5 flex items-center justify-center duration-300 ease-in-out"
                            >
                                {lodaing ? <BounceLoader color="#ffffff" size={20} /> : "Create Room"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateRoom;