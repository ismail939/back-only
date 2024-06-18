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
        fetch(`http://localhost:4000/books/${profileData.cwSpaceCwID}`, {
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
    function BookedCard(props) {
        const room = props.room;
        const clientImage = `http://localhost:4000/images/clients/` + room.clientImage;
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
                <div className="">
                    <div className="">
                        <img className="h-48 w-full object-cover w-full" src={room.roomImage} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize text-lg leading-tight text-xl main-font">{`${room.payment}`}</h1>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${room?.createdAt.slice(0, 10)} ${room?.createdAt.slice(11, 19)} Created `}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${room?.createdAt.slice(0, 10)} ${room?.start.slice(11, 19)} Start `}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`${room?.updatedAt.slice(0, 10)} ${room?.end.slice(11, 19)} End`}</div>
                        <div className="flex items-center gap-2 my-2">
                            <img className="w-10 h-10 object-cover rounded-full" src={clientImage} alt={"no image found"}></img>
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