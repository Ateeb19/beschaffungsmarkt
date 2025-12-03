import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";

const Imprint = () => {
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
                                    <li className="breadcrumb-item active" aria-current="page">Imprint</li>
                                </ol>
                            </nav>

                            <div className="overview-head">
                                <h2>Mandatory Legal Disclosure</h2>
                                <p>This section provides essential legal information about our business, including company details, registration information, contact details, and responsible parties. In compliance with applicable laws, we disclose relevant corporate and regulatory details to ensure transparency and accountability.</p>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="overview-img">
                                <img src="/beschaffungsmarkt_images/imprint-CHqusJqr.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="">
                <div className="container">
                    <div className="d-flex flex-column align-items-start justify-content-start text-start imprint-inner-div py-4 px-4">
                        <h2 className="mb-5">Information according to § 5 TMG</h2>
                        <h4>Procurement Market Global</h4>
                        <span>[Your company name]</span>
                        <span>[Street & house number]</span>
                        <span>[Postcode, city]</span>
                        <span className="mb-5">[Country]</span>

                        <h4>Contact</h4>
                        <span>Phone: [Your phone number]</span>
                        <span>E-mail: [Your e-mail address]</span>
                        <span className="mb-5">Website: [Your domain]</span>

                        <h4>Represented by</h4>
                        <span>[Your name / Managing Partner]</span>
                        <span>[Register entry]</span>
                        <span>Register court: [If registered, name of the local court]</span>
                        <span>Register number: [Commercial register number]</span>
                        <span>Value added tax ID</span>
                        <span className="mb-5">Value added tax identification number according to § 27a Value Added Tax Act: [If available, enter here]</span>

                        <h3 className="mb-5">Disclaimer</h3>
                        <h2>Liability for content</h2>
                        <span>The content of our website has been created with the utmost care. However, we cannot accept any liability for the accuracy, completeness and up-to-dateness of the content. As a service provider, we are responsible for our own content on these pages in accordance with § 7 (1) TMG (German Telemedia Act) and general laws. According to §§ 8 to 10 TMG, however, we are not obliged as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.</span>

                        <span className="mb-5">Obligations to remove or block the use of information in accordance with general legislation remain unaffected by this. However, liability in this respect is only possible from the time of knowledge of a specific infringement. As soon as we become aware of such infringements, we will remove this content immediately.</span>

                         <h2>Liability for links</h2>
                        <span className="mb-5">Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of an infringement. If we become aware of any legal infringements, we will remove such links immediately.</span>

                         <h2>Copyright</h2>
                        <span>The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.</span>
                        <span>The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.</span>
                    </div>
                </div>
            </section>

            <section>
                <Footer />
            </section>
        </div>
    )
}

export default Imprint;