import pagenotfound from "../components/images/pagenotfound.svg"
function PageNotFound() {
    return (
        <div className="min-h-screen flex flex-col gap-5 justify-center items-center font-medium text-center">
            <img src={pagenotfound} alt="" className="h-[250px] w-[250px] w-[500px] h-[100px]"></img>
            <div>
                <h2 className="uppercase md:text-3xl text-xl sec-font">Page Not Found</h2>
                <p className="text-sm md:text-lg text-gray-400 sec-font">Woops:Looks like this page doesn't exist</p>
            </div>
        </div>
    )
}

export default PageNotFound;