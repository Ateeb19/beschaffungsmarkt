import React from "react";

const Register = () => {

    return (
        <div>
            <section className="signup-wrapper text-start">
                <div className="container">
                    <div className="row gx-5 gy-4">
                        <div className="col-xl-6 col-12 order-2 order-xl-1">
                            <div className="signup-img-wrap">
                                <img src="/beschaffungsmarkt_images/login-hh9Io-kp.png" alt="signup-img"/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-12 order-1 order-xl-2">
                            <div className="signup-content-wrap shadow">
                                <h2>Register to Procurement Market</h2>
                                <p>Already have an account? <a href="#">Login</a></p>
                                <form action="#">
                                    <div className="row gy-4">
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label for="f_name">First Name</label>
                                                <input type="text" className="form-control" id="f_name" aria-describedby="firstname" placeholder="Enter your first name"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label for="l_name">Last Name</label>
                                                <input type="text" className="form-control" id="l_name" aria-describedby="lastname" placeholder="Enter your last name"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <label for="c_name">Company Name</label>
                                                <input type="text" className="form-control" id="c_name" aria-describedby="companyname" placeholder="Enter your company name"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label for="country">Country</label>
                                                <select name="country" id="">
                                                    <option value="germany">Germany</option>
                                                    <option value="turkey">Turkey</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label for="street_address">Street & Street Nr</label>
                                                <input type="text" className="form-control" id="street_address" aria-describedby="streetaddress" placeholder="Enter your street address"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label for="zip_code">ZIP Code</label>
                                                <input type="text" className="form-control" id="zip_code" aria-describedby="zipcode" placeholder="Enter your zip code"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label for="email_id">Email address</label>
                                                <input type="email" className="form-control" id="email_id" aria-describedby="email" placeholder="Enter your email"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label for="password">Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Enter your password"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group">
                                                <label for="c_password">Confirm Password</label>
                                                <input type="password" className="form-control" id="c_password" placeholder="Confirm your password"/>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="t_c"/>
                                                    <label className="form-check-label" for="t_c">I agree to the <a href="#">terms of service</a></label>
                                            </div>
                                            <button type="submit" className="btn-signup btn btn-primary">Sign Up</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default Register;