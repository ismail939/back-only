import { useRef, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { ChevronDown } from "react-bootstrap-icons";
function RoomForm({ roomData, updateRoomData, childRef, ShowError }) {
    const IntitialDataErrors = {
        type: false,
        hourPrice: false,
        dayPrice: false,
        maxRoomSize: false,
        minRoomSize: false,
        roomImg: false,
        roomNumber: false,
    }
    const [dataerrors, setDataErrors] = useState(IntitialDataErrors);
    const [checkerror, setCheckError] = useState("");
    const [dropdown, setDropDown] = useState(false);
    function HandleDropDown(e) {
        e.preventDefault()
        updateRoomData({ type: e.target.value })
        setDropDown(false)
    }
    function isImage(ImageName) {
        if (ImageName?.slice(-4) === ".jpg" || ImageName?.slice(-5) === ".jpeg" || ImageName?.slice(-4) === ".png") return true;
        else {
            return false;
        }
    }
    function NumberError(Number) {
        var regex = /^\d+$/;
        if (!Number) {
            return true;
        }
        else if (!Number.match(regex)) {
            return true;
        } else if (Number <= 0) {
            return true
        } else {
            return false;
        }
    }
    const HandleRoomError = () => {
        if (roomData.type === "Select Room Type") {
            setDataErrors({ ...IntitialDataErrors, type: true })
            setCheckError("Please Select Room Type")
            window.scrollTo(0, 100)
        } else if (!roomData.roomImg || !isImage(roomData.roomImg?.name)) {
            setDataErrors({ ...IntitialDataErrors, roomImg: true })
            setCheckError("Please Select a valid Image, accepted formats are: png, jpg, jpeg")
            window.scrollTo(0, 200)
        } else if (NumberError(roomData.number)) {
            setDataErrors({ ...IntitialDataErrors, roomNumber: true })
            setCheckError("Please enter a Suitable Room Number")
            window.scrollTo(0, 250)
        } else if (NumberError(roomData.hourPrice)) {
            setDataErrors({ ...IntitialDataErrors, hourPrice: true })
            setCheckError("Please enter a Suitable Hour Price")
            window.scrollTo(0, 300)
        } else if (NumberError(roomData.dayPrice)) {
            setDataErrors({ ...IntitialDataErrors, dayPrice: true })
            setCheckError("Please enter a Suitable Day Price")
            window.scrollTo(0, 300)
        } else if (NumberError(roomData.minRoomSize)) {
            setDataErrors({ ...IntitialDataErrors, minRoomSize: true })
            setCheckError("Please enter a Suitable Min. room size")
            window.scrollTo(0, 400)
        } else if (NumberError(roomData.maxRoomSize)) {
            setDataErrors({ ...IntitialDataErrors, maxRoomSize: true })
            setCheckError("Please enter a Suitable Max. room size")
            window.scrollTo(0, 400)
        } else {
            return true
        }
    }
    useImperativeHandle(childRef, () => ({
        HandleRoomError
    }))
    return (
        <>
            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Room Type
                </label>
                <div id="type" className="relative w-full">
                    <button id="dropdownDefaultButton" className={`flex items-center justify-between bg-gray-50 border ${dataerrors.type ? "border-red-500" : dropdown ? "border-black" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
                        onClick={(e) => { e.preventDefault(); setDropDown(!dropdown) }}><span>{roomData.type}</span><ChevronDown />
                    </button>
                    <ul className={`w-full text-sm text-gray-700 z-10 bg-white rounded-lg shadow ${dropdown ? "absolute" : "hidden"}`}>
                        <button className="w-full hover:bg-gray-100 cursor-pointer px-3 py-4 text-left" value="Shared" onClick={e => HandleDropDown(e)}>
                            Shared
                        </button>
                        <button className="w-full hover:bg-gray-100 cursor-pointer px-3 py-4 text-left" value="Private" onClick={e => HandleDropDown(e)}>
                            Private
                        </button>
                        <button className="w-full hover:bg-gray-100 cursor-pointer px-3 py-4 text-left" value="Meeting" onClick={e => HandleDropDown(e)}>
                            Meeting
                        </button>
                    </ul>
                </div>
                <ShowError condition={dataerrors.type} value={checkerror} />
            </div>
            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Room Image
                </label>
                <input type="file" name="offerImage" id="offerImage"
                    className={`bg-gray-50 border ${dataerrors.roomImg ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5`}
                    placeholder=""
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => {
                        updateRoomData({ roomImg: e.target.files[0] })
                    }}
                ></input>
                <ShowError condition={dataerrors.roomImg} value={checkerror} />
            </div>
            <div>
                <label
                    htmlFor="minRoomSize"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Room Number
                </label>
                <input type="number" name="roomNumber" id="roomNumber" min={1}
                    className={`bg-gray-50 border ${dataerrors.roomNumber ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                    placeholder="Enter room number"
                    value={roomData?.number}
                    onChange={(e) => {
                        updateRoomData({ number: e.target.value })
                    }}
                ></input>
                <ShowError condition={dataerrors.roomNumber} value={checkerror} />
            </div>
            <div>
                <div className="flex items-center justify-between gap-8 mb-3">
                    <div>
                        <label
                            htmlFor="hourPrice"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Hour Price
                        </label>
                        <input type="number" name="hourPrice" id="hourPrice" min={0}
                            className={`bg-gray-50 border ${dataerrors.hourPrice ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                            placeholder="Enter price of Hour"
                            value={roomData.hourPrice}
                            onChange={(e) => {
                                updateRoomData({ hourPrice: e.target.value })
                            }}
                        ></input>
                    </div><div>
                        <label
                            htmlFor="dayPrice"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Day Price
                        </label>
                        <input type="number" name="dayPrice" id="dayPrice" min={0}
                            className={`bg-gray-50 border ${dataerrors.dayPrice ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                            placeholder="Enter price of Day"
                            value={roomData.dayPrice}
                            onChange={(e) => {
                                updateRoomData({ dayPrice: e.target.value })
                            }}
                        ></input>
                    </div>
                </div>
                <ShowError condition={dataerrors.hourPrice} value={checkerror} />
                <ShowError condition={dataerrors.dayPrice} value={checkerror} />
            </div>
            <div>
                <div className="flex items-center justify-between gap-8 mb-3">
                    <div>
                        <label
                            htmlFor="minRoomSize"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Minimum Room Size
                        </label>
                        <input type="number" name="minRoomSize" id="minRoomSize" min={1}
                            className={`bg-gray-50 border ${dataerrors.minRoomSize ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                            placeholder="Enter mimimum Room size"
                            value={roomData.minRoomSize}
                            onChange={(e) => {
                                updateRoomData({ minRoomSize: e.target.value })
                            }}
                        ></input>
                    </div>
                    <div>
                        <label
                            htmlFor="maxRoomSize"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Maximum Room Size
                        </label>
                        <input type="number" name="maxRoomSize" id="maxRoomSize" min={1}
                            className={`bg-gray-50 border ${dataerrors.maxRoomSize ? "border-red-500" : "border-gray-300"} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5`}
                            placeholder="Enter maximum Room size"
                            value={roomData.maxRoomSize}
                            onChange={(e) => {
                                updateRoomData({ maxRoomSize: e.target.value })
                            }}
                        ></input>
                    </div>
                </div>
                <ShowError condition={dataerrors.maxRoomSize} value={checkerror} />
                <ShowError condition={dataerrors.minRoomSize} value={checkerror} />
            </div>
        </>
    )
}
export default forwardRef(RoomForm);