import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-100 nav-bar-wrap">
                <div className="container">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div className="d-flex align-items-center justify-content-start gap-3">
                            <div className="nav-image">
                                <img src="/beschaffungsmarkt_images/logo-eWxZ6qaB.svg" alt="" width="208px" />
                            </div>
                            <div className="nav-laungage">
                                <span><img src="/Images/united-states-of-america.png" alt="" className="me-2" width="30px" /> English</span>
                            </div>

                        </div>

                        <div className="d-flex align-items-center justify-content-end nav-links gap-4">
                            <span onClick={() => { navigate('/') }}>Home</span>
                            <span onClick={() => { navigate('/posting')}}>Posting</span>
                            <span onClick={() => { navigate('/companies') }}>Companies</span>
                            <span onClick={() => { navigate('/service') }}>Our Service</span>
                            <span onClick={() => { navigate('/pricing') }}>Pricing</span>
                            <span onClick={() => { navigate('/contact') }}>Contact</span>
                            <div className="d-flex align-items-center jusitfy-content-center gap-2 nav-buttons">
                                <button onClick={() => { navigate('/register') }}>Sign Up</button>
                                <button>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;