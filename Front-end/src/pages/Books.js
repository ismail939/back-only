import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { TopBar } from "./Requests";
function Books() {
    const [books, setBooks] = useState([]);
    const user = useSelector(store => store.auth);
    const token = user.token;
    const usertype = user.usertype;
    const profileData = jwtDecode(token);
    const getBooks = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/books/${profileData.cwSpaceCwID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(responsedata => {
                console.log(responsedata.data)
                setBooks(responsedata.data)
            }).catch()
    }
    useEffect(() => {
        getBooks();
    }, [])
    function formatDate(isoString) {
        const date = new Date(isoString);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        // Extract the date components
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = isoString.split('T')[1].split(':')[0];
        const minutes = isoString.split('T')[1].split(':')[1];
        return `${day} ${month} ${year} ${hours}:${minutes}`;
    }
    function BookedCard(props) {
        const room = props.room;
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
                <div className="">
                    <div className="">
                        <img className="h-48 w-full object-cover w-full" src={room.roomImage} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize text-lg leading-tight text-xl main-font">{`${room.payment}`}</h1>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${formatDate(room?.createdAt)} Created `}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${formatDate(room?.start)} Start `}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${formatDate(room?.end)} End`}</div>
                        <div className="flex items-center gap-2 my-2">
                            <img className="w-10 h-10 object-cover rounded-full" src={room.clientImg} alt={"no image found"}></img>
                            <div>{`${room?.username}  Booked`}</div>
                        </div>
                        <div className="main-font text-xl capitalize text-[#0F4C75]">{`total cost is ${room.totalCost}`}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="w-[95%] mx-auto min-h-screen">
                <TopBar intitalState={"Books"}/>
                <div className="">
                    {books?.length > 0 ? <div className="mt-10">
                        <h2 className="text-2xl main-font mb-4">Booked</h2>
                        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                            {books?.map((room) => {
                                return <BookedCard room={room} key={room.clientClientID} />
                            })}
                        </div>
                    </div> : <div className="text-center mt-[100px]">
                        <p className="font-medium text-xl">Currently there aren't any books</p>
                        </div>}
                </div>
            </div>
        </>
    )
}
export default Books;