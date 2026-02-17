import React, { useState } from "react";
import Footer from "./Footer/Footer";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { useAlert } from "./alert/Alert_message";
import axios from "axios";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Forgot_password = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [email_send, setEmail_send] = useState(false);
    const { showAlert } = useAlert();
    const Backend_URL = process.env.REACT_APP_API_URL;

    const validateEmail = (value) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value);
    };

    const handleContinue = async () => {
        if (!email.trim()) {
            setError("Your email is required.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const res = await axios.post(`${Backend_URL}/api/auth/forgot-password`, {
                email: email
            })

            if (res.data.status) {
                setEmail_send(true);
                showAlert(<div className="d-flex align-items-center justify-content-start gap-1">
                    <IoIosCheckmarkCircle className="text-success fs-1" />
                    {res.data.msg}
                </div>, 'success');
            }

        } catch (e) {
            const errorMessage =
                e.response?.data?.msg ||
                e.response?.data?.error ||
                e.message ||
                "Something went wrong";

            showAlert(
                <div className="d-flex align-items-center justify-content-start gap-1">
                    <MdError className="text-danger fs-3" />
                    {errorMessage}
                </div>,
                "danger"
            );
        }
        setError("");
    };

    return (
        <div className="">
            <div className="container">
                <div className="d-flex flex-column align-items-center justify-content-center w-100">
                    <div className="forget-password d-flex flex-column align-items-center justify-content-center">

                        {email_send ? (
                            <>
                                <div className="d-flex align-items-center justify-content-center w-100 mb-3">
                                    <img src="/Images/email_send.png" loading = "lazy" className="" />
                                </div>

                                <h1>Email Verification</h1>
                                <p>
                                    We have sent you email to verify. Please check your email. <br />
                                    Once verified, you will be able to continue.
                                </p>
                            </>
                        ) : <>
                            <h1>Reset Your Password</h1>
                            <p>Please enter your email address.</p>

                            <div className="forget-email d-flex flex-column align-items-start justify-content-start w-100">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    className={`form-control ${error ? "border-danger" : ""}`}
                                    id="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    required
                                />

                                {error && (
                                    <small className="text-danger mt-1 fst-italic">
                                        {error}
                                    </small>
                                )}
                            </div>
                        </>}

                        <div className="forget-button d-flex flex-column align-items-center justify-content-center w-100">
                            <button
                                className="w-100 das-button-end save-button"
                                onClick={handleContinue}
                            >
                                {email_send ? <>
                                    Resend
                                </> : <>
                                    Continue
                                </>}
                            </button>

                            <button
                                className="das-button-end cancel-button-forget"
                                onClick={() => navigate('/login')}
                            >
                                {email_send ? <>
                                    <span className="text-primary">Login</span>
                                </> : <>
                                    Cancel
                                </>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Forgot_password;
