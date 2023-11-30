import { Link } from "react-router-dom";
function Dashboard() {
    const data = [
        { title: "To Create WorkSpace:", button:"Create WorkSpace" ,link: "../createworkspace" },
        { title: "To Create Offer:", button:"Create Offer" ,link: "../createOffer" }
    ]
    return (
        <div className="min-h-screen mt-[70px] w-4/5 mx-auto">
            {data.map((item) => {
                return(
                    <div>
                        <h2>{item.title}</h2>
                        <Link to={item.link}>
                            <button className="border p-4 border-black">{item.button}</button>
                            </Link>
                    </div>
                )
            })}
        </div>
    )
}
export default Dashboard;