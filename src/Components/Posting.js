import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { GiClothes, GiCosmicEgg, GiElectricalResistance, GiLeatherArmor, GiMetalScales, GiRubberBoot } from "react-icons/gi";
import { FaCarSide, FaChair, FaSheetPlastic } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { AiFillPrinter } from "react-icons/ai";
import { MdClose, MdOutlineEmojiTransportation, MdOutlineSearch } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LiaBuysellads, LiaSellcast } from "react-icons/lia";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";
import * as GrIcons from "react-icons/gr";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";

const Posting = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
    }, []);
    const Backend_URL = process.env.REACT_APP_API_URL;
    const [searchParams, setSearchParams] = useSearchParams();
    const maincategory = searchParams.get("maincategory") || "";
    const subcategory = searchParams.get("subcategory") || "";
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
                const res = await axios.get(`${Backend_URL}/api/categories`);
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
        const keyword = searchParams.get('keyword');
        if (keyword) {
            setValue(keyword);
            // setTempValue(keyword);
        }
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
        setSearchParams({ keyword: value, maincategory: cat._id, page: 1 }); // page reset to 1
    };

    const handleSelectSubCategory = (sub) => {
        setCurrentSubCategory(sub);
        setSearchParams({
            keyword: value,
            maincategory: currentMainCategory._id,
            subcategory: sub._id,
            page: 1
        });
    };

    const handleSearchKeyword = () => {
        setValue(tempValue);
        setTempValue('');
        setSearchParams({
            keyword: tempValue,
            maincategory: currentMainCategory?._id || '',
            subcategory: currentSubCategory?._id || '',
            page: 1
        });
    };

    const clearKeyword = () => {
        setValue('');
        setTempValue('');
        setSearchParams({
            keyword: '',
            maincategory: currentMainCategory?._id || '',
            subcategory: currentSubCategory?._id || '',
            page: 1
        });
    };

    const clearMainCategory = () => {
        setCurrentMainCategory(null);
        setCurrentSubCategory(null);
        setSearchParams({ keyword: value, page: 1 });
    };

    const clearSubCategory = () => {
        setCurrentSubCategory(null);
        setSearchParams({ keyword: value, maincategory: currentMainCategory._id, page: 1 });
    };



    //featch companies

    const [companies, setCompanies] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const fetchCompanies = async () => {
        const body = {
            filterKeyword: value,
            filterCountry: "",
            filterSubCategory: subcategory,
            filterMainCategory: maincategory,
            itemsPerPage: 10,
            currentPage: page
        };

        const res = await fetch(`${Backend_URL}/api/users/get-companies`, {
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
    }, [value, maincategory, subcategory, page]);

    const handleMainCategoryChange = (id) => {
        setSearchParams({ keyword: value, maincategory: id, page: 1 });
    };

    const handleSubCategoryChange = (id) => {
        setSearchParams({ keyword: value, maincategory, subcategory: id, page: 1 });
    };

    const handlePageChange = (newPage) => {
        if (!newPage) return;

        setPage(newPage);

        // Update URL
        navigate(
            `/posting?keyword=${value}&maincategory=${currentMainCategory}&subcategory=${currentSubCategory}&page=${newPage}`
        );

        // Fetch new data
        fetchCompanies({
            value: value,
            maincategory: currentMainCategory,
            subcategory: currentSubCategory,
            page: newPage,
        });
    };

    // useEffect(() => {
    //     setThumbsSwiper(null);
    // }, [companies]);

    // useEffect(() => {
    //     if (companies && companies.length > 0) {
    //         setThumbsSwiper(null);
    //     }
    // }, [companies]);

    // useEffect(() => {
    //     if (companies && companies.length > 0) {
    //         const timeout = setTimeout(() => setThumbsSwiper(null), 150);
    //         return () => clearTimeout(timeout);
    //     }
    // }, [companies]);


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
                                    <li class="breadcrumb-item" onClick={() => navigate('/')}><a href="#">Home</a></li>
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
                            {currentMainCategory && currentMainCategory._id || value ? (
                                <>
                                    <div className="d-flex flex-column align-items-start justify-content-end w-100 company-filter-div gap-3 mb-2">
                                        <h5>Filter</h5>
                                        <div className="w-100">
                                            {value && (
                                                <>
                                                    <div className="w-100 text-start d-flex justify-content-between align-items-center " style={{ color: '#000' }}>
                                                        <span>{value}</span>
                                                        <MdClose onClick={() => { clearKeyword(); setValue(''); setTempValue('') }} style={{ cursor: 'pointer' }} />
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
                            <div className="d-flex flex-column align-items-start justify-content-start w-100 company-filter-keyword gap-3 mb-2">
                                <h5>Post Type</h5>
                            </div>

                            <div className="d-flex flex-column align-items-start justify-content-start w-100 category-list gap-3">
                                <div className="d-flex-align-items-start text-start">  <LiaBuysellads className="me-3 fs-4" /><span>Buying Post</span></div>
                                <div className="d-flex-align-items-start text-start">  <LiaSellcast className="me-3 fs-4" /><span>Selling offer</span></div>
                                <div className="d-flex-align-items-start text-start">  <MdOutlineEmojiTransportation className="me-3 fs-4" /><span>Cooperation</span></div>
                                <div className="d-flex-align-items-start text-start">  <FaCarSide className="me-3 fs-4" /><span>Transportation</span></div>
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