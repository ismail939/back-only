import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
function ClientBookings() {
    const [books, setBooks] = useState([]);
    const token = useSelector(store => store.auth).token;
    const profileData = jwtDecode(token);
    const getBooks = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/clients/getBookings/${profileData.clientID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(responsedata => {
                setBooks(responsedata.data)
            }).catch()
    }
    useEffect(() => {
        getBooks();
    }, [])
    function formatDate(isoString, bookTime) {
        const date = new Date(isoString);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        // Extract the date components
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = bookTime ? isoString.split('T')[1].split(':')[0] : date.getHours().toString().padStart(2, '0');
        const minutes = bookTime ? isoString.split('T')[1].split(':')[1] : date.getMinutes().toString().padStart(2, '0');
        return `${day} ${month} ${year} ${hours}:${minutes}`;
    }
    function BookedCard(props) {
        const room = props.room;
        return (
            <div className="bg-white rounded-sm shadow-md overflow-hidden w-full my-5 max-w-[800px]">
                <div className="flex md:flex-row flex-col">
                    <div className="">
                        <img className="h-52 w-full md:w-[300px] object-cover" src={room.img} alt={"no image found"}></img>
                    </div>
                    <div className="px-8 py-2">
                        <h1 className="capitalize font-semibold text-2xl leading-tight text-black main-font">{room?.cw_spaceName}</h1>
                        <h1 className="capitalize font-semibold text-xl leading-tight text-black main-font">{`Room ${room?.roomNumber}`}</h1>
                        <h1 className="capitalize text-lg  text-gray-500 text-lg main-font">{`Payment Method: ${room.payment}`}</h1>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`Time of Book: ${formatDate(room?.createdAt)}`}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`Book start: ${formatDate(room?.start , true)}`}</div>
                        <div className="uppercase mt-1 tracking-wide text-sm text-[#3282B8] sec-font">{`book end: ${formatDate(room?.end, true)}`}</div>
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