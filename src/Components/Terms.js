import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";

const Terms = () => {
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
                                    <li className="breadcrumb-item active" aria-current="page">Terms of Service</li>
                                </ol>
                            </nav>

                            <div className="overview-head">
                                <h2>Agreement for Using Our Services</h2>
                                <p>By accessing and using our services, you agree to comply with the terms outlined in this agreement. This section defines the rules, rights, and responsibilities that govern your use of our platform, including account usage, acceptable conduct, limitations of liability, and dispute resolution. We encourage you to read these terms carefully to ensure a smooth and transparent experience while using our services</p>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="overview-img">
                                <img src="/beschaffungsmarkt_images/terms-C1bfpdZ9.png" alt="overview-img" loading = "lazy" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="">
                <div className="container">
                    <div className="d-flex flex-column align-items-start justify-content-start text-start w-100 privacy-div py-4 px-4">
                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>Procurement Market Global</h3>
                            <span>[Your company name]</span>
                            <span>[Street & house number]</span>
                            <span>[Postcode, city]</span>
                            <span>[Country]</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>Contact</h3>
                            <span>E-mail: [Your e-mail address]</span>
                            <span>Telephone: [Your telephone number]</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>1. Scope of application</h3>
                            <span>These General Terms and Conditions (GTC) govern the use of the Procurement Market Global platform by registered companies and visitors. By using our services, you accept these GTC in their current versio</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>2. Services provided by Beschaffungsmarkt Global</h3>
                            <span>(a) Platform for initiating business: Beschaffungsmarkt Global provides an online platform that connects German and Turkish companies. Users can create company profiles, list products and communicate via our messaging system.</span>
                            <span>(b) Different membership levels: There are free and paid memberships with different levels of service.</span>
                            <span>(c) No direct contracting party: Beschaffungsmarkt Global merely facilitates contact between companies, but does not become a contracting party in commercial transactions between users.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>3. Registration & User account</h3>
                            <span>(a) Registration requirement: Use of the platform requires registration. Only persons of legal age and legal capacity may register.</span>
                            <span>(b) Company details: When registering, complete and correct details of the company must be provided.</span>
                            <span>(c) Access data: The user is obliged to keep his access data secret and not to pass it on to third parties.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>4. Use of the platform & User obligations</h3>
                            <span>(a) Permitted use: Users may only use the platform to initiate business and for legal activities.</span>
                            <span>(b) Prohibited content: The publication of false information, spam, misleading or illegal content is prohibited.</span>
                            <span>(c) Fair trade: Users undertake to communicate and trade honestly and professionally.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>5. Costs & Terms of paymen</h3>
                            <span>(a) Free & paid memberships: Basic registration is free of charge. Extended functions are only available to paying users.</span>
                            <span>(b) Price models: The current membership fees and services can be viewed on the website.</span>
                            <span>(c) Payment processing: Payment is made via the methods specified on the platform.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>6. Liability & Warranty</h3>
                            <span>(a) No guarantee for successful business: Beschaffungsmarkt Global merely provides a platform and does not guarantee the quality or reliability of the registered companies.</span>
                            <span>(b) Limitation of liability: Beschaffungsmarkt Global is only liable for gross negligence and intent. Liability for lost business or damages resulting from the use of the platform is excluded.</span>
                            <span>(c) External links: Beschaffungsmarkt Global accepts no responsibility for the content of external websites referred to by links.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>7. Data protection & Confidentiality</h3>
                            <span>E-mail: [Your e-mail address]</span>
                            <span>Telephone: [Your telephone number]</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>8. Termination & Blocking of accounts</h3>
                            <span>(a) Termination by the user: Membership can be terminated at any time in the user account.</span>
                            <span>(b) Blocking by Beschaffungsmarkt Global: In the event of violations of these GTC, the account may be temporarily or permanently blocked.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>9. Changes to the GTC</h3>
                            <span>Beschaffungsmarkt Global reserves the right to amend these GTC at any time. Users will be informed of changes in good time.</span>
                        </div>

                        <div className="d-flex flex-column align-items-start justify-content-start privacy-inner-div">
                            <h3>10. Final provisions</h3>
                            <span>(a) Applicable law: The law of the Federal Republic of Germany applies.</span>
                            <span>(b) Place of jurisdiction: The place of jurisdiction is [your company location], insofar as legally permissible.</span>
                            <span>(c) Severability clause: Should individual provisions of these GTC be invalid, the validity of the remaining provisions shall remain unaffected.</span>
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

export default Terms;