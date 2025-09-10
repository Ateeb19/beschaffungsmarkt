import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Switch from "react-switch";
import axios from "axios";
import { useAlert } from "./alert/Alert_message";
import { MdError } from "react-icons/md";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../redux/userSlice";


const Login = () => {
    const navigate = useNavigate();
    const [show_checked, setShow_checked] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const dispatch = useDispatch();

    const handle_switch_change = () => {
        setShow_checked(!show_checked);
    }
    const { showAlert } = useAlert();
    const url = process.env.REACT_APP_API_URL;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        recaptchaToken: '',
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        if (!executeRecaptcha) {
            setTimeout(() => handleSubmit(e), 500);
            console.log("Recaptcha not yet available");
            return;
        }

        // Run recaptcha v3
        const token = await executeRecaptcha("login");

        try {
            const res = await axios.post(`${url}/auth/login`, {
                ...formData,
                recaptchaToken: token,
            }, {
                withCredentials: true, // so cookies are saved
            });

            console.log("this is res-: ", res);

            if (res.data.status) {
                showAlert(res.data.msg, "success");
                localStorage.setItem('procurement_token', res.data.token);
                dispatch(fetchUserInfo());
                navigate("/"); // redirect to homepage or dashboard
            } else {
                showAlert(
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <MdError style={{ color: "#e74c3c", fontSize: "20px" }} />
                        {res.data.msg || "Login failed"}
                    </span>,
                    "error"
                );
            }
        } catch (err) {
            if (err.response && err.response.data) {
                const errorData = err.response.data;

                if (errorData.msg) {
                    showAlert(
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <MdError style={{ color: "#e74c3c", fontSize: "20px" }} />
                            {errorData.msg}
                        </span>,
                        "error"
                    );
                } else {
                    showAlert(
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <MdError style={{ color: "#e74c3c", fontSize: "20px" }} />
                            {JSON.stringify(errorData)}
                        </span>,
                        "error"
                    );
                }
            } else {
                showAlert(
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <MdError style={{ color: "#e74c3c", fontSize: "20px" }} />
                        Server error, please try again.
                    </span>,
                    "error"
                );
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <section className="signup-wrapper text-start">
                <div className="container">
                    <div className="row gx-5 gy-4">
                        <div className="col-xl-6 col-12 order-2 order-xl-1">
                            <div className="signup-img-wrap">
                                <img src="/beschaffungsmarkt_images/login-hh9Io-kp.png" alt="signup-img" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-12 order-1 order-xl-2">
                            <div className="signup-content-wrap shadow">
                                <h2>Sign in to Procurement Market</h2>
                                <p>Don't have an acount yet?  <a href="#" onClick={() => { navigate('/register') }}>Create an account</a></p>
                                <form action="#" onSubmit={handleSubmit}>
                                    <div className="row gy-4">
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <label for="f_name">Email</label>
                                                <input type="email" className="form-control" id="email" aria-describedby="firstname" placeholder="Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <div className="d-flex flex-row align-items-start justify-content-between w-100">
                                                    <div>
                                                        <label for="c_name">Password</label>
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
                                                        <span>Show password</span>
                                                    </div>
                                                </div>
                                                <input type={show_checked ? 'text' : 'password'} className="form-control" id="password"
                                                    aria-describedby="companyname" placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required />
                                                <span style={{ color: '#2563eb' }}>Forgot Password?</span>
                                            </div>
                                        </div>


                                        <div className="col-xl-12">

                                            <button type="submit"
                                                className="btn-signup btn btn-primary"
                                                disabled={loading}
                                            >Sign in</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section>
                <Footer />
            </section>
        </>
    )
}

export default Login;