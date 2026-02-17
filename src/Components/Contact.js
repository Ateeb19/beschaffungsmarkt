import React, { useState } from "react";
import "../Assets/css/style.css";
import Footer from "./Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./alert/Alert_message";
import { FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Contact = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        subject: "",
        title: "",
        description: "",
    });

    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            if (!executeRecaptcha) {
                setLoading(false);
                return;
            }

            // ✅ Generate reCAPTCHA v3 token
            const token = await executeRecaptcha("feedback_form");

            const data = new FormData();
            data.append("name", formData.name);
            data.append("phoneNumber", formData.phoneNumber);
            data.append("email", formData.email);
            data.append("subject", formData.subject);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("recaptchaToken", token);

            if (file) {
                data.append("file", file);
            }

            const res = await axios.post(
                `${Backend_URL}/api/feedbacks/send`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            showAlert(<>
                <IoMdCheckmarkCircle className="me-2 fs-2 text-success" />
                {res.data.msg}
            </>,
                "success")

            setFormData({
                name: "",
                phoneNumber: "",
                email: "",
                subject: "",
                title: "",
                description: "",
            });
            setFile(null);

        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrors(err.response.data);   // 🔥 THIS LINE FIXES EVERYTHING
            } else {
                showAlert(
                    <>
                        <FaExclamationTriangle className="me-2 fs-2 text-warning" />
                        {"An unexpected error occurred while submitting form"}
                    </>,
                    "danger"
                );
            }

            // if (err.response && err.response.data) {
            //     // setErrors(err.response.data);
            //     showAlert(
            //         <>
            //             <FaExclamationTriangle className="me-2 fs-2 text-warning" />
            //             {err.response.data || "An unexpected error occurred while sumbiting form"}
            //         </>,
            //         "danger"
            //     );
            // }
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\+?[0-9]{7,15}$/;
        return phoneRegex.test(phone);
    };

    // const handle_form_sumbit = async (e) => {
    //     e.preventDefault();

    //     const form = e.target;
    //     const newErrors = {};


    //     const name = form.full_name.value.trim();
    //     const email = form.email_id.value.trim();
    //     const phone = form.contact_number.value.trim();
    //     const subject = form.enquiry.value;
    //     const message = form.msg.value.trim();


    //     if (!name) newErrors.full_name = "Your name is required!";

    //     if (!email) {
    //         newErrors.email_id = "Your email is required!";
    //     } else if (!validateEmail(email)) {
    //         newErrors.email_id = "Please enter a valid email address!";
    //     }

    //     if (!phone) {
    //         newErrors.contact_number = "Your phone number is required!";
    //     } else if (!validatePhone(phone)) {
    //         newErrors.contact_number = "Please enter a valid phone number!";
    //     }

    //     if (subject === '0') newErrors.enquiry = "Please select a subject!";

    //     if (!message) newErrors.msg = "Message is required!";

    //     setErrors(newErrors);

    //     if (Object.keys(newErrors).length > 0) return;


    //     const formData = new FormData();
    //     formData.append("name", form.full_name.value);
    //     formData.append("email", form.email_id.value);
    //     formData.append("phoneNumber", form.contact_number.value);
    //     formData.append("subject", form.enquiry.value);
    //     formData.append("description", form.msg.value);

    //     // file
    //     if (form.file_upload.files.length > 0) {
    //         formData.append("file", form.file_upload.files[0]);
    //     }

    //     try {
    //         const res = await axios.post(
    //             `${Backend_URL}/api/feedbacks/send`,
    //             formData
    //         );

    //         console.log("Success:", res.data);
    //         showAlert(<>
    //             <IoMdCheckmarkCircle className="me-2 fs-2 text-success" />
    //             {res.data.msg}
    //         </>,
    //             "success")

    //         form.reset();
    //     } catch (err) {
    //         console.error(err);
    //         const backendMsg = err.response?.data?.msg;
    //         showAlert(
    //             <>
    //                 <FaExclamationTriangle className="me-2 fs-2 text-warning" />
    //                 {backendMsg || "An unexpected error occurred while sumbiting form"}
    //             </>,
    //             "danger"
    //         );
    //     }
    // }
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
                                <img src="/beschaffungsmarkt_images/contact-DmV-QMLV.png" alt="overview-img" loading="lazy" />
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

                                    <form action="#" onSubmit={handleSubmit}>
                                        <div className="row gy-4">
                                            <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label for="name">Full Name</label>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        className={`form-control ${errors.name ? "border-danger" : ""}`}
                                                        id="name"
                                                        aria-describedby="fullname"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your full name" />
                                                    {errors.name && <small className="text-danger fst-italic">{errors.name}</small>}
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label for="email">Email address</label>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        className={`form-control ${errors.email ? "border-danger" : ""}`}
                                                        id="email"
                                                        aria-describedby="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your email id" />
                                                    {errors.email && <small className="text-danger fst-italic">{errors.email}</small>}
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label for="phoneNumber">Contact Number</label>
                                                    <input
                                                        name="phoneNumber"
                                                        type="text"
                                                        className={`form-control ${errors.phoneNumber ? "border-danger" : ""}`}
                                                        id="phoneNumber"
                                                        aria-describedby="phoneNumber"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        placeholder="Enter your contact number" />
                                                    {errors.phoneNumber && <small className="text-danger fst-italic">{errors.phoneNumber}</small>}
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="form-group">
                                                    <label for="subject">Subject of Inquiry</label>
                                                    {/* <select
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        className={`form-control ${errors.subject ? "border-danger" : ""}`}
                                                        id="">
                                                        <option value="0" selected disabled>Select the type</option>
                                                        <option value="General Question">General Question</option>
                                                        <option value="Account Issue">Account Issue</option>
                                                        <option value="Payment Enquiry">Payment Enquiry</option>
                                                        <option value="Technical Issue">Technical Issue</option>
                                                    </select> */}
                                                    <select
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        className={`form-control ${errors.subject ? "border-danger" : ""}`}
                                                    >
                                                        <option value="" disabled>
                                                            Select the type
                                                        </option>
                                                        <option value="General Question">General Question</option>
                                                        <option value="Account Issue">Account Issue</option>
                                                        <option value="Payment Enquiry">Payment Enquiry</option>
                                                        <option value="Technical Issue">Technical Issue</option>
                                                    </select>

                                                    {errors.subject && <small className="text-danger fst-italic">{errors.subject}</small>}
                                                </div>
                                            </div>
                                            <div className="col-xl-12 d-flex flex-column">
                                                <div className="form-group">
                                                    <label for="title">Title</label>
                                                    <input
                                                        name="title"
                                                        type="text"
                                                        className={`form-control ${errors.title ? "border-danger" : ""}`}
                                                        id="title"
                                                        aria-describedby="title"
                                                        value={formData.title}
                                                        onChange={handleChange}
                                                        placeholder="Enter your title" />
                                                    {errors.title && <small className="text-danger fst-italic">{errors.title}</small>}
                                                </div>
                                            </div>
                                            <div className="col-xl-12 d-flex flex-column">
                                                <div className="form-group">
                                                    <label >Message</label>
                                                    <textarea
                                                        name="description"
                                                        className={`w-100 form-control text-area-input ${errors.description ? "border-danger" : ""}`}
                                                        id="description"
                                                        cols="30"
                                                        rows="4"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        placeholder="Type your message here . . ."></textarea>
                                                    {errors.description && <small className="text-danger fst-italic">{errors.description}</small>}
                                                </div>
                                            </div>

                                            <div className="col-xl-12">
                                                <div className="form-group">
                                                    <label for="file_upload">File Upload</label>
                                                    <input name="file_upload" onChange={handleFileChange} type="file" className="form-control" id="file_upload" />
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