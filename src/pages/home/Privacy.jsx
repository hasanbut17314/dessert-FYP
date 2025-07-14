import React from 'react'

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary px-6 py-8">
                        <h1 className="text-3xl font-bold text-pink-500 text-center">
                            Privacy Policy
                        </h1>
                        <p className="text-pink-300 text-center mt-2">
                            Kaspa's Franchise Ltd
                        </p>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-8 space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                1. Introduction
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    At Kaspa's Franchise Ltd, we are committed to protecting the privacy and confidentiality of your personal information. This comprehensive privacy notice aims to provide you with detailed information on how we collect, use, share, and protect your personal data in compliance with the General Data Protection Regulation (GDPR), the Data Protection Act 2018, and other applicable data protection laws, including those of England and English law.
                                </p>
                            </div>
                        </section>

                        {/* Data Controller */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                2. Data Controller
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    Kaspa's Franchise Ltd, registered in England, is the data controller responsible for the processing of your personal data. For any inquiries regarding the processing of your personal information or to exercise your data protection rights, please contact us using the details provided at the end of this notice.
                                </p>
                            </div>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                3. Information We Collect
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We collect and process various categories of personal information about you, including but not limited to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Contact Information:</strong> Name, address, email address, telephone number</li>
                                    <li><strong>Financial Information:</strong> Payment details, billing information</li>
                                    <li><strong>Technical Information:</strong> Internet Protocol (IP) address, browser type, device identifiers</li>
                                    <li><strong>Usage Information:</strong> Information about how you interact with our website, products, and services</li>
                                    <li><strong>Marketing Preferences:</strong> Your preferences for receiving marketing communications and promotional offers</li>
                                </ul>
                            </div>
                        </section>

                        {/* Purposes of Processing */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                4. Purposes of Processing Your Personal Information
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We process your personal information for the following purposes:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Customer Support:</strong> Responding to inquiries, providing assistance, and resolving issues</li>
                                    <li><strong>Marketing and Promotions:</strong> Sending marketing communications, newsletters, and promotional offers, subject to your consent</li>
                                    <li><strong>Personalisation:</strong> Tailoring our products, services, and marketing communications to your preferences and interests</li>
                                    <li><strong>Analytics and Improvement:</strong> Analysing usage data, conducting research, and improving the quality and performance of our products and services</li>
                                    <li><strong>Legal and Regulatory Compliance:</strong> Complying with legal obligations, regulatory requirements, and industry standards</li>
                                    <li><strong>Fraud Prevention and Security:</strong> Detecting and preventing fraud, unauthorised access, and other security incidents</li>
                                </ul>
                            </div>
                        </section>

                        {/* Legal Basis */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                5. Legal Basis for Processing Your Personal Information
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We process your personal information based on one or more of the following legal grounds:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Performance of a Contract:</strong> Processing necessary for the performance of a contract to which you are a party or to take steps at your request before entering into a contract</li>
                                    <li><strong>Consent:</strong> Processing based on your consent, which you may withdraw at any time by contacting us</li>
                                    <li><strong>Legal Obligation:</strong> Processing necessary to comply with legal obligations or regulatory requirements</li>
                                    <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests or those of third parties, provided your interests and fundamental rights do not override those interests</li>
                                </ul>
                            </div>
                        </section>

                        {/* Sharing Information */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                6. Sharing Your Personal Information
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We may share your personal information with the following categories of recipients:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Service Providers:</strong> Third-party service providers who assist us in providing our products and services (e.g., payment processors, shipping carriers, IT service providers)</li>
                                    <li><strong>Business Partners:</strong> Affiliates, franchisees, and business partners with whom we collaborate to deliver products and services</li>
                                    <li><strong>Legal and Regulatory Authorities:</strong> Law enforcement agencies, government authorities, and regulatory bodies as required by law or to protect our legal rights</li>
                                    <li><strong>Professional Advisors:</strong> Legal advisors, auditors, and consultants who assist us in managing our business operations</li>
                                </ul>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Privacy