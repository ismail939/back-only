function Dashboard() {
    const data = [
        { title: "Create WorkSpace", link: "createworkspace" }
    ]
    return (
        <div className="mt-[70px] w-4/5 mx-auto">
            {data.map((cwspace) => {
                return(
                    <div>
                        <h2>{}</h2>

                    </div>
                )
            })}
        </div>
    )
}
export default Dashboard;