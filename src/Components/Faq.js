import React, { useState } from "react";
import Footer from "./Footer/Footer";
import Accordion from 'react-bootstrap/Accordion';

const Faq = () => {

    const [option, setOptions] = useState('General');
    return (
        <>
            <section className="overview-wrapper text-start">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-xl-6">
                            <nav style={{
                                "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
                            }} aria-label="breadcrumb">
                                <ol className="overview-breadcrumb breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Faq</li>
                                </ol>
                            </nav>

                            <div className="overview-head">
                                <h2>Frequently Asked Questions</h2>
                                {/* <!-- <h3>There's more to international trade - and we'll show you how!</h3> --> */}
                                <p>If you have any questions or concerns, please don't hesitate to reach out to our support team. </p>
                            </div>

                        </div>
                        <div className="col-xl-6">
                            <div className="overview-img">
                                <img src="/beschaffungsmarkt_images/faq-DrMTnQFL.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="faq-wrapper py-5">
                <div className="container">
                    <div className="row gx-4 gy-4">
                        <div className="col-xl-12">
                            <div className="faq-wrap">
                                <div className="row">
                                    <div className="col-xl-3">
                                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                            <button onClick={() => setOptions('General')} className={`nav-link ${option === 'General' ? 'active-button-faq' : ''}`} id="v-pills-general-tab" data-bs-toggle="pill" data-bs-target="#v-pills-general" type="button" role="tab" aria-controls="v-pills-general" aria-selected="true">
                                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="w-5 md:w-6 h-5 md:h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 8a3 3 0 0 1 0 6"></path><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5"></path><path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8"></path></svg>
                                                General
                                            </button>
                                            <button onClick={() => setOptions('Registration')} className={`nav-link ${option === 'Registration' ? 'active-button-faq' : ''}`} id="v-pills-registration-tab" data-bs-toggle="pill" data-bs-target="#v-pills-registration" type="button" role="tab" aria-controls="v-pills-registration" aria-selected="false">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="w-5 md:w-6 h-5 md:h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path></svg>
                                                Registration and Usage
                                            </button>
                                            <button onClick={() => setOptions('Platform')} className={`nav-link ${option === 'Platform' ? 'active-button-faq' : ''}`} id="v-pills-features-tab" data-bs-toggle="pill" data-bs-target="#v-pills-features" type="button" role="tab" aria-controls="v-pills-features" aria-selected="false">
                                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="w-5 md:w-6 h-5 md:h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                Platform Features
                                            </button>
                                            <button onClick={() => setOptions('Security')} className={`nav-link ${option === 'Security' ? 'active-button-faq' : ''}`} id="v-pills-security-tab" data-bs-toggle="pill" data-bs-target="#v-pills-security" type="button" role="tab" aria-controls="v-pills-security" aria-selected="false">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-5 md:w-6 h-5 md:h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></svg>
                                                Security and Privacy
                                            </button>
                                            <button onClick={() => setOptions('Payments')} className={`nav-link ${option === 'Payments' ? 'active-button-faq' : ''}`} id="v-pills-pricing-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pricing" type="button" role="tab" aria-controls="v-pills-pricing" aria-selected="false">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="w-5 md:w-6 h-5 md:h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM512 196.7l271.1 197.2H240.9L512 196.7zM264 462h117v374H264V462zm189 0h117v374H453V462zm307 374H642V462h118v374z"></path></svg>
                                                Payments and Pricing
                                            </button>
                                            <button onClick={() => setOptions('Technical')} className={`nav-link ${option === 'Technical' ? 'active-button-faq' : ''}`} id="v-pills-support-tab" data-bs-toggle="pill" data-bs-target="#v-pills-support" type="button" role="tab" aria-controls="v-pills-support" aria-selected="false">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-5 md:w-6 h-5 md:h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"></path></svg>
                                                Technical Support
                                            </button>
                                            <button onClick={() => setOptions('Other')} className={`nav-link ${option === 'Other' ? 'active-button-faq' : ''}`} id="v-pills-other-tab" data-bs-toggle="pill" data-bs-target="#v-pills-other" type="button" role="tab" aria-controls="v-pills-other" aria-selected="false">
                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-5 md:w-6 h-5 md:h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9.5" cy="9.5" r="1.5"></circle><circle cx="14.5" cy="9.5" r="1.5"></circle><path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.897 5.515 5 6.934V22l5.34-4.004C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.671 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z"></path></svg>
                                                Other
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 text-start">
                                        {/* <!-- Tab Content --> */}
                                        <div className="tab-content flex-grow-1" id="v-pills-tabContent">

                                            {/* <!-- General Tab --> */}

                                            {option === 'General' && (
                                                <>
                                                    <div className="text-start" id="v-pills-general" role="tabpanel" aria-labelledby="v-pills-general-tab">
                                                        <div className="accordion accordion-flush" id="accordionGeneral">
                                                            <div className="accordion-item">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header><h5 className="accordion-header "> What is Procurement Market Global?</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                                Procurement Market Global is a platform that connects German and Turkish companies to facilitate trade and foster successful partnerships.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>

                                                                    <Accordion.Item eventKey="2">
                                                                        <Accordion.Header><h5 className="accordion-header "> How does the platform work?</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                                Companies can register, create profiles, list or search for products, and connect with potential business partners.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>

                                                                    <Accordion.Item eventKey="3">
                                                                        <Accordion.Header><h5 className="accordion-header "> Who can use the platform?</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                                The platform is designed for companies from all industries that are interested in German-Turkish trade relations.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}


                                            {/* <!-- Registration Tab --> */}
                                            {option === 'Registration' && (
                                                <>
                                                    <div id="v-pills-registration" role="tabpanel" aria-labelledby="v-pills-registration-tab">
                                                        <div className="accordion accordion-flush" id="accordionRegistration">
                                                            <div className="accordion-item">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header><h5 className="accordion-header "> How do I register my company?</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                                Visit our registration page, fill out the sign-up form, and confirm your email address to activate your account.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>

                                                                    <Accordion.Item eventKey="2">
                                                                        <Accordion.Header><h5 className="accordion-header "> Is registration free?</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                                Yes, the basic registration is free. However, we also offer premium packages with additional features.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>

                                                                    <Accordion.Item eventKey="3">
                                                                        <Accordion.Header><h5 className="accordion-header "> What information is required for registration?</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                                You need basic company details such as the company name, address, a valid email address, and a brief description of your products or services.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                    
                                                                    <Accordion.Item eventKey="4">
                                                                        <Accordion.Header><h5 className="accordion-header "> Can I upgrade my account later?</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                                Yes, you can upgrade from a free account to a premium package at any time to access additional features.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                    
                                                                    <Accordion.Item eventKey="5">
                                                                        <Accordion.Header><h5 className="accordion-header "> How can I delete my account?</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                                You can deactivate your account in the profile settings or contact us directly via the support center.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                    
                                                                </Accordion>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}


                                            {/* <!-- Features Tab --> */}
                                            {option === 'Platform' && (
                                                <>
                                                    <div className="" id="v-pills-features" role="tabpanel" aria-labelledby="v-pills-features-tab">
                                                        <div className="accordion accordion-flush" id="accordionFeatures">
                                                            <div className="accordion-item">                                                                
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header><h5 className="accordion-header "> Platform Features</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                               Features include advanced search, messaging, document sharing, and partner recommendations.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>                                                                    
                                                                </Accordion>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}


                                            {/* <!-- Security Tab --> */}
                                            {option === 'Security' && (
                                                <>
                                                    <div className="" id="v-pills-security" role="tabpanel" aria-labelledby="v-pills-security-tab">
                                                        <div className="accordion accordion-flush" id="accordionSecurity">
                                                            <div className="accordion-item">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header><h5 className="accordion-header "> Security and Privacy</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                              We use encrypted connections and secure authentication to protect user data.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>                                                                    
                                                                </Accordion>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}


                                            {/* <!-- Pricing Tab --> */}
                                            {option === 'Payments' && (
                                                <>
                                                    <div className="" id="v-pills-pricing" role="tabpanel" aria-labelledby="v-pills-pricing-tab">
                                                        <div className="accordion accordion-flush" id="accordionPricing">
                                                            <div className="accordion-item">
                                                               <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header><h5 className="accordion-header "> Payments and Pricing</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                               Different subscription plans are available depending on company size and requirements.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>                                                                    
                                                                </Accordion>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}


                                            {/* <!-- Support Tab --> */}
                                            {option === 'Technical' && (
                                                <>
                                                    <div className="" id="v-pills-support" role="tabpanel" aria-labelledby="v-pills-support-tab">
                                                        <div className="accordion accordion-flush" id="accordionSupport">
                                                            <div className="accordion-item">
                                                                <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header><h5 className="accordion-header "> Technical Support</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                               Support is available via email and live chat for all registered companies.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>                                                                    
                                                                </Accordion>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}


                                            {/* <!-- Other Tab --> */}
                                            {option === 'Other' && (
                                                <>
                                                    <div className="" id="v-pills-other" role="tabpanel" aria-labelledby="v-pills-other-tab">
                                                        <div className="accordion accordion-flush" id="accordionOther">
                                                            <div className="accordion-item">
                                                             <Accordion>
                                                                    <Accordion.Item eventKey="0">
                                                                        <Accordion.Header><h5 className="accordion-header "> Other</h5></Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="accordion-body">
                                                                              If you have questions not covered in this section, please contact our support team.
                                                                            </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>                                                                    
                                                                </Accordion>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}


                                        </div>
                                        {/* <!-- /tab-content --> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section classNameName="footer-section w-100">
                <Footer />
            </section>
        </>
    )
}

export default Faq;