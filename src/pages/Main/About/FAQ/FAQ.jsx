import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const FAQ = () => {
    const [isFAQOpen, setIsFAQOpen] = useState(null);

    const faqData = [
        {
            question: "What types of services can I find on your platform?",
            answer: "You can find a wide range of services including cleaning, plumbing, beauty and salon services, appliance repair, tutoring, and more. Our platform connects you with top-rated service providers for all your needs.",
        },
        {
            question: "How do I book a service?",
            answer: "To book a service, simply browse through the available categories, select a service that suits your needs, and follow the booking prompts. You can choose your preferred time and make any necessary payments directly through the platform.",
        },
        {
            question: "Are the service providers vetted?",
            answer: "Yes, all service providers on our platform go through a thorough vetting process. We check their qualifications, customer reviews, and feedback to ensure that you receive high-quality service.",
        },
        {
            question: "Can I cancel or reschedule my booking?",
            answer: "Yes, you can cancel or reschedule your booking. Please check our cancellation policy for specific time frames and conditions to avoid any charges.",
        },
        {
            question: "What payment methods are accepted on your platform?",
            answer: "We accept various payment methods, including credit/debit cards, mobile wallets, and other secure payment gateways. You can select your preferred payment option at checkout.",
        },
        {
            question: "How can I contact customer support if I have issues?",
            answer: "If you encounter any issues or have questions, our customer support team is here to help. You can reach us through the contact form on our website, via email, or by calling our support hotline.",
        },
    ];

    const handleFAQClick = (index) =>
        setIsFAQOpen((prevIndex) => (prevIndex === index ? null : index));



    return (
        <div>
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-semibold mb-12 text-center">Frequently Asked Questions</h3>
                    <div className="max-w-3xl mx-auto">


                        <div className="flex gap-3 flex-col w-full">
                            {faqData.map((faq, index) => (
                                <article key={index} className="border border-[#e5eaf2] rounded p-3">
                                    <div
                                        className="flex gap-2 cursor-pointer items-center justify-between w-full"
                                        onClick={() => handleFAQClick(index)}
                                    >
                                        <h2 className="text-[#3B9DF8] font-[600] text-[1.2rem]">
                                            {faq.question}
                                        </h2>
                                        <p>
                                            <FaPlus
                                                className={`text-[1.3rem] text-[#424242] transition-all duration-300 ${isFAQOpen === index && "rotate-[45deg] !text-[#3B9DF8]"
                                                    }`}
                                            />
                                        </p>
                                    </div>
                                    <div
                                        className={`grid transition-all duration-300 overflow-hidden ease-in-out ${isFAQOpen === index
                                                ? "grid-rows-[1fr] opacity-100 mt-4"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;