import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            question: "Do you offer home delivery?",
            answer: "Yes! We offer 24/7 home delivery service to ensure you can enjoy our delicious food anytime, day or night."
        },
        {
            question: "What areas do you deliver to?",
            answer: "Currently, we only offer delivery within Islamabad. We're working on expanding our service area to other cities soon!"
        },
        {
            question: "What are your delivery hours?",
            answer: "We provide delivery service 24 hours a day, 7 days a week. You can place an order anytime and we'll deliver it to your doorstep."
        },
        {
            question: "How long does delivery take?",
            answer: "Standard delivery time is 30-45 minutes within Islamabad. During peak hours, it may take up to 60 minutes. We'll keep you updated on your order status."
        },
        {
            question: "Is there a minimum order amount for delivery?",
            answer: "Yes, there's a minimum order amount of Rs. 500 for delivery orders. This helps us maintain quality service and cover delivery costs."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept cash on delivery, credit/debit cards, and digital payments including mobile wallets and online banking."
        },
        {
            question: "Can I cancel my order?",
            answer: "You can cancel your order within 5 minutes of placing it. After that, the order will be processed and cannot be cancelled."
        },
        {
            question: "Do you offer refunds?",
            answer: "We offer refunds for orders that arrive damaged or incorrect. Please contact our customer service within 30 minutes of delivery."
        },
        {
            question: "Are your ingredients fresh?",
            answer: "Absolutely! We use only the freshest, highest quality ingredients. All our products are made fresh daily with no preservatives."
        },
        {
            question: "Do you have vegetarian options?",
            answer: "Yes, we offer a wide variety of vegetarian options including fresh salads, vegetarian sandwiches, and plant-based alternatives."
        },
        {
            question: "Can I customize my order?",
            answer: "Of course! You can customize your order by adding or removing ingredients, choosing different sauces, or requesting special dietary requirements."
        },
        {
            question: "Do you offer catering services?",
            answer: "Yes, we provide catering services for events and parties. Please contact us at least 24 hours in advance for catering orders."
        }
    ]

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find answers to the most common questions about our delivery service, menu, and policies.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-4">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </h3>
                                    {openIndex === index ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    )}
                                </div>
                            </button>

                            {openIndex === index && (
                                <div className="bg-white border-t-0 border border-gray-200 rounded-b-lg p-6 mt-0">
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Faq