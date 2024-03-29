import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Trash3Fill } from "react-bootstrap-icons";

function ProfileInput({ data, HandleChange }) {
    return (
        <div className="my-4 w-full flex justify-between items-center" >
            <label className="block mb-2 cursor-icon w-1/4 max-sm:w-2/5 gap-2">{data.title}</label>
            <div className="w-full">
                {data.type === "input" ? <input name={data.name} className={`bg-gray-50 border placeholder-gray-900 ${data.condition ? "border-red-500" : "border-gray-300"}
                            text-gray-900 sm:text-sm rounded-lg p-2.5 w-full`}
                    onChange={HandleChange} type="text" value={data.value} ></input> :
                    <textarea name="description" className={`bg-gray-50 border placeholder-gray-900 h-[150px] ${data.condition ? "border-red-500" : "border-gray-300"} 
                            text-gray-900 sm:text-sm rounded-lg w-full p-2.5`}
                        onChange={HandleChange} type="text" value={data.value}></textarea>
                }
                {data.condition ? <span className="text-[12px] text-red-500">{data.errormessage}</span> : null}
            </div>
        </div>
    )
}
function WorkSpaceSettings() {
    const [cwspace, setCwSpace] = useState([]);
    const [mutedData, setMutedData] = useState([]);
    const [cwSpacePhotos, setCwSpacePhotos] = useState([]);
    const token = useSelector(store => store.auth).token;
    const profileData = jwtDecode(token);
    const [img, setImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const [loading, setLoading] = useState(true)
    const [secImg, setSecImg] = useState([]);
    const [secImgName, setSecImgName] = useState("");
    const [checkerror, setCheckError] = useState("");
    const [dataerrors, setDataErrors] = useState({
        address: false,
        email: false,
        imgName: false,
        phonenumber: false,
        description: false,
        fbPage: false,
        start: false,
        end: false,
        img: false,
        secImg: false
    });
    const InputData = [
        { title: "Address", name: "address", condition: dataerrors.address, value: mutedData.address, errormessage: checkerror, type: "input" },
        { title: "Description", name: "description", condition: dataerrors.description, value: mutedData.description, errormessage: checkerror, type: "textArea" },
        { title: "Email", name: "email", condition: dataerrors.email, value: mutedData.email, errormessage: checkerror, type: "input" },
        { title: "Fb Page", name: "fbPage", condition: dataerrors.fbPage, value: mutedData.fbPage, errormessage: checkerror, type: "input" },
        { title: "Phone Number", name: "phone", condition: dataerrors.phonenumber, value: mutedData.phone, errormessage: checkerror, type: "input" },
        { title: "Opening Time", name: "openingTime", condition: dataerrors.start, value: mutedData.openingTime, errormessage: checkerror, type: "input" },
        { title: "Closing Time", name: "closingTime", condition: dataerrors.end, value: mutedData.closingTime, errormessage: checkerror, type: "input" }
    ]
    function HandleChange(e) {
        setMutedData({ ...mutedData, [e.target.name]: e.target.value })
    }
    const imageUrl = `http://localhost:4000/images/cw_spaces/`;
    const getCworkingSpacePhotos = () => {
        fetch(`http://localhost:4000/cw_spacePhotos/${profileData.cwSpaceCwID}`)
            .then(res => res.json())
            .then(responsedata => {
                setCwSpacePhotos(responsedata.data);
            }
            ).catch(error => { console.log(error); });
    }
    const getCworkingSpaceData = () => {
        fetch(`http://localhost:4000/cw_spaces/${profileData.cwSpaceCwID}`)
            .then(res => res.json())
            .then(responsedata => {
                setCwSpace(responsedata.data);
                setMutedData(responsedata.data);
                setLoading(false);
            }
            ).catch(error => { console.log(error); });
    }
    useEffect(() => {
        getCworkingSpaceData();
        getCworkingSpacePhotos();
    }, [])
    function isImage(imgName) {
        if (imgName.slice(-4) === ".jpg" || imgName.slice(-5) === ".jpeg" || imgName.slice(-4) === ".png") return true;
        else {
            return false;
        }
    }
    const addImg = () => {
        if (isImage(imgName)) {
            let formData = new FormData();
            formData.append('mainPhoto', img);
            fetch(`http://localhost:4000/cw_spaces/updatePhoto/${cwspace.cwID}`, {
                method: 'PATCH',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "error") {
                        console.log(data.message)
                    } else if (data.status === "success") {
                        getCworkingSpaceData();
                        setImgName("")
                    }
                })
                .catch(error => {
                    console.error('Error during fetch operation:', error);
                });
        }
    }
    const addSecImg = () => {
        if (isImage(secImgName)) {
            let formData = new FormData();
            formData.append('', secImg);
            fetch(`http://localhost:4000/cw_spacePhotos/${cwspace.cwID}`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "error") {
                        console.log(data.message)
                    } else if (data.status === "success") {
                        getCworkingSpacePhotos();
                        setSecImg([]);
                        setSecImgName("")
                    }
                })
                .catch(error => {
                    console.error('Error during fetch operation:', error);
                });
        }
    }
    function isImage(imageName) {
        if (imageName.slice(-4) === ".jpg" || imageName.slice(-5) === ".jpeg" ||
            imageName.slice(-4) === ".png" || imageName.length === 0) return true;
        else {
            return false;
        }
    }
    const handleImage = (e) => {
        e.preventDefault();
        if (!isImage(imgName)) {
            setDataErrors({
                address: false, email: false, imgName: false, phonenumber: false, description: false, start: false, end: false, img: true, secImg: false
            })
            setCheckError("accepted formats are png,jpg,jpeg");
        }
        else {
            addImg();
            setCheckError("");
        }
    }
    const emailError = () => {
        const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
        if (!mutedData.email.match(regex)) {
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
        var regex = "([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]";
        if (!date.match(regex)) {
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
    const AddData = () => {
        fetch(`http://localhost:4000/cw_spaces/${cwspace.cwID}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "address": mutedData.address,
                "description": mutedData.description,
                "email": mutedData.email,
                "openingTime": mutedData.openingTime.substring(0, 5),
                "closingTime": mutedData.closingTime.substring(0, 5),
                "phone": mutedData.phone,
                "fbPage": mutedData.fbPage
            }),
        }).then(res => res.json()).then((data) => {
            if (data.status === "error") {
                console.log(data.message)
            } else if (data.status === "success") {
                getCworkingSpaceData();
            }
        })
    }
    const HandleError = (e) => {
        e.preventDefault();
        const IntitilErrors = {
            address: false, email: false, imgName: false, phonenumber: false, description: false, start: false, end: false, img: false, secImg: false, fbPage: false
        }
        if (mutedData.address.length === 0) {
            setDataErrors({
                ...IntitilErrors, address: true,
            })
            setCheckError("please fill in the address correctly");
        }
        else if (mutedData.description.length === 0) {
            setDataErrors({
                ...IntitilErrors, description: true
            })
            setCheckError("please fill in the description correctly");
        }
        else if (mutedData.email && emailError()) {
            setDataErrors({
                ...IntitilErrors, email: true
            })
            setCheckError("please write a valid email address");
        }
        else if (mutedData.fbPage && urlError(mutedData.fbPage)) {
            setDataErrors({
                ...IntitilErrors, fbPage: true
            })
            setCheckError("please write a correct url");
        }
        else if (PhoneNumberError(mutedData.phone)) {
            setDataErrors({
                ...IntitilErrors, phonenumber: true
            })
            setCheckError("Please write a correct phone number ex:010123456789");
        }
        else if (DateError(mutedData.openingTime)) {
            setDataErrors({
                ...IntitilErrors, start: true
            })
            setCheckError("Openinig Hour should be in this format 00:00");
        }
        else if (DateError(mutedData.closingTime)) {
            setDataErrors({
                ...IntitilErrors, end: true
            })
            setCheckError("Closing Hour should be in this format 00:00");
        }
        else {
            setCheckError("");
            setDataErrors(IntitilErrors)
            AddData();
        }
    };
    const deletethisimg = (wantedImg) => {
        try {
            fetch(`http://localhost:4000/cw_spacePhotos/${cwspace.cwID}/${wantedImg}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                if (res?.status === 200)
                    getCworkingSpacePhotos();
            })
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }
    function checkCompatability() {
        return mutedData?.address === cwspace?.address
            && mutedData?.email === cwspace?.email
            && mutedData?.fbPage === cwspace?.fbPage
            && mutedData?.description === cwspace?.description
            && mutedData?.openingTime === cwspace?.openingTime
            && mutedData?.closingTime === cwspace?.closingTime
            && mutedData?.phone === cwspace?.phone
    }
    const handleSecImage = (e) => {
        e.preventDefault();
        if (!isImage(secImgName)) {
            setDataErrors({
                address: false, email: false, imgName: false, phonenumber: false, description: false, start: false, end: false, img: false, secImg: true
            })
            setCheckError("accepted formats are png,jpg,jpeg");
        }
        else {
            addSecImg();
            setCheckError("");
        }
    }
    function PhotoCard(props) {
        const Photo= props.cwSpacePhoto;
        const ImageUrl = Photo.id ? "http://localhost:4000/images/cw_spaces/" + Photo.photo : URL.createObjectURL(Photo.photo);
        return (
            <>
                <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full relative group h-64">
                        <img className="w-full h-full lg:object-cover" src={ImageUrl} alt="workspace"></img>
                        <button onClick={() => deletethisimg(props.cwSpacePhoto.id)} className="absolute top-3 right-1 font-extrabold text-lg text-red-400 opacity-0 duration-500
                                group-hover:-translate-x-5 group-hover:opacity-100"><Trash3Fill /></button>
                    </div>
                </div>
            </>
        )
    }
    if (!loading && profileData.cwSpaceCwID) return (
        <>
            <div className="w-full min-h-screen py-1 lg:w-3/4 ">
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">{cwspace?.name}</h2>
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Main Photo</h2>
                <div className="my-4 border border-black-90 rounded-3xl max-w-3xl mx-auto mt-4" >
                    <div className="w-full md:px-16 px-4">
                        <img className=" object-cover sm:w-5/6 sm:mx-auto w-full h-[250px] my-4" src={img ? URL.createObjectURL(img) : imageUrl + cwspace?.mainPhoto} alt="no-picture-added"></img>
                        <input className={`hidden`} id="uploadCWMainImg"
                            onChange={(e) => { setImg(e.target.files[0]); setImgName(e.target.files[0]?.name) }}
                            accept=".png,.jpg,.jpeg" type="file" ></input>
                        {dataerrors.img ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                        <div className="flex flex-row-reverse w-full items-center gap-5">
                            <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${!imgName?.trim() ? "bg-gray-500" : "btn-color border-indigo-200"}
                        rounded-lg border`} disabled={!imgName?.trim()} onClick={(e) => handleImage(e)}>Save</button>
                            <label htmlFor="uploadCWMainImg" className="py-2 px-4 font-medium rounded-lg bg-red-500 hover:bg-red-600 duration-200 cursor-pointer">Change Image</label>
                        </div>
                    </div>
                </div>
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Basic Information</h2>
                <div className="my-4 border border-black-90 rounded-3xl max-w-3xl mx-auto mt-4">
                    <div className="w-full md:px-12 px-4">
                        {InputData.map((element, index) => {
                            return <><ProfileInput data={element} HandleChange={HandleChange} /></>
                        })}
                        <div className="flex flex-row-reverse w-full">
                            <button onClick={(e) => HandleError(e)} disabled={checkCompatability()}
                                className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${checkCompatability() ? "bg-gray-500" : "btn-color border-indigo-200"}
                                rounded-lg border`} >Save</button>
                        </div>
                    </div>
                </div>
                <h2 className="max-w-3xl mx-auto mt-8 px-2 font-bold text-2xl">Photos</h2>
                <div className="my-4 border border-black-90 rounded-3xl max-w-3xl mx-auto mt-4" >
                    <div className="w-full md:px-16 py-4 px-4">
                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3">
                            {cwSpacePhotos?.map((cwSpacePhoto) => {
                                return <PhotoCard cwSpacePhoto={cwSpacePhoto} key={cwSpacePhoto.id} />
                            })}
                        </div>
                        <div>
                            <input className={`hidden`} id="uploadSecImg"
                                onChange={(e) => { setSecImg(e.target.files[0]); setSecImgName(e.target.files[0]?.name); setCwSpacePhotos([...cwSpacePhotos, {photo:e.target.files[0]}]) }}
                                accept=".png,.jpg,.jpeg" type="file" ></input>
                            {dataerrors.secImg ? <span className="text-[12px] text-red-500">{checkerror}</span> : null}
                            <div className="flex flex-row-reverse w-full items-center gap-5">
                                <button className={`py-2 px-8 my-2 text-base font-medium text-indigo-100 ${!secImgName?.trim() ? "bg-gray-500" : "btn-color border-indigo-200"}
                                    rounded-lg border`} disabled={!secImgName?.trim()} onClick={(e) => handleSecImage(e)}>Save</button>
                                <label htmlFor="uploadSecImg" className="py-2 px-4 font-medium rounded-lg bg-red-500 hover:bg-red-600 duration-200 cursor-pointer">ADD NEW PHOTO</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ); else if (!profileData.cwSpaceCwID) return (
        <div className="w-full flex flex-col items-center md:mt-[250px] mt-[100px] text-center">
            <p className="text-xl font-medium">You don't have any created Coworking space yet</p>
            <p className="my-6">Create your first Coworking Space Here:</p>
            <Link to="../createworkspace" className="px-2 py-4 uppercase bg-[#0F4C75] text-white hover:bg-[#197ec2] duration-200"> create working space</Link>
        </div>
    )

}
export default WorkSpaceSettings;