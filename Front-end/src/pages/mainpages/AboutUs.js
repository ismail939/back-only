import modatherI from "../../components/images/modather.jfif"
import tarekI from "../../components/images/tarek.jpg"
import yousefI from "../../components/images/yousef.jfif"
import swm3aI from "../../components/images/swm3a.jfif"
import image from "../../components/images/coworking.jpg"
function AboutUs() {
    return (
        <>
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                        <p className="font-normal text-base leading-6 text-gray-600 ">At SPACE S, we believe in more than just shared office space.
                            We offer a dynamic community where diverse talents converge, ideas flourish, and connections thrive. Whether you're a freelancer, entrepreneur, or a growing team,
                            our flexible workspaces provide the perfect environment for productivity and networking.</p>
                    </div>
                    <div className="w-full lg:w-8/12 ">
                        <img className="w-full h-full" src={image} alt="A group of People" />
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                    <div className="w-full lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                        <p className="font-normal text-base leading-6 text-gray-600 ">We are a group of friends from Ain shams university faculty of Engineering Computer and Systems Engineering department , we found that it's very hard for us and our colleagues to find a good Co-working space that is suitibale for us  , so we thought about making a website that can help us with this problem </p>
                    </div>
                    <div className="w-full lg:w-8/12 lg:pt-8">
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="md:block hidden" src={tarekI} alt="yousef featured Img" />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Tarek</p>
                            </div>
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="md:block hidden" src={modatherI} alt="Olivia featured Img" />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Abdelrahman</p>
                            </div>
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="md:block hidden" src={swm3aI} alt="Liam featued Img" />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Ismail</p>
                            </div>
                            <div className="p-4 pb-6 flex justify-center flex-col items-center">
                                <img className="md:block hidden" src={yousefI} alt="Elijah featured img" />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Yousef</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutUs;