import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { GiClothes, GiCosmicEgg, GiElectricalResistance, GiLeatherArmor, GiMetalScales, GiRubberBoot } from "react-icons/gi";
import { FaCarSide, FaChair, FaSheetPlastic } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { AiFillPrinter } from "react-icons/ai";
import Form from 'react-bootstrap/Form';
import Switch from "react-switch";
import { FiCheckCircle } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Footer from "./Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/userSlice";
import axios from "axios";

import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";
import * as GrIcons from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "./alert/Alert_message";
import { fetchUserChats } from "../redux/userChatSlice";

const Home = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const IMAGE = process.env.REACT_APP_API_IMAGE;
    const [searchInput, setSearchInput] = useState('');
    const [category, setCategory] = useState("");
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    console.log('selected categroy', category);

    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
    };


    const [sponsors, setSponsors] = useState([]);
    const [premiumUser, setPremiumUser] = useState(false);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const response = await axios.get(`${Backend_URL}/api/users/random-sponsor-data`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setSponsors(response.data.result);
                setPremiumUser(response.data.premiumUser);
            } catch (error) {
                console.log(error)
            }
        };
        fetchSponsors();
    }, []);

    const getIconComponent = (iconString) => {
        if (!iconString) return null;

        // Example: "GiIcons.GiClothes" → ["GiIcons", "GiClothes"]
        const [libName, iconName] = iconString.split(".");

        const libraries = {
            GiIcons,
            FaIcons,
            Fa6Icons,
            AiIcons,
            PiIcons,
            SiIcons,
            GrIcons,
        };

        const lib = libraries[libName];
        return lib ? lib[iconName] : null;
    };
    const [main_category, setMain_category] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${Backend_URL}/api/categories/get-all-main-category`);
                // console.log(res.data);
                setMain_category(res.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, [])

    const [random_category, setRandom_category] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${Backend_URL}/api/categories/random`);
                setRandom_category(res.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, [])

    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const location = useLocation();
    // const { data, requestStatus, error } = useSelector((state) => state.user);
    // useEffect(() => {
    //     dispatch(fetchUserInfo());
    // }, [dispatch]);

    const {
        data,
        requestStatus: userStatus,
        error: userError
    } = useSelector((state) => state.user);

    const {
        chatData,
        requestStatus: chatStatus,
        error: chatError
    } = useSelector((state) => state.user_chat);

    useEffect(() => {
        dispatch(fetchUserInfo());
        dispatch(fetchUserChats());
    }, [dispatch, location]);

    console.log('this is email-: ', data?.email);
    const handlePayment = async (plan) => {
        try {
            // You can get the user's email from localStorage, context, or your logged-in state
            const userEmail = data?.email; // Example

            if (!userEmail) {
                showAlert("Please login first to continue payment.", 'warning');
                return;
            }

            const response = await axios.post(`${Backend_URL}/api/payments/create-checkout-session`, {
                email: userEmail,
                plan: plan,
                time: checked ? 'yearly' : 'monthly',
            });

            // Redirect user to Stripe checkout
            // window.location.href = response.data.url;
            window.open(response.data.url, "_blank");

        } catch (error) {
            console.error("Payment initiation failed:", error);
            showAlert("Payment initiation failed. Please try again.", 'danger');
        }
    };

    // const dispatch = useDispatch();
    // const { data, requestStatus, error } = useSelector((state) => state.user);
    // useEffect(() => {
    //     const token = localStorage.getItem("procurement_token");
    //     if (token) {
    //         dispatch(fetchUserInfo());
    //     }
    // }, [dispatch]);
    // console.log(data);
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <section className="hero-wrapper">
                    <div className="container">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div className="d-flex flex-column Hero-heading">
                                <div className="heading">
                                    German and Turkish Trading
                                </div>
                            </div>

                            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                                <div className="d-flex flex-column Hero-head">
                                    <div className="head">
                                        Your partner for German-Turkish trade relations
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                                <div className="d-flex flex-column Hero-title">
                                    <div className="title">
                                        We connect German and Turkish companies for successful trade and cooperation
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex-flex-column justify-content-center align-items-center mt-5">
                                <div className="d-flex flex-row hero-serch gap-3 w-100">
                                    <div className="serch-input">
                                        <input type="text" className="" placeholder="Type keyword" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                                    </div>
                                    <div className="serch-category">
                                        <select className="form-select selection"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)} >
                                            <option value="" disabled hidden>
                                                Please choose category
                                            </option>
                                            {main_category.map((cat, key) => (
                                                <>
                                                    <option value={cat._id}>{cat.label}</option>
                                                </>
                                            ))}
                                            {/* <option value="fashion">Fashion and Accessories</option>
                                            <option value="textiles">Textiles & Leather</option>
                                            <option value="shoes">Shoes</option>
                                            <option value="automotive">Automotive</option>
                                            <option value="metals">Metals and Heavy Industry</option>
                                            <option value="food">Food and Beverages</option>
                                            <option value="plastics">Plastics</option>
                                            <option value="furniture">Furniture and Decor</option>
                                            <option value="packaging">Packaging and Printing</option>
                                            <option value="electronics">Electrical and Electronics</option>
                                            <option value="cosmetics">Cosmetics and Personal Care</option> */}
                                        </select>
                                    </div>
                                    <div className="serch-btn">
                                        <button className="" onClick={() => navigate(`/companies?keyword=${searchInput}&maincategory=${category}&subcategory=&page=1`)}> <IoSearchSharp className="fs-5" /> Search Now</button>
                                    </div>
                                </div>
                            </div>


                            <div className="category-button mt-4">
                                <div className="d-flex flex-wrap gap-3 justify-content-center">
                                    {main_category && (
                                        <>
                                            {main_category.map((cat, key) => (
                                                <>
                                                    <div className="text-center " onClick={() => navigate(`/companies?maincategory=${cat._id}`)}><button><span>
                                                        {(() => {
                                                            const Icon = getIconComponent(cat.icon);
                                                            return Icon && <Icon className="fs-3" />;
                                                        })()} {cat.label}</span></button>
                                                    </div>
                                                </>
                                            ))}
                                        </>
                                    )}

                                </div>

                                {/* <div className="d-flex flex-row gap-3 align-items-center justify-content-center mt-3">
                                    <div className=""><button ><span><FaChair className="fs-3" /> Furniture and Decor</span></button></div>
                                    <div className=""><button ><span><AiFillPrinter className="fs-3" /> Packaging and Printing</span></button></div>
                                    <div className=""><button ><span><GiElectricalResistance className="fs-3" /> Electrical and Electronics</span></button></div>
                                    <div className=""><button ><span><GiCosmicEgg className="fs-3" /> Cosmetics and Personal Care</span></button></div>
                                </div> */}
                            </div>

                        </div>
                    </div>
                </section>

                <section className="home-2-wrapper d-flex flex-column align-items-center justify-content-center w-100">
                    <div className="container w-100">
                        <div className="d-flex flex-row align-items-center justify-content-center w-100">
                            <div className="col-md-6 pt-3">
                                <div className="d-flex justify-content-start align-items-start">
                                    <div className="home-2-head">
                                        <span>Top Categories We Have</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start align-items-start w-100 home-2-heading text-start mt-5">
                                    <span>Best performing product catogories</span>
                                </div>
                                <div className="d-flex justify-content-start align-items-start w-100 home-2-title text-start mt-5">
                                    <span>Beschaffungsmarkt offers a wide range of categories, including fashion & accessories, Shoes, Automotive, etc.</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex flex-column home-2-image w-100">
                                    <img src="/beschaffungsmarkt_images/category-section-D94vXXGx.png" width="100%" alt="" className="" />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center gap-5 mt-5">
                            {random_category && (
                                <>
                                    {random_category.map((ram, key) => (
                                        <>
                                            <div className="d-flex flex-column align-items-center justify-content-center home-2-category-box"
                                                onClick={() => navigate(`/companies?maincategory=${ram._id}`)}
                                            >
                                                {(() => {
                                                    const Icon = getIconComponent(ram.icon);
                                                    return Icon && <Icon className="text-primary mb-3" style={{ fontSize: '35px' }} />;
                                                })()}
                                                {/* <GiMetalScales className="text-primary mb-3" style={{ fontSize: '35px' }} /> */}
                                                <span>{ram.label}</span>
                                            </div>
                                        </>
                                    ))}
                                </>
                            )}
                            {/* <div className="d-flex flex-column align-items-center justify-content-center home-2-category-box">
                                <GiMetalScales className="text-primary mb-3" style={{ fontSize: '35px' }} />
                                <span>Metals and Heavy Industry</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center home-2-category-box">
                                <FaCarSide className="text-primary mb-3" style={{ fontSize: '35px' }} />
                                <span>Automotive</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center home-2-category-box">
                                <GiRubberBoot className="text-primary mb-3" style={{ fontSize: '35px' }} />
                                <span>Shoes</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center home-2-category-box">
                                <GiElectricalResistance className="text-primary mb-3" style={{ fontSize: '35px' }} />
                                <span>Electrical and Electronics</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center home-2-category-box">
                                <GiLeatherArmor className="text-primary mb-3" style={{ fontSize: '35px' }} />
                                <span>Textiles & Leather</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center home-2-category-box">
                                <PiBowlFoodFill className="text-primary mb-3" style={{ fontSize: '35px' }} />
                                <span>Food and Beverages</span>
                            </div> */}
                        </div>
                    </div>
                </section>

                <section className="hero-3-wrapper w-100">
                    <div className="container w-100">
                        <div className="d-flex flex-row align-items-center justify-content-center w-100 py-5">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start align-items-start">
                                    <div className="home-2-head">
                                        <span>Our Top Offerings</span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-start align-items-start w-100 home-2-heading text-start mt-4">
                                    <span>Top & Popular Offers we provide for you</span>
                                </div>
                                <div className="d-flex flex-column justify-content-start align-items-start w-100 home-2-title text-start mt-4">
                                    <p className="mb-4">Explore a world of top-tier products and trusted suppliers from Germany and Turkey, all in one place. Our platform connects you with leading companies known for their excellence, offering a diverse range of high-quality products across various industries.</p>
                                    <p>Whether you're looking for cutting-edge mechanical engineering solutions, premium textiles, or high-quality food products, our marketplace ensures that you find exactly what you need to drive your business forward. With a focus on reliability and innovation, we make it easier than ever to access the best offerings from these two powerhouse economies.</p>
                                </div>
                                <div className="d-flex align-items-start jusitfy-content-start w-100">
                                    <div className="serch-btn mt-2">
                                        <button>Contact Us</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex flex-column home-2-image w-100 ms-5">
                                    <img src="/beschaffungsmarkt_images/offer-section-DU4ZBTvX.png" width="100%" height="100%" alt="" className="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="home-4-wrapper w-100">
                    <div className="container">
                        <div className="d-flex flex-column align-items-cetner justify-content-center w-100" style={{ paddingBottom: '120px' }}>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="home-2-head">
                                    <span>Popular Offers</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center w-100 home-2-heading text-start mt-3">
                                <span>Top Offers of The Year</span>
                            </div>
                            <div className="d-flex justify-content-center align-items-center w-100 home-2-title text-start mt-3">
                                <span style={{ fontWeight: '500', fontSize: '16px' }}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</span>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-cetner justify-content-center w-100">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="home-2-head">
                                    <span>Step-By-Step Process</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center w-100 home-2-heading text-start mt-3">
                                <span>Take Advantage Of The Benefits</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center w-100 home-2-title text-start mt-4">
                                <div className="d-flex flex-column align-items-center justify-content-center home-steps">
                                    <div className="d-flex flex-column step-circle">
                                        <img src="/beschaffungsmarkt_images/benefits icon 1.svg" alt="" width="100%" />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-cetner step-heading text-center ">
                                        <span>Contact Providers</span>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-cetner step-text text-center w-100">
                                        <p>Direct contact to leading providers and suppliers from various industries.</p>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center home-steps">
                                    <div className="d-flex flex-column step-circle">
                                        <img src="/beschaffungsmarkt_images/benefits icon 2.svg" alt="" width="100%" />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-cetner step-heading text-center ">
                                        <span>Easy Navigation</span>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-cetner step-text text-center w-100">
                                        <p>Quick and easy navigation through the best offers in the region.</p>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center home-steps">
                                    <div className="d-flex flex-column step-circle">
                                        <img src="/beschaffungsmarkt_images/benefits icon 3.svg" alt="" width="100%" />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-cetner step-heading text-center ">
                                        <span>High-Quality Product</span>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-cetner step-text text-center w-100">
                                        <p>High-quality products with high demand in the German-Turkish trade.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-5-wrapper w-100">
                    <div className="container w-100">
                        <div className="d-flex flex-row align-items-center justify-content-between w-100 gap-5">
                            <div className="col-md-6">
                                <div className="d-flex flex-column align-items-start justify-content-start w-100">
                                    <div className="d-flex align-items-start text-start home-5-heading mb-5">
                                        <span>Join 4,000+ customers growing with us!</span>
                                    </div>
                                    <div className="d-flex align-items-start text-start home-5-text mb-4">
                                        <p>Experience seamless on all our commodity orders. Maximize your profits, save on costs, and export confidently with our advanced tools and features.</p>
                                    </div>
                                    <div className="d-flex align-items-start text-start home-5-button mb-5">
                                        <button>Get Started Free</button>
                                    </div>
                                    <div className="d-flex align-items-start justify-content-start text-start home-5-bottom">
                                        <div className="d-flex flex-column align-items-start justify-content-start pe-4 home-5-bottom-box border-end border-light me-4">
                                            <h4>16 +</h4>
                                            <span>Company</span>
                                        </div>

                                        <div className="d-flex flex-column align-items-start justify-content-start pe-4 home-5-bottom-box border-end border-light me-4">
                                            <h4>0 +</h4>
                                            <span>Posting</span>
                                        </div>
                                        <div className="d-flex flex-column align-items-start justify-content-start pe-4 home-5-bottom-box me-4">
                                            <h4>1000 +</h4>
                                            <span>Customers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex flex-column home-5-image w-100 ms-5">
                                    <img src="/beschaffungsmarkt_images/counter-section-CDF_S1CJ.png" width="80%" alt="" className="" />
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section className="home-6-authors">
                    <div className="countainer w-100">
                        <div className="d-flex flex-column align-items-center justify-content-center w-100">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="home-2-head">
                                    <span>Popular Authors</span>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center w-100 home-2-heading text-center mt-3">
                                <span>Top Authors of The Year</span>
                            </div>

                            <div className="d-flex justify-content-center align-items-center w-100 home-6-title text-center mt-3">
                                <span>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</span>
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center gap-2 mt-4">
                                {/* <div className="d-flex flex-column align-items-center justify-content-center home-6-authors-box"> */}

                                {sponsors && (
                                    <>
                                        {sponsors.map((d, key) => (
                                            <>
                                                <div class="authors-wrapper" onClick={() => navigate(`/company/${d._id}`)}>
                                                    <div class="container">
                                                        <div class="card-container">
                                                            <div class="card text-start">
                                                                {/* <div className="home-author-img-div"> */}
                                                                <img
                                                                    // src={`http://localhost:5001/files/${d.company_logo}`}
                                                                    src={`${Backend_URL}/files/${d.company_logo}`}
                                                                    alt="Turkish Export Solutions Logo"
                                                                    className="logo"
                                                                />
                                                                {/* </div> */}
                                                                <div class="profile-placeholder blur-text"></div>
                                                                <div class="contact-name blur-text">Contact Person</div>
                                                                <div class="contact-label blur-text">Position</div>
                                                                <div class="company-name">
                                                                    <svg
                                                                        className="me-1"
                                                                        stroke="currentColor"
                                                                        fill="currentColor"
                                                                        stroke-width="0"
                                                                        version="1.2"
                                                                        baseProfile="tiny"
                                                                        viewBox="0 0 24 24"
                                                                        height="1em"
                                                                        width="1em"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M12 2c-4.971 0-9 4.029-9 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 6c0-.553.447-1 1-1s1 .447 1 1v3c-.552 0-1 .448-1 1s.448 1 1 1c.553 0 1-.448 1-1h1v-2l1 1-1 1c0 3 0 3-2 4 0-1-1-1-3-1v-2l-2-2v-2c-1 0-1 1-1 1l-.561-.561-1.652-1.651c1.167-2.247 3.512-3.788 6.213-3.788.688 0 1.353.104 1.981.29-.086.895-.579 1.71-1.481 1.71-1 0-1.5 1-1.5 2v3s1 0 1-3zm0 10c-3.859 0-7-3.14-7-7 0-.776.133-1.521.367-2.219l1.926 1.926 1 1 1.707 1.707v1.586c0 .552.447 1 1 1 .779 0 1.651 0 2.006.091.038.301.209.582.468.742.168.104.36.16.552.16.145 0 .289-.032.422-.098 2.348-1.174 2.539-1.644 2.552-4.479l.708-.708c.391-.391.391-1.023 0-1.414l-1-1c-.192-.192-.448-.294-.708-.294-.129 0-.259.025-.383.076-.373.155-.617.52-.617.924v-2c0-.689-.351-1.298-.883-1.658.421-.411.712-.995.826-1.685 2.392 1.115 4.057 3.535 4.057 6.343 0 3.86-3.141 7-7 7z"
                                                                        ></path>
                                                                    </svg>
                                                                    {d.company_name}
                                                                </div>
                                                                <div class="address">
                                                                    <svg
                                                                        className="me-1"
                                                                        stroke="currentColor"
                                                                        fill="currentColor"
                                                                        stroke-width="0"
                                                                        viewBox="0 0 384 512"
                                                                        height="1em"
                                                                        width="1em"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                                                                        ></path>
                                                                    </svg>
                                                                    {d.street} {d.zipcode} {d.city} {d.country}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                )}

                                {/* </div> */}
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
                                    <button className="price-get-box w-100">Get Free</button>
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
                                    <button className="price-get-box-premium w-100" onClick={() => checked ? handlePayment(1999) : handlePayment(179)}>Get Premium</button>
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
                                    <button className="price-get-box w-100" onClick={() => checked ? handlePayment(2699) : handlePayment(249)}>Get Premium +</button>
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
        </>
    )
}

export default Home;