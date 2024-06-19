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
            "question": "What is your return policy?",
            "answer": "You can return any item within 30 days of purchase for a full refund."
        },
        {
            "question": "How long does shipping take?",
            "answer": "Shipping typically takes 5-7 business days, depending on your location."
        },
        {
            "question": "Do you ship internationally?",
            "answer": "Yes, we ship to most countries worldwide. Shipping fees and times may vary."
        },
        {
            "question": "Can I track my order?",
            "answer": "Yes, once your order has been shipped, you will receive a tracking number via email."
        },
        {
            "question": "What payment methods do you accept?",
            "answer": "We accept Visa, MasterCard, American Express, Discover, and PayPal."
        },
        {
            "question": "How can I contact customer service?",
            "answer": "You can contact our customer service team via email at support@example.com or call us at 1-800-123-4567."
        },
        {
            "question": "Do you offer gift cards?",
            "answer": "Yes, we offer gift cards in various denominations. They can be purchased online and sent via email."
        },
        {
            "question": "Can I change or cancel my order?",
            "answer": "Yes, you can change or cancel your order within 24 hours of placing it by contacting our customer service team."
        },
        {
            "question": "Do you offer discounts for bulk purchases?",
            "answer": "Yes, we offer discounts for bulk purchases. Please contact our sales team for more information."
        },
        {
            "question": "Are your products environmentally friendly?",
            "answer": "We are committed to sustainability and offer a range of environmentally friendly products."
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