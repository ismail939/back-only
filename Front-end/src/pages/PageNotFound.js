import image from "../components/images/NotFound.png"
function PageNotFound() {
    return (
        <div className="h-[500px] flex flex-col md:flex-row gap-5 justify-center items-center font-medium text-center">
            <img src={image} alt="" className="max-h-[250px] max-w-[250px] md:max-w-[350px] md:max-h-[350px]"></img>
            <div>
                <h2 className="uppercase md:text-3xl text-xl">Error 404 : Page Not Found</h2>
                <p className="text-sm md:text-lg text-gray-400">Woops:Looks like this page doesn't exist</p>
            </div>
        </div>
    )
}

export default PageNotFound;