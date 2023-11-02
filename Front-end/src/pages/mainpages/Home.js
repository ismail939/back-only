import Footer from "../../components/Footer";
import Image1 from "../../components/images/cover.jpg"
import Slider from "../../components/Slider";
function Home(){
    return(
        <>
        <div className="w-4/5 mx-auto mt-[70px] h-[500px] relative bg-cover" style={{backgroundImage:`url(${Image1})`}}>
            <div className="bg-black w-full h-full opacity-50 absolute"></div>
            <div className="w-full h-full text-white text-center absolute">
                <div className="w-3/4 h-full mx-auto mt-[150px] max-sm:w-full max-sm:px-2">
                    <h2 className="text-5xl font-bold">Our Vision</h2>
                    <p className="mt-4 text-lg">We create a borderless and inclusive work environment, where individuals and teams can connect, collaborate, and thrive regardless of their physical location</p>
                </div>
            </div>
        </div>
        <Slider />
        </>
    )
}

export default Home;