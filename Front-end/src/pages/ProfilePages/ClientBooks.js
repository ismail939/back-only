import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
function ClientBookings() {
    const [books, setBooks] = useState([]);
    const token = useSelector(store => store.auth).token;
    const profileData = jwtDecode(token);
    const getBooks = () => {
        fetch(`http://localhost:4000/clients/getBookings/${profileData.clientID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(responsedata => {
                setBooks(responsedata.data)
                console.log(responsedata.data)
            }).catch()
    }
    useEffect(() => {
        getBooks();
    }, [])
    function BookedCard(props) {
        const room = props.room;
        return (
            <div className="bg-white rounded-sm shadow-md overflow-hidden w-full my-5">
                <div className="flex md:flex-row flex-col">
                    <div className="">
                        <img className="h-48 w-full object-cover" src={room.roomImage} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize text-lg leading-tight text-xl main-font">{`Payment Method: ${room.payment}`}</h1>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`Created at: ${room?.createdAt.slice(0, 10)} ${room?.createdAt.slice(11, 19)}`}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`Start Bookig: ${room?.createdAt.slice(0, 10)} ${room?.start.slice(11, 19)}`}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`End Booking: ${room?.updatedAt.slice(0, 10)} ${room?.end.slice(11, 19)}`}</div>
                        <div className="main-font text-xl capitalize text-[#0F4C75]">{`total cost is ${room.totalCost}`}</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="mt-8 w-3/4 mx-auto">
            <h2 className="text-2xl main-font mt-4 mb-4">Bookings</h2>
            {books?.length > 0 ? <div className="">
                <div className="mt-4">
                    {books?.map((room) => {
                        return <BookedCard room={room} key={room.clientClientID} />
                    })}
                </div>
            </div> : <div className="text-center mt-[100px]">
                <p className="font-medium text-xl">Currently there aren't any books</p>
            </div>}
        </div>
    )
}

export default ClientBookings;