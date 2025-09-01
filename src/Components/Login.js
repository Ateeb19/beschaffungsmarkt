import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Switch from "react-switch";

const Login = () => {
    const navigate = useNavigate();
    const [show_checked, setShow_checked] = useState(false);
    const handle_switch_change = () => {
        setShow_checked(!show_checked);
    }
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
                                <form action="#">
                                    <div className="row gy-4">
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <label for="f_name">Email</label>
                                                <input type="email" className="form-control" id="f_name" aria-describedby="firstname" placeholder="Email" />
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
                                                <input type={show_checked ? 'text' : 'password'}  className="form-control" id="c_name" aria-describedby="companyname" placeholder="Password" />
                                                <span style={{ color: '#2563eb' }}>Forgot Password?</span>
                                            </div>
                                        </div>


                                        <div className="col-xl-12">

                                            <button type="submit" className="btn-signup btn btn-primary">Sign in</button>
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