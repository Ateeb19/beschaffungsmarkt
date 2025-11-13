// import React from "react";
// import Footer from "../Footer/Footer";

// const Register = () => {

//     return (
//         <div className="service-div">
//             <section className="signup-wrapper text-start">
//                 <div className="container">
//                     <div className="row gx-5 gy-4">
//                         <div className="col-xl-6 col-12 order-2 order-xl-1">
//                             <div className="signup-img-wrap">
//                                 <img src="/beschaffungsmarkt_images/login-hh9Io-kp.png" alt="signup-img"/>
//                             </div>
//                         </div>
//                         <div className="col-xl-6 col-12 order-1 order-xl-2">
//                             <div className="signup-content-wrap shadow">
//                                 <h2>Register to Procurement Market</h2>
//                                 <p>Already have an account? <a href="#">Login</a></p>
//                                 <form action="#">
//                                     <div className="row gy-4">
//                                         <div className="col-xl-6">
//                                             <div className="form-group">
//                                                 <label for="f_name">First Name</label>
//                                                 <input type="text" className="form-control" id="f_name" aria-describedby="firstname" placeholder="Enter your first name"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-6">
//                                             <div className="form-group">
//                                                 <label for="l_name">Last Name</label>
//                                                 <input type="text" className="form-control" id="l_name" aria-describedby="lastname" placeholder="Enter your last name"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-12">
//                                             <div className="form-group">
//                                                 <label for="c_name">Company Name</label>
//                                                 <input type="text" className="form-control" id="c_name" aria-describedby="companyname" placeholder="Enter your company name"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-6">
//                                             <div className="form-group">
//                                                 <label for="country">Country</label>
//                                                 <select name="country" id="">
//                                                     <option value="germany">Germany</option>
//                                                     <option value="turkey">Turkey</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-6">
//                                             <div className="form-group">
//                                                 <label for="street_address">Street & Street Nr</label>
//                                                 <input type="text" className="form-control" id="street_address" aria-describedby="streetaddress" placeholder="Enter your street address"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-6">
//                                             <div className="form-group">
//                                                 <label for="zip_code">ZIP Code</label>
//                                                 <input type="text" className="form-control" id="zip_code" aria-describedby="zipcode" placeholder="Enter your zip code"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-6">
//                                             <div className="form-group">
//                                                 <label for="email_id">Email address</label>
//                                                 <input type="email" className="form-control" id="email_id" aria-describedby="email" placeholder="Enter your email"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-6">
//                                             <div className="form-group">
//                                                 <label for="password">Password</label>
//                                                 <input type="password" className="form-control" id="password" placeholder="Enter your password"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-6">
//                                             <div className="form-group">
//                                                 <label for="c_password">Confirm Password</label>
//                                                 <input type="password" className="form-control" id="c_password" placeholder="Confirm your password"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-xl-12">
//                                             <div className="form-group form-check">
//                                                 <input type="checkbox" className="form-check-input" id="t_c"/>
//                                                     <label className="form-check-label" for="t_c">I agree to the <a href="#">terms of service</a></label>
//                                             </div>
//                                             <button type="submit" className="btn-signup btn btn-primary">Sign Up</button>
//                                         </div>
//                                     </div>

//                                 </form>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </section>
//             <section className="footer-section w-100">
//                 <Footer />
//             </section>
//         </div>
//     )
// }

// export default Register;

import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { useAlert } from "./alert/Alert_message";
import Switch from "react-switch";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";


