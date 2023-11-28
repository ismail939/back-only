import Image1 from "../../components/images/cover.jpg"
import Image2 from "../../components/images/offer1.jpg"
import Slider from "../../components/Slider";
import { BoxArrowInRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
function Home() {
    return (
        <>
            <div className="w-4/5 mx-auto mt-[70px] h-[500px] relative bg-cover" style={{ backgroundImage: `url(${Image1})` }}>
                <div className="bg-black w-full h-full opacity-50 absolute"></div>
                <div className="w-full h-full text-white text-center absolute">
                    <div className="w-3/4 h-full mx-auto mt-[150px] max-sm:w-full max-sm:px-2">
                        <h2 className="md:text-4xl text-2xl font-bold">More Than a Desk: A Community of Possibilities</h2>
                        <p className="mt-4 md:text-lg text-sm font-light">At SPACE S, we believe in more than just shared office space.
                            We offer a dynamic community where diverse talents converge, ideas flourish, and connections thrive. Whether you're a freelancer, entrepreneur, or a growing team,
                            our flexible workspaces provide the perfect environment for productivity and networking.</p>
                    </div>
                </div>
            </div>
            <Slider />
            <div className="w-4/5 mx-auto mt-[40px] rounded-xl px-8 py-4 bg-gradient-to-r from-[#1B262C] to-[#0F4C75] text-white
            flex flex-col md:flex-row md:items-center justify-between ">
                <div className="md:w-10/12">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-2xl sec-font">Sign-in to Save</h2>
                        <Link className="text-[30px] cursor-pointer md:hidden hover:text-gray-300" to="login">
                            <BoxArrowInRight />
                        </Link>
                    </div>
                    <p className="text-md mt-4 sec-font">To ensure a seamless booking experience, we kindly remind you to sign in to your account
                        before proceeding in any booking. Signing in allows us to personalize your
                        experience and ensures that you have access to all available options tailored to your preferences. </p>
                </div>
                <Link className="cursor-pointer hidden md:block hover:text-[#1B262C] duration-300 flex flex-col items-center text-center" to="login">
                    <BoxArrowInRight className="text-[60px] " />
                    <h2 className="text-md sec-font px-5">Login</h2>
                </Link>
            </div>
            <div className="w-4/5 mx-auto mt-[70px]">
                <h2 className="text-left mb-8 text-5xl main-font">Discover</h2>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative group">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                            <h2 className="absolute top-3 right-1 font-extrabold text-lg text-white text-yellow-400 opacity-0 duration-500
                            group-hover:-translate-x-5 group-hover:opacity-100">New</h2>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 sec-font">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base sec-font">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative group">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                            <h2 className="absolute top-3 right-1 font-extrabold text-lg text-white text-yellow-400 opacity-0 duration-500
                            group-hover:-translate-x-5 group-hover:opacity-100">New</h2>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 sec-font">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base sec-font">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative group">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                            <h2 className="absolute top-3 right-1 font-extrabold text-lg text-orange-500 opacity-0 duration-500
                            group-hover:-translate-x-5 group-hover:opacity-100">Top-Rated</h2>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 sec-font">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base sec-font">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative group">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                            <h2 className="absolute top-3 right-1 font-extrabold text-lg text-orange-500 opacity-0 duration-500
                            group-hover:-translate-x-5 group-hover:opacity-100">Top-Rated</h2>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 sec-font">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base sec-font">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative group">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                            <h2 className="absolute top-3 right-1 font-extrabold text-lg text-sky-500 opacity-0 duration-500
                            group-hover:-translate-x-5 group-hover:opacity-100">Best-Seller</h2>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 sec-font">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base sec-font">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative group">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                            <h2 className="absolute top-3 right-1 font-extrabold text-lg text-sky-500 opacity-0 duration-500
                            group-hover:-translate-x-5 group-hover:opacity-100">Best-Seller</h2>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 sec-font">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base sec-font">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;