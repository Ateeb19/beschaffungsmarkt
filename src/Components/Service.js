import React from "react";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Service = () => {
    const navigate = useNavigate();
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
                                    <li className="breadcrumb-item" onClick={() => {navigate('/')}}><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Services</li>
                                </ol>
                            </nav>

                            <div className="overview-head">
                                <h2>Our Services</h2>
                                <h3>There's more to international trade - and we'll show you how!</h3>
                                <p>With Beschaffungsmarkt Global, we offer a platform that connects German and Turkish companies in a completely new way. Our aim is to open up new growth prospects for you through efficient and secure trading opportunities. Here's what we can do for you</p>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="overview-img">
                                <img src="/beschaffungsmarkt_images/service-BxF0F7R8.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="service-box-wrapper ">
                <div className="container text-start">
                    <div className="row gy-4">
                        <div className="col-xl-4">
                            <div className="service-box h-100">
                                <div className="service-icon">
                                    <div className="icon-bg">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="w-7 h-7" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-68 304H48V48h320v416zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2z"></path></svg>
                                    </div>

                                    <div className="service-icon-head">
                                        <h2>Business Directory</h2>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3>Connecting Verified Companies</h3>
                                    <p>We provide an extensive, verified directory of German and Turkish companies, allowing you to easily connect with reliable suppliers and business partners.</p>
                                    <ul>
                                        <li>Browse and filter by industry, location, and language.</li>
                                        <li>Expand your network and find the perfect match for your business needs.</li>
                                        <li>Connect directly with potential partners.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="service-box h-100">
                                <div className="service-icon">
                                    <div className="icon-bg">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="w-7 h-7" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"></path></svg>
                                    </div>

                                    <div className="service-icon-head">
                                        <h2>Product Listings</h2>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3>Showcase and Discover Products</h3>
                                    <p>Our platform makes it easy for businesses to list their products and services, enabling you to explore a wide range of offerings from other companies.</p>
                                    <ul>
                                        <li>Upload and display products with detailed descriptions and images.</li>
                                        <li>Gain visibility to a global audience of buyers and sellers.</li>
                                        <li>Manage inquiries and communicate directly with potential customers.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="service-box h-100">
                                <div className="service-icon">
                                    <div className="icon-bg">
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-7 h-7" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"></path></svg>
                                    </div>

                                    <div className="service-icon-head">
                                        <h2>Messaging & Communication</h2>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3>Stay Connected with Your Partners</h3>
                                    <p>Our messaging feature allows seamless communication between buyers and sellers, helping you stay in touch and manage inquiries effortlessly.</p>
                                    <ul>
                                        <li>Unlimited communication with premium membership.</li>
                                        <li>Secure and encrypted messaging.</li>
                                        <li>Receive instant notifications for updates and messages.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service-description-wrapper">
                <div className="container text-start">
                    <div className="row gy-4">
                        <div className="col-xl-6">
                            <div className="service-desc-wrap">
                                <div className="d-flex flex-column align-items-start justify-content-start">
                                    <div className="home-2-head">
                                        <span>Business Directory</span>
                                    </div>
                                </div>
                                <div className="serv-desc-content">
                                    <h3>Find trustworthy business partners</h3>
                                    <p>Our Business Directory offers you an extensive database of verified German and Turkish companies. Whether you are looking for suppliers, manufacturers or cooperation partners here you can find suitable companies and contact them directly.</p>
                                    <ul>
                                        <li>Targeted search: Filter companies by industry, location and company size.</li>
                                        <li>Verified partners: Benefit from verified company profiles for secure collaboration.</li>
                                        <li>Direct networking: Get in touch with potential partners quickly and easily.</li>
                                    </ul>
                                    <div className="serch-btn mt-2">
                                        <button>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="service-desc-img">
                                <img src="/beschaffungsmarkt_images/trustworthy business partners.png" alt="trustworthy business partners" />
                            </div>
                        </div>
                    </div>

                    <div className="serv-wrap">
                        <div className="row gy-4">
                            <div className="col-xl-6 col-12 order-2 order-xl-1">
                                <div className="service-desc-img-2">
                                    <img src="/beschaffungsmarkt_images/Present and discover products.png" alt="trustworthy business partners" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-12 order-1 order-xl-2">
                                <div className="service-desc-wrap">
                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                        <div className="home-2-head">
                                            <span>Product Listings</span>
                                        </div>
                                    </div>
                                    <div className="serv-desc-content">
                                        <h3>Present and discover products</h3>
                                        <p>Use our product listings to present your products to a broad business community or to search specifically for new trading opportunities. Our platform offers an efficient way to make products visible internationally.</p>
                                        <ul>
                                            <li>Easy uploading: Add products with detailed descriptions and images.</li>
                                            <li>Reach more customers: Optimize your product display for maximum visibility.</li>
                                            <li>Direct inquiries: Companies can contact you directly and prepare business deals.</li>
                                        </ul>
                                        <div className="serch-btn mt-2">
                                            <button>Contact Us</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="row">
                        <div className="col-xl-6">
                            <div className="service-desc-wrap">
                                <div className="d-flex flex-column align-items-start justify-content-start">
                                    <div className="home-2-head">
                                        <span>Messaging & Communication</span>
                                    </div>
                                </div>
                                <div className="serv-desc-content">
                                    <h3>Efficient communication with business partners</h3>
                                    <p>Our integrated messaging & communication function enables fast and secure communication between buyers and sellers. Direct and encrypted messages make it easy for you to do business.</p>
                                    <ul>
                                        <li>Unlimited messages: Available to premium members for seamless communication.</li>
                                        <li>Secure & direct contact: Exchange information with companies quickly and securely.</li>
                                        <li>Real-time notifications: Receive instant updates on new messages and requests.</li>
                                    </ul>
                                    <div className="serch-btn mt-2">
                                        <button>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="service-desc-img">
                                <img src="/beschaffungsmarkt_images/Efficient communication with business partners.png" alt="trustworthy business partners" />
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

export default Service;