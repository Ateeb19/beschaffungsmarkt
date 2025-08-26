import React from "react";

const Navbar = () => {

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
                                <span><img src="/Images/united-states-of-america.png" alt="" className="me-2" width="30px"/> English</span>
                            </div>

                        </div>

                        <div className="d-flex align-items-center justify-content-end nav-links gap-4">
                            <span>Home</span>
                            <span>Posting</span>
                            <span>Companies</span>
                            <span>Out Service</span>
                            <span>Pricing</span>
                            <span>Contact</span>
                            <div className="d-flex align-items-center jusitfy-content-center gap-2 nav-buttons">
                                <button>Sign Up</button>
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