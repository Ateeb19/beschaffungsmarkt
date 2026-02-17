import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();
    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer-info-wrap text-start">
                        <div className="row gx-5 gy-4">
                            <div className="col-xl-6 col-md-12">
                                <div className="newsletter-wrapper">
                                    <div className="newsletter-wrap text-start">
                                        <h3>Join Thousand of Happy Customers!</h3>
                                        <p>Subscribe our newsletter & get latest news and updation!</p>
                                        <form action="#" className="d-flex flex-column flex-sm-row gap-2">
                                            <input type="email" className="news-email" id="email_newsletter" placeholder="Enter your email address" autoComplete="on"/>
                                                <button type="submit" className="news-btn">Get Started Free</button>
                                        </form>
                                    </div>

                                </div>

                                <div className="footer-logo">
                                    <img src="/beschaffungsmarkt_images/footer_logo.svg" alt="logo"/>
                                </div>
                                <div className="mission-wrap">
                                    <h4>Our Mission</h4>
                                    <p>At Beschaffungsmarkt, our mission is to support companies on their path to success and growth. We offer customized international trade solutions to help you find the best suppliers and business partners. Our goal is to facilitate the exchange between German and Turkish companies and promote the growth of your business partnerships through reliable, efficient and sustainable sourcing solutions.</p>
                                    <p>With innovative and user-friendly tools and a global network, we are the ideal partner for your trading success.</p>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <div className="footer-menu">
                                    <h4>About Us</h4>
                                    <ul>
                                        <li onClick={() => { navigate('/') }}><a href="#">Beschaffungsmarkt</a></li>
                                        <li onClick={() => { navigate('/service') }}><a href="#">Our Service</a></li>
                                        <li onClick={() => { navigate('/faq') }}><a href="#">FAQ</a></li>
                                        <li onClick={() => { navigate('/contact') }}><a href="#">Contact</a></li>
                                        <li onClick={() => { navigate('/career') }}><a href="#">Career</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <div className="footer-menu">
                                    <h4>Legal</h4>
                                    <ul>
                                        <li onClick={() => { navigate('/imprint') }}><a href="#">Imprint</a></li>
                                        <li onClick={() => { navigate('/privacy-policy') }}><a href="#">Privacy Policy</a></li>
                                        <li onClick={() => { navigate('/terms-of-service') }}><a href="#">Terms of Service</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <div className="footer-menu">
                                    <h4>Connect with us</h4>
                                    <ul>
                                        <li><a href="#">+49 69 1234 5678</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="copyright-wrap">
                        <div className="row gx-5 gy-4">
                            <div className="col-xl-6">
                                <div className="copyright text-start">
                                    <p>© 2025 Beschaffungsmarkt. All rights reserved.</p>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="social-media d-flex justify-content-center justify-content-md-end gap-3 fs-5">
                                    <ul>
                                        <li><a href="#"><FaYoutube /></a></li>
                                        <li><a href="#"><FaFacebook/></a></li>
                                        <li><a href="#"><FaInstagram/></a></li>
                                        <li><a href="#"><FaLinkedin/></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer;