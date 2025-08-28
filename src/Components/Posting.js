import React, { useState } from "react";
import Footer from "../Footer/Footer";
import { GiClothes, GiCosmicEgg, GiElectricalResistance, GiLeatherArmor, GiMetalScales, GiRubberBoot } from "react-icons/gi";
import { FaCarSide, FaChair, FaSheetPlastic } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { AiFillPrinter } from "react-icons/ai";
import { MdClose, MdOutlineEmojiTransportation, MdOutlineSearch } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LiaBuysellads, LiaSellcast } from "react-icons/lia";

const Posting = () => {

    const [value, setValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");

    const handleClear = () => {
        setValue("");
    };

    const handleClear_category = () => {
        setCategoryValue("");
    };
    return (
        <div className="companies-main-div">
            <section class="overview-wrapper">
                <div class="container text-start">
                    <div class="row">
                        <div class="col-xl-6">
                            <nav style={{
                                "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
                            }}
                                aria-label="breadcrumb">
                                <ol class="overview-breadcrumb breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Posting</li>
                                </ol>
                            </nav>

                            <div class="overview-head">
                                <h2>Companies</h2>
                                <h3>Turkish export companies b2b trade directory</h3>
                                <p>Verified Turkish companies Turkish export companies b2b trade directory that are manufacturers and exporters in Turkey</p>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="overview-img">
                                <img src="/beschaffungsmarkt_images/posting-W0guxR20.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="company-data">
                <div className="container w-100 text-start">
                    <div className="d-flex flex-row align-items-center justify-content-center w-100">
                        <div className="col-md-3 company-filter d-flex flex-column align-items-start justify-content-start gap-4">                            
                            <div className="d-flex flex-column align-items-start justify-content-start w-100 company-filter-keyword gap-3 mb-2">
                                <h5>Keyword</h5>
                                <div className="search-container w-100">
                                    <input
                                        type="text"
                                        placeholder="Search for keyword!"
                                        className="search-input"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    />

                                    <div className="search-actions">
                                        {value && (
                                            <button className="clear-button" onClick={handleClear}>
                                                <MdClose />
                                            </button>
                                        )}
                                        <button className="search-button">
                                            <IoSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-start w-100 company-filter-keyword gap-3 mb-2">
                                    <h5>Post Type</h5>
                            </div>

                            <div className="d-flex flex-column align-items-start justify-content-start w-100 category-list gap-3">
                                <div className="d-flex-align-items-start text-start">  <LiaBuysellads className="me-3 fs-4" /><span>Buying Post</span></div>
                                <div className="d-flex-align-items-start text-start">  <LiaSellcast className="me-3 fs-4" /><span>Selling offer</span></div>
                                <div className="d-flex-align-items-start text-start">  <MdOutlineEmojiTransportation className="me-3 fs-4" /><span>Cooperation</span></div>
                                <div className="d-flex-align-items-start text-start">  <FaCarSide className="me-3 fs-4" /><span>Transportation</span></div>
                            </div>

                            <div className="d-flex flex-column align-items-start justify-content-start w-100 company-filter-keyword gap-3 mb-2">
                                <h5>CATEGORIES</h5>
                                <div className="search-container w-100">
                                    <input
                                        type="text"
                                        placeholder="Search for category!"
                                        className="search-input"
                                        value={categoryValue}
                                        onChange={(e) => setCategoryValue(e.target.value)}
                                    />

                                    <div className="search-actions">
                                        {categoryValue && (
                                            <button className="clear-button" onClick={handleClear_category}>
                                                <MdClose />
                                            </button>
                                        )}
                                        <button className="search-button">
                                            <IoSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column align-items-start justify-content-start w-100 category-list gap-3">
                                <div className="d-flex-align-items-start text-start">  <GiClothes className="me-3 fs-4" /><span>Fashion and Accessories</span></div>
                                <div className="d-flex-align-items-start text-start">  <GiLeatherArmor className="me-3 fs-4" /><span>Textiles & Leather</span></div>
                                <div className="d-flex-align-items-start text-start">  <GiRubberBoot className="me-3 fs-4" /><span>Shoes</span></div>
                                <div className="d-flex-align-items-start text-start">  <FaCarSide className="me-3 fs-4" /><span>Automotive</span></div>
                                <div className="d-flex-align-items-start text-start">  <GiMetalScales className="me-3 fs-4" /><span>Metals and Heavy Industry</span></div>
                                <div className="d-flex-align-items-start text-start">  <PiBowlFoodFill className="me-3 fs-4" /><span>Food and Beverages</span></div>
                                <div className="d-flex-align-items-start text-start">  <FaSheetPlastic className="me-3 fs-4" /><span>Plastics</span></div>
                                <div className="d-flex-align-items-start text-start">  <FaChair className="me-3 fs-4" /><span>Furniture and Decor</span></div>
                                <div className="d-flex-align-items-start text-start">  <AiFillPrinter className="me-3 fs-4" /><span>Packaging and Printing</span></div>
                                <div className="d-flex-align-items-start text-start">  <GiElectricalResistance className="me-3 fs-4" /><span>Electrical and Electronics</span></div>
                                <div className="d-flex-align-items-start text-start">  <GiCosmicEgg className="me-3 fs-4" /><span>Cosmetics and Personal Care</span></div>
                            </div>

                            <div className="d-flex flex-column align-items-start justify-content-start w-100 mt-2 gap-3 company-country">
                                <h5>COUNTRIES</h5>
                                <div className="d-flex-align-items-start text-start">  <img src="/Images/germany.png" width="25px" className="me-2" /><span>Germany</span></div>
                                <div className="d-flex-align-items-start text-start">  <img src="/Images/turkey.png" width="25px" className="me-2" /><span>Turkey</span></div>
                            </div>


                        </div>

                        <div className="col-md-9 company-pages">
                            <div className="d-flex flex-row w-100 text-start py-5 company-page-data">
                                <div className="col-md-2">

                                </div>

                                <div className="col-md-7">

                                </div>

                                <div className="col-md-3">

                                </div>
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

export default Posting;