import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { useState } from "react";
function FaqObject({ faq }) {
    const [showAnswer, setShowAnswer] = useState(false);
    return <div className="lg:w-[70%] mb-5">
        <div className="p-3 bg-[#BBE1FA] flex items-center justify-between cursor-pointer" onClick={() =>{setShowAnswer(!showAnswer)}}>
            <h2 className="font-medium text-lg">{faq.question}</h2>
            {showAnswer ? <ChevronUp className="text-xl"/> : <ChevronDown className="text-xl"/>}
        </div>
        <p className={`mt-2 ${!showAnswer && "hidden"}`}>{faq.answer}</p>
    </div>
}
function FAQs() {
    const faqs = [
        {
            "question": "What is SPACEs?",
            "answer": "SPACEs is an online Platform that connects clients with a variety of co-working spaces. We provide a comprehensive platform where co-working spaces can list their amenities, and clients can easily find and book the space that best suits their needs."
        },
        {
            "question": "How do I find a co-working space on the platform?",
            "answer": "Simply use our search and filter tools to find co-working spaces based on your preferences, such as location, amenities, price, and more. You can view detailed listings, photos, and reviews to help you make an informed decision."
        },
        {
            "question": "How do I book a room in co-working space?",
            "answer": "Once you find a co-working space that meets your requirements, you can book a room in it directly through our platform. Select your desired dates, choose the membership plan or day pass, and complete the booking process online."
        },
        {
            "question": "Can I tour a co-working space before booking?",
            "answer": "Yes, many co-working spaces offer tours to potential clients. You can request a tour directly from the listing page of the co-working space you are interested in."
        },
        {
            "question": "How do I create an account as a co-working space owner?",
            "answer": "To create an account, click on the 'Sign Up' button and choose the 'Owner' option. Fill out the required details about your space, upload photos, and provide information about your amenities and pricing. Once your account is set up, you can start listing your space and managing bookings."
        },
        {
            "question": "How are payments handled?",
            "answer": "Payments are processed securely through our platform. Clients can pay for their bookings using major credit cards or other accepted payment methods. Co-working space owners receive payments directly to their specified accounts."
        },
        {
            "question": "How can I leave a review for a co-working space?",
            "answer": "After your visit or booking, you will receive an email prompting you to leave a review. Your feedback helps other clients make informed decisions and helps co-working space owners improve their services."
        },
        {
            "question": "What if I need to cancel my booking?",
            "answer": "You can cancel your booking up to 6 hours before the scheduled time without any charges. If you cancel within 6 hours of the booking time, a penalty will be applied, which will be added to your next booking. Please review the specific cancellation policy provided in the listing before booking. If you need to cancel, follow the instructions in your booking confirmation or contact our support team for assistance."
        },
        {
            "question": "How do I contact customer support?",
            "answer": "If you have any questions or need assistance, you can contact our customer support team through the 'Contact Us' page on our website. We're here to help with any inquiries or issues you may have."
        },
        {
            "question": "Are there any fees for using the platform?",
            "answer": "Creating an account and browsing co-working spaces is free. Fees may apply for bookings and are transparently displayed during the booking process."
        },
        {
            "question": "Can I list more than one co-working space?",
            "answer": "No, co-working space owners can list only one location under their account."
        },
        {
            "question": "What measures are in place for COVID-19 safety?",
            "answer": "We prioritize the health and safety of our community. Each co-working space listing includes information on the COVID-19 safety measures they have implemented, such as enhanced cleaning protocols, social distancing arrangements, and mask requirements."
        },
        {
            "question": "How do I update my listing information?",
            "answer": "Co-working space owners can update their listing information at any time by logging into their account. From the dashboard, you can edit details, update photos, adjust pricing, and manage availability."
        },
        {
            "question": "Can clients see which spaces have availability in real-time?",
            "answer": "Yes, our platform provides real-time availability for co-working spaces. Clients can check available dates and times directly from the booking page."
        }
    ]
    return (
        <div className="w-[90%] mx-auto mt-[70px] min-h-screen">
            <h2 className="text-[35px] main-font">FAQs</h2>
            <div className="mt-4">
                {faqs.map((faq) => {
                    return <FaqObject faq={faq} />
                })}
            </div>
        </div>
    )
}


export default FAQs;