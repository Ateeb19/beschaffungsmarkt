import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import { FiCheckCircle } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Switch from "react-switch";
import { useAlert } from "./alert/Alert_message";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/userSlice";
import axios from "axios";

const Pricing = () => {

    const Backend_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
    };
    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    console.log('this is email-: ', data?.email);
    const handlePayment = async (plan) => {
        try {
            // You can get the user's email from localStorage, context, or your logged-in state
            const userEmail = data?.email; // Example

            if (!userEmail) {
                showAlert("Please login first to continue payment.",'warning');
                return;
            }

            const response = await axios.post(`${Backend_URL}/api/payments/create-checkout-session`, {
                email: userEmail,
                plan: plan,
                time: checked ? 'yearly':'monthly',
            });

            // Redirect user to Stripe checkout
            // window.location.href = response.data.url;
            window.open(response.data.url, "_blank");

        } catch (error) {
            console.error("Payment initiation failed:", error);
            showAlert("Payment initiation failed. Please try again.", 'danger');
        }
    };

    return (
        <div className="service-div">
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
                                    <li className="breadcrumb-item active" aria-current="page">Pricing</li>
                                </ol>
                            </nav>

                            <div className="overview-head">
                                <h2>Pricing</h2>
                                <p>Choose a plan that fits your needs. Transparent and flexible pricing designed to give you the best value. 🚀</p>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="overview-img">
                                <img src="/beschaffungsmarkt_images/pricing-D2Qwp4ed.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="pricing-wrapper w-100">
                <div className="countainer">
                    <div className="d-flex flex-column align-items-center justify-content-center w-100">
                        <div className="d-flex justify-content-center align-items-center w-100 home-2-heading text-center mt-3">
                            <span>Our Best Packages</span>
                        </div>
                        <div className="d-flex justify-content-center align-items-center w-100 home-6-title text-center mt-3">
                            <span>See below our main three plans for your business, for your startup and agency. It start from here! You can teach yourself what you really like.</span>
                        </div>
                        <div className="d-flex justify-content-center align-items-center w-100 home-6-switch gap-3 form-switch-pricing">
                            <div>Monthly</div>
                            <Switch onChange={handleChange}
                                onColor="#4097fb"
                                offColor="#e2e8f0"
                                checkedIcon={<div></div>}
                                uncheckedIcon={<div></div>}
                                handleDiameter={24}

                                checked={checked} />
                            <div className="pricing-annually-text">Annually


                                <div className="d-flex align-items-start justify-content-start pricing-offer">
                                    <img src="/Images/download.png" alt="" width="96px" className="mt-3" />
                                    <span className="mt-5 pt-1 ms-2" style={{ color: '#1e3a8a', fontWeight: '700' }}>Exclusive Offer</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center gap-5 w-100 pricing-content" >
                            <div className="d-flex flex-column align-items-start justify-content-start pric-box-free text-start gap-3">
                                <span className="price-fee">Free</span>
                                <span className="price-text">All the basics for businesses that are just getting started.</span>
                                <div className="d-flex align-items-center gap-2 price-doller"><h1>$0</h1><span >/ {checked ? 'Year' : 'Month'}</span></div>
                                <button className="price-get-box w-100" onClick={()=> navigate('/login')}>Get Free</button>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Limited for Company Website</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>3rd Priority for Listing</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Limited Messaging for Communication</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>1 Main and 1 Subcategory</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>EN for Company Language</span></span>

                                <span className="price-list-unchecked"><RxCross1 className="fs-4" style={{ color: '#ef4444' }} /> <span>Limited for Company Website </span></span>
                                <span className="price-list-unchecked"><RxCross1 className="fs-4" style={{ color: '#ef4444' }} /> <span>No Posting Opportunity </span></span>
                                <span className="price-list-unchecked"><RxCross1 className="fs-4" style={{ color: '#ef4444' }} /> <span>No Product</span></span>
                                <span className="price-list-unchecked"><RxCross1 className="fs-4" style={{ color: '#ef4444' }} /> <span>No Certificate</span></span>
                                <span className="price-list-unchecked"><RxCross1 className="fs-4" style={{ color: '#ef4444' }} /> <span>No Keyword</span></span>
                                <span className="price-list-unchecked"><RxCross1 className="fs-4" style={{ color: '#ef4444' }} /> <span>No Personal Agent</span></span>
                            </div><div className="d-flex flex-column align-items-start justify-content-start pric-box-premium text-start gap-3">
                                <span className="price-fee-premium">Premium</span>
                                <span className="price-text-premium">Better for growing businesses that want more customers.</span>
                                <div className="d-flex align-items-center gap-2 price-doller-premium"><h1>$
                                    {checked ? (
                                        <>
                                            <span className="old-price">2148</span> 1999
                                        </>
                                    ) : (
                                        "179"
                                    )}
                                </h1><span >/ {checked ? 'Year' : 'Month'}</span></div>
                                <button className="price-get-box-premium w-100" onClick={() => checked ? handlePayment(1999): handlePayment(179)} >Get Premium</button>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Full Features for Company Website</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>2nd Priority for Listing</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Unlimited Messaging for Communication</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>5 Main and 5 Subcategories</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>DE/TR/EN for Company Languages</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Full Access to Trade Platform</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Upload 10 Postings</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Upload 5 Products</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Upload 5 Certificates</span></span>
                                <span className="price-list-checked-premium"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Upload 50 Keywords</span></span>

                                <span className="price-list-unchecked-premium"><RxCross1 className="fs-4" style={{ color: '#ef4444' }} /> <span>No Personal Agent</span></span>
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-start pric-box-free text-start gap-3">
                                <span className="price-fee">Premium +</span>
                                <span className="price-text">Advanced features for pros who need more customization.</span>
                                <div className="d-flex align-items-center gap-2 price-doller"><h1>$
                                    {checked ? (
                                        <>
                                            <span className="old-price">2988</span> 2699
                                        </>
                                    ) : (
                                        "249"
                                    )}
                                </h1><span >/ {checked ? 'Year' : 'Month'}</span></div>
                                <button className="price-get-box w-100" onClick={() => checked ? handlePayment(2699): handlePayment(249)}>Get Premium +</button>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Full Features for Company Website</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>1st Priority + Sponsored for Listing</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Unlimited Messaging for Communication</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>5 Main and 5 Subcategories</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>DE/TR/EN for Company Languages</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Full Access to Trade Platform</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Upload 20 Postings</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Upload 20 Products</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Upload 20 Certificates</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Upload 100 Keywords</span></span>
                                <span className="price-list-checked"><FiCheckCircle className="fs-4" style={{ color: '#4097fb' }} /> <span>Personal Agent</span></span>
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

export default Pricing