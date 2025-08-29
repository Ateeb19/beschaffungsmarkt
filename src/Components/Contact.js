import React from "react";
import "../Assets/css/style.css";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
const Contact = () => {

    const navigate = useNavigate();
    return (
        <div className="service-div">
            <section className="overview-wrapper text-start">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-xl-6">

                            <nav
                                style={{
                                    "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
                                }}
                                aria-label="breadcrumb"
                            >
                                <ol className="overview-breadcrumb breadcrumb">
                                    <li className="breadcrumb-item" onClick={() => { navigate('/') }}><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Contact</li>
                                </ol>
                            </nav>
                            
                            <div className="overview-head">
                                <h2>Get in Touch with Us</h2>
                                {/* <!-- <h3>There's more to international trade - and we'll show you how!</h3> -->
                                <!-- <p>Join a team that values creativity, passion, and excellence. Whether you're an experienced professional or just starting your career, we offer opportunities to learn, develop, and make a real impact. Explore our open positions and take the next step toward a rewarding future with us.</p> --> */}
                            </div>

                        </div>
                        <div className="col-xl-6">
                            <div className="overview-img">
                                <img src="/beschaffungsmarkt_images/contact-DmV-QMLV.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="contact-wrapper text-start">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="contact-wrap shadow">
                                <div className="contact-head">
                                    <h2>Contact Support for Questions and Assistance</h2>
                                    <p>Use this form to submit your questions or issues related to our services or your account. Our support team will respond within 24 hours to assist you. Please ensure all mandatory fields are filled out for a smooth process</p>

                                    <form action="#">
                                        <div className="row gy-4">
                                            <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label for="full_name">Full Name</label>
                                                    <input type="text" className="form-control" id="full_name" aria-describedby="fullname" placeholder="Enter your full name" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label for="email_id">Email address</label>
                                                    <input type="email" className="form-control" id="email_id" aria-describedby="email" placeholder="Enter your email id" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label for="contact_number">Contact Number</label>
                                                    <input type="number" className="form-control" id="contact_number" aria-describedby="contact_number" placeholder="Enter your contact number" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label for="enquiry">Subject of Inquiry</label>
                                                    <select name="enquiry" id="">
                                                        <option value="0" selected disabled>Select the type</option>
                                                        <option value="1">General Question</option>
                                                        <option value="2">Account Issue</option>
                                                        <option value="2">Payment Enquiry</option>
                                                        <option value="2">Technical Issue</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-xl-12 d-flex flex-column">
                                                <div className="form-group">
                                                    <label >Message</label>
                                                    <textarea className="w-100 form-control text-area-input" name="message" id="msg" cols="30" rows="4" placeholder="Type your message here . . ."></textarea>
                                                </div>
                                            </div>

                                            <div className="col-xl-12">
                                                <div className="form-group">
                                                    <label for="file_upload">File Upload</label>
                                                    <input type="file" className="form-control" id="file_upload" />
                                                </div>
                                            </div>

                                            <div className="col-xl-12">
                                                <button type="submit" className="btn-signup btn btn-primary">Submit</button>
                                            </div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            <section className="contact-info-wrap">
                <div className="container">
                    <div className="row gx-4 gy-4">
                        <div className="col-xl-4">
                            <div className="contact-info shadow">
                                <div className="contact-icon">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-16 h-16 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                                </div>
                                <div className="contact-info-detail">
                                    <h4>Chat to Sales</h4>
                                    <p>Speak to our friendly team</p>
                                    <a href="mailto:info@beschaffungsmarkt.com">info@beschaffungsmarkt.com</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="contact-info shadow">
                                <div className="contact-icon">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-16 h-16 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
                                </div>
                                <div className="contact-info-detail">
                                    <h4>Call Us</h4>
                                    <p>Mon - Fri (9.00 am to 6.00pm)</p>
                                    <a href="tel:+49 69 1234 5678">+49 69 1234 5678</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="contact-info shadow">
                                <div className="contact-icon">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-16 h-16 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path></svg>
                                </div>
                                <div className="contact-info-detail">
                                    <h4>Visit Us</h4>
                                    <p>Visit our office HQ</p>
                                    <a href="#">View on Google Maps</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="footer-section w-100">
                <Footer />
            </section>
        </div>
    )
}

export default Contact;