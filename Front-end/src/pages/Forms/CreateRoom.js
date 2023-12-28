import { useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import RoomForm from "../../components/WorkSpaceForm/RoomForm";
import { ExclamationCircleFill } from "react-bootstrap-icons";
function CreateRoom() {
    const IntitialRoomData = {
        type: "Select Room Type",
        hourPrice: "0",
        dayPrice: "0",
        maxRoomSize: "0",
        minRoomSize: "0",
        roomImg: null,
        number: 0
    }
    const [roomData, setRoomData] = useState(IntitialRoomData)
    const auth = useSelector(store => store.auth);
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
        let formData = new FormData();
        formData.append('type', roomData.type);
        formData.append('roomImg', roomData.roomImg);
        formData.append('openingTime', roomData.openingTime);
        formData.append('closingTime', roomData.closingTime);
        formData.append('maxRoomSize', roomData.maxRoomSize);
        formData.append('minRoomSize', roomData.minRoomSize);
        formData.append('cwSpaceCwID', ownerData.cwSpaceCwID);
        fetch(`http://localhost:4000/rooms`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(response => {
                if (response.status === "error") { console.log(response) }
                else if (response.status === "success") {
                }
                console.log(response)
            })
    }
    function HandleClick(e){
        e.preventDefault();
        if(childRef.current.HandleRoomError()){
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
                            <button
                                type="submit"
                                onClick={e => HandleClick(e)}
                                className="mt-3 w-full text-white btn-color font-medium rounded-lg text-md px-5 py-2.5 text-center duration-300 ease-in-out"
                            >
                                Create Room
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateRoom;