import React from "react";
import Footer from "../Footer/Footer";

const Career = () => {

    return (
        <>
            <section class="overview-wrapper text-start">
                <div class="container">
                    <div class="row gy-4">
                        <div class="col-xl-6">
                            <nav style={{
                                "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
                            }} aria-label="breadcrumb">
                                <ol class="overview-breadcrumb breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Career</li>
                                </ol>
                            </nav>

                            <div class="overview-head">
                                <h2>Shape the Future with Us</h2>
                                {/* <!-- <h3>There's more to international trade - and we'll show you how!</h3> --> */}
                                <p>Join a team that values creativity, passion, and excellence. Whether you're an experienced professional or just starting your career, we offer opportunities to learn, develop, and make a real impact. Explore our open positions and take the next step toward a rewarding future with us.</p>
                            </div>

                        </div>
                        <div class="col-xl-6">
                            <div class="overview-img">
                                <img src="/beschaffungsmarkt_images/career-CtWnWYsv.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section class="career-wrapper text-start">
                <div class="container">
                    <div class="row gx-4 gy-4">
                        <div class="col-xl-7">
                            <div class="career-wrap">
                                <div class="career-head">
                                    <h2>Job Overview</h2>
                                    <p>Become part of our sales team!</p>
                                    <p>Are you articulate, persuasive and enjoy talking to people on the phone? Then we are looking for YOU!</p>
                                    <p>Beschaffungsmarkt offers you the opportunity to make full use of your talent in sales and earn an attractive salary at the same time. As a Sales Representative (m/f/d) in our team, you will be responsible for making telephone calls and selling our services to German and Turkish companies. Success is in your hands.</p>

                                    <h2>Roles & Responsibilities</h2>
                                    <ul>
                                        <li>- Sales on the phone: You conduct sales calls with potential customers and convince them of the benefits of our B2B platform.</li>
                                        <li>- No acquisition stress: You work with pre-qualified leads and don't have to acquire them yourself.</li>
                                        <li>- Performance-related remuneration: your earnings are directly linked to your success</li>
                                        <li>- Flexibility: Work from anywhere - whether from home or in the office, you decide how you want to work.</li>
                                        <li>- Personal development: We offer you training and further education so that you can continuously improve your sales skills.</li>
                                        <li>- Support: You will be part of a dedicated team that will support you with all the resources you need to sell successfully.</li>
                                    </ul>

                                    <h2>What you bring with you</h2>
                                    <ul>
                                        <li>- Fluency: you can express yourself persuasively and friendly on the phone and are responsive to customers</li>
                                        <li>- Motivation & ambition: You have a strong desire to sell and achieve your own successes.</li>
                                        <li>- Experience in sales (an advantage): Ideally you already have experience in telephone sales, but career changers are also very welcome.</li>
                                        <li>- Reliability and self-motivation: You can work independently and remain calm and focused even in challenging conversations.</li>
                                    </ul>

                                </div>
                            </div>
                        </div>

                        <div class="col-xl-5 col-12 order-1 order-xl-2">
                            <div class="career-form-wrap shadow">
                                <h2>Job Application Form</h2>
                                <form action="#">
                                    <div class="row gy-4">
                                        <div class="col-xl-12">
                                            <div class="form-group">
                                                <label for="f_name">Full Name</label>
                                                <input type="text" class="form-control" id="f_name" aria-describedby="firstname" placeholder="Enter your first name" />
                                            </div>
                                        </div>
                                        <div class="col-xl-12">
                                            <div class="form-group">
                                                <label for="email_id">Email address</label>
                                                <input type="email" class="form-control" id="email_id" aria-describedby="email" placeholder="Enter your email id" />
                                            </div>
                                        </div>
                                        <div class="col-xl-12">
                                            <div class="form-group">
                                                <label for="c_number">Contact Number</label>
                                                <input type="number" class="form-control" id="c_number" placeholder="Enter your contact number" />
                                            </div>
                                        </div>
                                        <div class="col-xl-12">
                                            <div class="form-group">
                                                <label for="resume">Upload Resume</label>
                                                <input type="file" class="form-control" id="resume" />
                                            </div>
                                        </div>
                                        <div class="col-xl-12">
                                            <button type="submit" class="btn-signup btn btn-primary">Apply Now</button>
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
        </>
    )
}

export default Career;