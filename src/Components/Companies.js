import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { MdClose, MdOutlineSearch } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";
import * as GrIcons from "react-icons/gr";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Companies = () => {


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
    }, []);
    const URL = process.env.REACT_APP_API_URL;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // const [get_url] = useSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const maincategory = searchParams.get("maincategory") || "";
    const subcategory = searchParams.get("subcategory") || "";
    const location = useLocation();
    // const page = parseInt(searchParams.get("page") || "1", 10);
    // let pageParam = searchParams.get("page");
    const navigate = useNavigate();

    const [page, setPage] = useState(() => {
        const pageParam = searchParams.get("page");
        return pageParam ? Number(pageParam) : 1;
    });
    // let page = Number(pageParam);

    if (isNaN(page) || page < 1) {
        page = 1; // default safe page
    }

    const [value, setValue] = useState("");
    const [tempValue, setTempValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [currentMainCategory, setCurrentMainCategory] = useState(null);
    const [currentSubCategory, setCurrentSubCategory] = useState(null);

    const handleClear_category = () => {
        setCategoryValue("");
    };

    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${URL}/categories`);
                setMainCategories(res.data.mainCategory);
                setSubCategories(res.data.subCategory);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
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

    {
        mainCategories
            .filter((cat) =>
                cat.label.toLowerCase().includes(categoryValue.toLowerCase())
            )
            .map((cat) => {
                const Icon = getIconComponent(cat.icon);
                return (
                    <div
                        key={cat._id}
                        className="d-flex align-items-start text-start category-list-inner-div"
                        onClick={() => setCurrentMainCategory(cat)}
                    >
                        {Icon && <Icon className="me-3 fs-4" />}
                        <span>{cat.label}</span>
                    </div>
                );
            })
    }

    const filtered = mainCategories.find(cat => cat.value === value);

    { filtered?.icon && React.createElement(filtered.icon) }

    // console.log('mainCategories -:  ', mainCategories)
    // console.log('subCategories -:  ', subCategories)

    useEffect(() => {
        const mainCategoryId = searchParams.get('maincategory');
        if (mainCategoryId) {
            const selectedCategory = mainCategories.find(
                (cat) => cat._id === mainCategoryId
            );
            setCurrentMainCategory(selectedCategory);
        }
    }, [searchParams, mainCategories]);

    const handleSelectMainCategory = (cat) => {
        setCurrentMainCategory(cat);
        setCurrentSubCategory(null); // reset subcategory
        setSearchParams({ maincategory: cat._id, page: 1 }); // page reset to 1
    };

    const handleSelectSubCategory = (sub) => {
        setCurrentSubCategory(sub);
        setSearchParams({
            maincategory: currentMainCategory._id,
            subcategory: sub._id,
            page: 1
        });
    };

    const handleSearchKeyword = () => {
        setSearchParams({
            maincategory: currentMainCategory?._id || '',
            subcategory: currentSubCategory?._id || '',
            page: 1
        });
        setValue(tempValue);
        setTempValue('');
    };


    const clearMainCategory = () => {
        setCurrentMainCategory(null);
        setCurrentSubCategory(null);
        setSearchParams({ page: 1 });
    };

    const clearSubCategory = () => {
        setCurrentSubCategory(null);
        setSearchParams({ maincategory: currentMainCategory._id, page: 1 });
    };


    const [companies, setCompanies] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const fetchCompanies = async () => {
        const body = {
            filterKeyword: "",
            filterCountry: "",
            filterSubCategory: subcategory,
            filterMainCategory: maincategory,
            itemsPerPage: 10,
            currentPage: page
        };

        const res = await fetch(`${URL}/users/get-companies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        // Merge companyList and sponsorList
        const mergedList = [...(data.companyList || []), ...(data.sponsorList || [])];

        setCompanies(mergedList);
        setTotalCount(data.totalDataCount);

        console.log("Merged companies & sponsors:", mergedList);
    };


    useEffect(() => {
        fetchCompanies();
    }, [maincategory, subcategory, page]);

    const handleMainCategoryChange = (id) => {
        setSearchParams({ maincategory: id, page: 1 });
    };

    const handleSubCategoryChange = (id) => {
        setSearchParams({ maincategory, subcategory: id, page: 1 });
    };

    // const handlePageChange = (newPage) => {
    //     setSearchParams({ maincategory, subcategory, page: newPage });
    // };

    // const handlePageChange = (event, newPage) => {
    //     if (!newPage) return; // protect against undefined

    //     setSearchParams({
    //         maincategory: maincategory || "",
    //         subcategory: subcategory || "",
    //         page: String(newPage)  // always string, never undefined
    //     });
    // };

    const handlePageChange = (newPage) => {
        if (!newPage) return;

        setPage(newPage);

        // Update URL
        navigate(
            `/companies?maincategory=${currentMainCategory}&subcategory=${currentSubCategory}&page=${newPage}`
        );

        // Fetch new data
        fetchCompanies({
            maincategory: currentMainCategory,
            subcategory: currentSubCategory,
            page: newPage,
        });
    };

    useEffect(() => {
        setThumbsSwiper(null);
    }, [companies]);

    const handleCompanyClick = (companyId) => {
        navigate(`/company/${companyId}`);
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
                                    <li class="breadcrumb-item active" aria-current="page">Companies</li>
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
                                <img src="/beschaffungsmarkt_images/company-DsbXqMCq.png" alt="overview-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="company-data">
                <div className="container w-100 text-start">
                    <div className="d-flex flex-row align-items-start justify-content-center w-100">
                        <div className="col-md-3 company-filter d-flex flex-column align-items-start justify-content-start gap-4">
                            {currentMainCategory && currentMainCategory._id || value ? (
                                <>
                                    <div className="d-flex flex-column align-items-start justify-content-end w-100 company-filter-div gap-3 mb-2">
                                        <h5>Filter</h5>
                                        <div className="w-100">
                                            {value && (
                                                <>
                                                    <div className="w-100 text-start d-flex justify-content-between align-items-center " style={{ color: '#000' }}>
                                                        <span>{value}</span>
                                                        <MdClose onClick={() => { setValue(null); setTempValue(null) }} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                </>
                                            )}

                                            {currentMainCategory && currentMainCategory._id ? (
                                                <>
                                                    <div
                                                        key={currentMainCategory._id}
                                                        className="d-flex align-items-start justify-content-center w-100 company-filter-inner-div"
                                                    >
                                                        <div className="d-flex align-items-start justify-content-start w-100">
                                                            {(() => {
                                                                const Icon = getIconComponent(currentMainCategory.icon);
                                                                return Icon && <Icon className="me-3 fs-4" />;
                                                            })()}
                                                            <span>{currentMainCategory.label}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center pt-1 justify-content-center">
                                                            <MdClose onClick={() => { setCurrentMainCategory(null); setCurrentSubCategory(null); clearMainCategory() }} style={{ cursor: 'pointer' }} />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (null)}
                                            {currentSubCategory && currentSubCategory._id ? (
                                                <>
                                                    <div
                                                        key={currentSubCategory._id}
                                                        className="d-flex align-items-start justify-content-between w-100 text-start company-filter-inner-div mt-2 ps-3"
                                                    >
                                                        <div className="d-flex align-items-start justify-content-start text-start">
                                                            <span className="me-1"> <HiMiniArrowTurnDownRight /> </span>
                                                            {(() => {
                                                                const Icon = getIconComponent(currentSubCategory.icon);
                                                                return Icon && <Icon className="me-3 fs-4" />;
                                                            })()}
                                                            <span>{currentSubCategory.label}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center pt-1 justify-content-center">
                                                            <MdClose onClick={() => { setCurrentSubCategory(null); clearSubCategory() }} style={{ cursor: 'pointer' }} />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </>
                            ) : null}


                            <div className="d-flex flex-column align-items-start justify-content-start w-100 company-filter-keyword gap-3 mb-2">
                                <h5>Keyword</h5>
                                <div className="search-container w-100">
                                    <input
                                        type="text"
                                        placeholder="Search for keyword!"
                                        className="search-input"
                                        value={tempValue}
                                        onChange={(e) => setTempValue(e.target.value)} // <- update tempValue
                                    />

                                    <div className="search-actions">
                                        {tempValue && (
                                            <button className="clear-button" onClick={() => setTempValue("")}>
                                                <MdClose />
                                            </button>
                                        )}
                                        <button
                                            className="search-button"
                                            onClick={() => { handleSearchKeyword() }}
                                        >
                                            <IoSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {currentMainCategory ? (
                                <>
                                </>
                            ) : <>
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
                            </>}

                            <div className="d-flex flex-column align-items-start justify-content-start w-100 category-list gap-3">
                                {currentMainCategory ? (
                                    <>
                                        {currentSubCategory ? (
                                            null
                                        ) : <>
                                            <div className="company-filter-keyword" style={{ color: '#000' }}>
                                                <h5>SUBCATEGORIES</h5>
                                            </div>
                                            {subCategories
                                                .filter((sub) => sub.main_category === currentMainCategory._id)
                                                .map((sub) => {
                                                    const SubIcon = getIconComponent(sub.icon);
                                                    return (
                                                        <div
                                                            key={sub._id}
                                                            className="d-flex align-items-start text-start category-list-inner-div"
                                                            onClick={() => { setCurrentSubCategory(sub); handleSubCategoryChange(sub._id); handleSelectSubCategory(sub) }}
                                                        >
                                                            {SubIcon && <SubIcon className="me-3 fs-4" />}
                                                            <span>{sub.label}</span>
                                                        </div>
                                                    );
                                                })}
                                        </>
                                        }
                                    </>
                                ) : (<>
                                    {mainCategories
                                        .filter((cat) =>
                                            cat.label.toLowerCase().includes(categoryValue.toLowerCase())
                                        )
                                        .map((cat) => {
                                            const Icon = getIconComponent(cat.icon);
                                            return (
                                                <div
                                                    key={cat._id}
                                                    className="d-flex align-items-start text-start category-list-inner-div"
                                                    onClick={() => { setCurrentMainCategory(cat); handleMainCategoryChange(cat._id); handleSelectMainCategory(cat) }}
                                                >
                                                    {Icon && <Icon className="me-3 fs-4" />}
                                                    <span>{cat.label}</span>
                                                </div>
                                            );
                                        })}
                                </>)}
                            </div>

                            <div className="d-flex flex-column align-items-start justify-content-start w-100 mt-2 gap-3 company-country">
                                <h5>COUNTRIES</h5>
                                <div className="d-flex-align-items-start text-start">  <img src="/Images/germany.png" width="25px" className="me-2" /><span>Germany</span></div>
                                <div className="d-flex-align-items-start text-start">  <img src="/Images/turkey.png" width="25px" className="me-2" /><span>Turkey</span></div>
                            </div>

                        </div>

                        <div className="col-md-9 company-pages">
                            <div className="" >
                                {companies ? (
                                    <>
                                        {companies.map((c) => {

                                            const productImages =
                                                c.products?.map((p) => `https://api.beschaffungsmarkt.com/files/${p.image}`) || [];
                                                // c.products?.map((p) => `http://localhost:5001/files/${p.image}`) || [];

                                            return (
                                                <div
                                                    key={c._id}
                                                    className="d-flex flex-row w-100 text-start p-4 company-page-data"
                                                    onClick={() => handleCompanyClick(c._id)}
                                                >
                                                    <div className="d-flex flex-row align-items-start justify-content-start gap-4 company-data-box">
                                                        {/* Company Logo + Info */}
                                                        <div className="d-flex flex-row align-items-center justify-content-center gap-3 py-5">
                                                            <img
                                                                className="comapny-list-logo"
                                                                src={c.company_logo ? (`https://api.beschaffungsmarkt.com/files/${c.company_logo}`) : ('/Images/download23.jpeg')}
                                                                // src={c.company_logo ? (`http://localhost:5001/files/${c.company_logo}`) : ('/Images/download23.jpeg')}
                                                                alt={c.company_name}
                                                            />
                                                            <div className="d-flex flex-column align-items-start justify-content-center text-start">
                                                                <h2>{c.company_name}</h2>
                                                                <p>{c.company_description}</p>
                                                            </div>
                                                        </div>

                                                        {/* Product Image Slider */}
                                                        <div className="company-data-box-image-slider">
                                                            {productImages.length > 0 && (
                                                                <>
                                                                    {/* Main Slider */}
                                                                    <Swiper
                                                                        spaceBetween={10}
                                                                        // thumbs={{ swiper: thumbsSwiper }}
                                                                        thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : undefined}
                                                                        modules={[FreeMode, Thumbs]}
                                                                        className="mySwiper2"
                                                                    >
                                                                        {productImages.map((src, idx) => (
                                                                            <SwiperSlide key={idx}>
                                                                                <img
                                                                                    src={src}
                                                                                    className="rounded-lg"
                                                                                    alt={`Slide ${idx}`}
                                                                                />
                                                                            </SwiperSlide>
                                                                        ))}
                                                                    </Swiper>

                                                                    {/* Thumbnail Slider */}
                                                                    <Swiper
                                                                        onSwiper={setThumbsSwiper}
                                                                        spaceBetween={10}
                                                                        slidesPerView={4}
                                                                        freeMode={true}
                                                                        watchSlidesProgress={true}
                                                                        modules={[FreeMode, Thumbs]}
                                                                        className="mySwiper mt-2"
                                                                    >
                                                                        {productImages.map((src, idx) => (
                                                                            <SwiperSlide key={idx}>
                                                                                <img
                                                                                    src={src}
                                                                                    className="rounded-md cursor-pointer border"
                                                                                    alt={`Thumb ${idx}`}
                                                                                />
                                                                            </SwiperSlide>
                                                                        ))}
                                                                    </Swiper>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (null)}

                                <div className="d-flex justify-content-center mt-4">
                                    <Stack spacing={2}>
                                        <Pagination
                                            count={Math.ceil(totalCount / 10)}
                                            page={page}
                                            onChange={(event, value) => handlePageChange(value)}
                                            color="primary"
                                            shape="rounded"
                                        />
                                        {/* <Pagination
                                        count={Math.ceil(totalCount / 5)}
                                        page={page}
                                        onChange={(event, value) => handlePageChange(value)}
                                        color="primary"
                                        shape="rounded"
                                    /> */}
                                    </Stack>
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

export default Companies;