const Register = () => {
    const { showAlert } = useAlert();
    const [cityOptions, setCityOptions] = useState([]);
    const Backend_URL = process.env.REACT_APP_API_URL;
    const { executeRecaptcha } = useGoogleReCaptcha();

    const navigate = useNavigate();
    const [show_checked, setShow_checked] = useState(false);
    const handle_switch_change = () => {
        setShow_checked(!show_checked);
    }
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "",
        city: "",
        street: "",
        zipcode: "",
        email: "",
        password: "",
        confirmPassword: "",
        // recaptchaToken: "test-token" // for now you can hardcode, later integrate real reCAPTCHA
    });

    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            setTimeout(() => handleSubmit(e), 500);
            console.log("Recaptcha not yet available");
            return;
        }

        // Run recaptcha v3
        const token = await executeRecaptcha("register");

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post(`${Backend_URL}/api/auth/register`, {
                ...formData,
                 recaptchaToken: token,
            });
            showAlert(res.data.msg, "success");
            navigate('/login');
            setErrors({});
        } catch (err) {
            if (err.response && err.response.data) {
                const errorData = err.response.data;

                if (errorData.msg) {
                    showAlert(
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <MdError style={{ color: '#e74c3c', fontSize: '20px' }} />
                            {errorData.msg}
                        </span>, "error");
                } else if (typeof errorData === "object") {
                    setErrors(errorData);
                    setMessage("");
                } else {
                    showAlert(
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <MdError style={{ color: '#e74c3c', fontSize: '20px' }} />
                            {errorData}
                        </span>, "error");
                }
            } else {
                showAlert("Server error, please try again.", "error");
            }
        }

    };

    useEffect(() => {
        if (formData.country) {
            const countryCode =
                formData.country === "Germany" ? "DE" : formData.country === "Turkey" ? "TR" : "";

            if (!countryCode) return;

            axios
                .get(`https://api.countrystatecity.in/v1/countries/${countryCode}/cities`, {
                    headers: {
                        "X-CSCAPI-KEY": "a1hSc1BTUGlyQk5PWmx6eWtuSDMxOG50OGNHZGdoTXl2TGx3SXRBYw==",
                    },
                })
                .then((res) => {
                    setCityOptions(
                        res.data.map((c) => ({ value: c.name, label: c.name }))
                    );
                })
                .catch((err) => console.log("Error fetching cities:", err));
        }
    }, [formData.country]);

    return (
        <div className="service-div">
            <section className="signup-wrapper text-start">
                <div className="container">
                    <div className="row gx-5 gy-4">
                        <div className="col-xl-6 col-12 order-2 order-xl-1">
                            <div className="signup-img-wrap">
                                <img
                                    src="/beschaffungsmarkt_images/login-hh9Io-kp.png"
                                    alt="signup-img"
                                />
                            </div>
                        </div>
                        <div className="col-xl-6 col-12 order-1 order-xl-2">
                            <div className="signup-content-wrap shadow">
                                <h2>Register to Procurement Market</h2>
                                <p>
                                    Already have an account? <a href="#" onClick={() => navigate('/login')}>Sign In</a>
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <div className="row gy-4">
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                                    id="firstName"
                                                    placeholder="Enter your first name"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                />
                                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                                    id="lastName"
                                                    placeholder="Enter your last name"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                />
                                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <label htmlFor="companyName">Company Name</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                                                    id="companyName"
                                                    placeholder="Enter your company name"
                                                    value={formData.companyName}
                                                    onChange={handleChange}
                                                />
                                                {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <label htmlFor="country">Country</label>
                                                <select
                                                    name="country"
                                                    id="country"
                                                    className={`form-control ${errors.country ? "is-invalid" : ""}`}
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Germany">Germany</option>
                                                    <option value="Turkey">Turkey</option>
                                                </select>
                                                {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            {formData.country && (
                                                <div className="form-group">
                                                    <label htmlFor="city">City</label>
                                                    <select
                                                        name="city"
                                                        id="city"
                                                        className={`form-control ${errors.city ? "is-invalid" : ""}`}
                                                        value={formData.city || ""}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select City</option>
                                                        {cityOptions.map((c, index) => (
                                                            <option key={index} value={c.value}>
                                                                {c.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="street">Street & Street Nr</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.street ? "is-invalid" : ""}`}
                                                    id="street"
                                                    placeholder="Enter your street address"
                                                    value={formData.street}
                                                    onChange={handleChange}
                                                />
                                                {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="zipcode">ZIP Code</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
                                                    id="zipcode"
                                                    placeholder="Enter your zip code"
                                                    value={formData.zipcode}
                                                    onChange={handleChange}
                                                />
                                                {errors.zipcode && <div className="invalid-feedback">{errors.zipcode}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="email">Email address</label>
                                                <input
                                                    type="email"
                                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                    id="email"
                                                    placeholder="Enter your email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <div className="d-flex flex-row align-items-start justify-content-between w-100">
                                                    <div>
                                                        <label htmlFor="c_name">Password</label>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center justify-content-center gap-2">
                                                        <Switch onChange={handle_switch_change}
                                                            onColor="#4097fb"
                                                            offColor="#777777ff"
                                                            checkedIcon={<div></div>}
                                                            uncheckedIcon={<div></div>}
                                                            handleDiameter={15}
                                                            height={20}
                                                            width={44}
                                                            checked={show_checked} />
                                                        {/* <span>Show password</span> */}
                                                    </div>
                                                </div>
                                                <input
                                                    type={show_checked ? 'text' : 'password'}
                                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                    id="password"
                                                    placeholder="Enter your password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className={`form-control ${message === "Passwords do not match!" ? "is-invalid" : ""}`}
                                                    id="confirmPassword"
                                                    placeholder="Confirm your password"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                />
                                                {message === "Passwords do not match!" && (
                                                    <div className="invalid-feedback">Passwords do not match!</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="form-group form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={checked}
                                                    onChange={(e) => setChecked(!checked)}
                                                    id="t_c"
                                                />
                                                <label className="form-check-label" htmlFor="t_c">
                                                    I agree to the <a href="#" onClick={() => navigate('/terms-of-service')}>terms of service</a>
                                                </label>
                                            </div>
                                            <button type="submit" disabled={!checked} className="btn-signup btn btn-primary">
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="footer-section w-100">
                <Footer />
            </section>
        </div>
    );
};

export default Register;
