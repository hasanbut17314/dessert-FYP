import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "What are your opening hours?", answer: "We are open from 12 PM to 11 PM every day." },
  { question: "Do you offer delivery?", answer: "Yes! We offer delivery via FoodPanda and Careem." },
  { question: "Can I book a table in advance?", answer: "Yes, you can book a table by calling our customer service." },
  { question: "Do you have a loyalty program?", answer: "Yes, we offer a rewards program for our loyal customers!" },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-[#BA4374] mb-8">Frequently Asked Questions</h2>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <button 
              className="flex justify-between items-center w-full text-lg font-semibold text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <ChevronDown className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
