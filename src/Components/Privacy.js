import React from "react";
import Footer from "./Footer/Footer";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
    const navigate = useNavigate();

    return (
        <div className="Legal-div">
            <section className="overview-wrapper">
                <div className="container text-start">
                    <div className="row gy-4">
                        <div className="col-xl-6 ">
                            <nav
                                style={{
                                    "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
                                }}
                                aria-label="breadcrumb"
                            >
                                <ol className="overview-breadcrumb breadcrumb">
                                    <li className="breadcrumb-item" onClick={() => { navigate('/') }}><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Privacy Policy</li>
                                </ol>
                            </nav>

                            <div className="overview-head">
                                <h2>Data Collection & Usage Policy</h2>
                                <p>We value your privacy and are committed to protecting your personal data. This section outlines the measures we take to ensure the security, confidentiality, and proper use of the information you share with us.</p>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="overview-img">
                                <img src="/beschaffungsmarkt_images/privacy-Dms_4n4R.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="">
                <div className="container">
                    <div className="d-flex flex-column align-items-start justify-content-start text-start w-100  privacy-div py-4 px-4">
                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>1. Introduction</h3>
                            <span>We take the protection of your personal data very seriously. This privacy policy explains how we collect, use, and protect your data when you use our platform <b>Beschaffungsmarkt Global</b>. We process your data in accordance with the <b>General Data Protection Regulation (GDPR)</b> and other applicable data protection laws.</span>
                            <h5>Responsible Entity</h5>
                            <span><b>Beschaffungsmarkt Global</b></span>
                            <span>[Your Company Name]</span>
                            <span>[Street & Number]</span>
                            <span>[Postal Code, City]</span>
                            <span>[Country]</span>
                            <span><b>Contact</b></span>
                            <span>Email: [Your Email Address]</span>
                            <span>Phone: [Your Phone Number]</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>2. What Data We Collect</h3>
                            <span>We collect and process the following types of personal data:</span>
                            <h4>2.1 Data You Provide to Us</h4>
                            <ul>
                                <li>When registering: <b>Name, email, company name, address, phone number</b></li>
                                <li>When using our services: <b>Product listings, messages, uploaded files</b></li>
                                <li>When contacting us: <b>Support requests, inquiries</b></li>
                            </ul>

                            <h4>2.2 Data Collected Automatically</h4>
                            <ul>
                                <li><b>Log files: </b>IP address, browser type, operating system, and time of access</li>
                                <li><b>Cookies & Tracking: </b>To enhance user experience and analyze website traffic</li>
                            </ul>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>3. Purpose of Data Processing</h3>
                            <span>We process your data for the following purposes:</span>
                            <ul>
                                <li>To provide and manage our platform</li>
                                <li>To facilitate trade between German and Turkish companies</li>
                                <li>To enable secure communication between users</li>
                                <li>To improve our services and user experience</li>
                                <li>To fulfill legal obligations (e.g., tax and accounting requirements)</li>
                            </ul>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>4. Legal Basis for Processing</h3>
                            <span>We process your personal data based on the following legal grounds:</span>
                            <ul>
                                <li><b>Performance of a contract </b>(Article 6(1)(b) GDPR) – To provide our services</li>
                                <li><b>Legal obligations </b>(Article 6(1)(c) GDPR) – For tax and regulatory compliance</li>
                                <li><b>Legitimate interests </b>(Article 6(1)(f) GDPR) – To analyze website performance</li>
                                <li><b>Consent </b>(Article 6(1)(a) GDPR) – For optional services like newsletters</li>
                            </ul>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>5. Data Sharing and Third-Party Services</h3>
                            <span>We do not sell or rent your data. However, we may share your data in the following cases:</span>
                            <ul>
                                <li><b>With service providers </b>(e.g., hosting providers, payment processors)</li>
                                <li><b>For legal reasons </b>(e.g., government authorities, law enforcement)</li>
                                <li><b>With business partners </b>(only if necessary for platform functionality)</li>
                            </ul>
                            <span>We ensure that all third-party providers comply with GDPR standards.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>6. Data Storage and Security</h3>
                            <span>We take all necessary technical and organizational measures to protect your data from unauthorized access, alteration, or loss. Your data is stored on secure servers within the European Union (or specify your hosting location).</span>
                            <ul>
                                <li><b>Data retention: </b>We store your data as long as necessary for providing services and fulfilling legal requirements.</li>
                                <li><b>Deletion request:</b> You can request the deletion of your data at any time, provided there are no legal obligations requiring retention.</li>
                            </ul>
                            <span>We ensure that all third-party providers comply with GDPR standards.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>7. Cookies & Tracking Technologies</h3>
                            <span>We use cookies and tracking technologies to enhance your experience. These include:</span>
                            <ul>
                                <li><b>Essential cookies </b>(necessary for site functionality)</li>
                                <li><b>Analytical cookies </b>(Google Analytics, etc. – requires user consent)</li>
                                <li><b>Marketing cookies</b> (only with user consent)</li>
                            </ul>
                            <span>You can manage your cookie preferences in your browser settings or via our cookie consent tool.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>8. Your Rights Under GDPR</h3>
                            <span>You have the following rights regarding your personal data:</span>
                            <ul>
                                <li><b>Right to access (Art. 15 GDPR) </b>– Request a copy of your stored data)</li>
                                <li><b>Right to rectification (Art. 16 GDPR) </b>– Correct incorrect data</li>
                                <li><b>Right to erasure (Art. 17 GDPR) </b>– Request deletion of your data</li>
                                <li><b>Right to restriction (Art. 18 GDPR) </b>– Restrict processing under certain conditions</li>
                                <li><b>Right to data portability (Art. 20 GDPR) </b>– Receive data in a portable format</li>
                                <li><b>Right to object (Art. 21 GDPR) </b>– Object to processing based on legitimate interest</li>
                                <li><b>Right to withdraw consent (Art. 7(3) GDPR) </b>– Withdraw consent at any time</li>
                            </ul>
                            <span>To exercise these rights, contact us at [Your Email Address]</span>
                        </div>


                    </div>
                </div>
            </section>

            <section>
                <Footer />
            </section>
        </div>
    )
}

export default Privacy;