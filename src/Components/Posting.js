import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { GiClothes, GiCosmicEgg, GiElectricalResistance, GiLeatherArmor, GiMetalScales, GiRubberBoot } from "react-icons/gi";
import { FaCarSide, FaChair, FaSheetPlastic } from "react-icons/fa6";
import { PiBowlFoodFill } from "react-icons/pi";
import { AiFillPrinter } from "react-icons/ai";
import { MdClose, MdOutlineEmojiTransportation, MdOutlineSearch } from "react-icons/md";
import { IoSearch, IoWarning } from "react-icons/io5";
import { LiaBuysellads, LiaSellcast } from "react-icons/lia";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";
import * as GrIcons from "react-icons/gr";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IoIosCheckmarkCircle, IoMdThumbsUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/userSlice";
import { useAlert } from "./alert/Alert_message";
import { TiWarning } from "react-icons/ti";

const Posting = () => {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
    }, []);
    const Backend_URL = process.env.REACT_APP_API_URL;
    const [searchParams, setSearchParams] = useSearchParams();
    const maincategory = searchParams.get("maincategory") || "";
    const subcategory = searchParams.get("subcategory") || "";
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const location = useLocation();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    // console.log(data);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);

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
    const [postType, setPostType] = useState("");
    const [selectedCountry, setSelectedCountry] = useState('');

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
        const type = searchParams.get("postType");
        const country = searchParams.get("country");

        if (keyword) {
            setValue(keyword);
            // setTempValue(keyword);
        }
        if (type) {
            setPostType(type);
        }
        if (country) {
            setSelectedCountry(country);
        }
        if (mainCategoryId) {
            const selectedCategory = mainCategories.find(
                (cat) => cat._id === mainCategoryId
            );
            setCurrentMainCategory(selectedCategory);
        }
    }, [searchParams, mainCategories]);

    // const POST_TYPES = [
    //     { label: "Buying Post", value: "buy", icon: <LiaBuysellads className="me-3 fs-4" /> },
    //     { label: "Selling Offer", value: "sell", icon: <LiaSellcast className="me-3 fs-4" /> },
    //     { label: "Cooperation", value: "cooperation", icon: <MdOutlineEmojiTransportation className="me-3 fs-4" /> },
    //     { label: "Transportation", value: "transportation", icon: <FaCarSide className="me-3 fs-4" /> },
    // ];
    const POST_TYPES = [
        { label: "Buying Post", value: "buy", icon: LiaBuysellads },
        { label: "Selling Offer", value: "sell", icon: LiaSellcast },
        { label: "Cooperation", value: "cooperation", icon: MdOutlineEmojiTransportation },
        { label: "Transportation", value: "transportation", icon: FaCarSide },
    ];
    const selectedPostType = POST_TYPES.find((type) => type.value === postType);

    const getDaysAgo = (createdTime) => {
        const createdDate = new Date(createdTime);
        const currentDate = new Date();
        const diffTime = currentDate - createdDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return "Today";
        if (diffDays === 1) return "a day ago";
        return `${diffDays} days ago`;
    };

    const handleSelectMainCategory = (cat) => {
        setCurrentMainCategory(cat);
        setCurrentSubCategory(null); // reset subcategory
        setSearchParams({ keyword: value, posttype: postType, maincategory: cat._id, country: selectedCountry, page: 1 }); // page reset to 1
    };

    const handleSelectSubCategory = (sub) => {
        setCurrentSubCategory(sub);
        setSearchParams({
            keyword: value,
            posttype: postType,
            maincategory: currentMainCategory._id,
            subcategory: sub._id,
            country: selectedCountry,
            page: 1
        });
    };

    const handleSearchKeyword = () => {
        setValue(tempValue);
        setTempValue('');
        setSearchParams({
            keyword: tempValue,
            posttype: postType,
            maincategory: currentMainCategory?._id || '',
            subcategory: currentSubCategory?._id || '',
            country: selectedCountry,
            page: 1
        });
    };

    const handleCountry = (count) => {
        setSelectedCountry(count);
        setSearchParams({
            keyword: value,
            posttype: postType,
            maincategory: currentMainCategory?._id || '',
            subcategory: currentSubCategory?._id || '',
            country: count,
            page: 1
        });
    }

    const clearKeyword = () => {
        setValue('');
        setTempValue('');
        setSearchParams({
            keyword: '',
            posttype: postType,
            maincategory: currentMainCategory?._id || '',
            subcategory: currentSubCategory?._id || '',
            country: selectedCountry,
            page: 1
        });
    };

    const handlePostTypeFilter = (type) => {
        // const newType = postType === type ? "" : type; // toggle off if clicked again
        const newType = type.value;
        setPostType(newType);
        setSearchParams({
            keyword: value,
            postType: newType,
            maincategory: currentMainCategory?._id || "",
            subcategory: currentSubCategory?._id || "",
            country: selectedCountry,
            page: 1,
        });
    };

    const clearMainCategory = () => {
        setCurrentMainCategory(null);
        setCurrentSubCategory(null);
        setSearchParams({ keyword: value, posttype: postType, country: selectedCountry, page: 1 });
    };

    const clearSubCategory = () => {
        setCurrentSubCategory(null);
        setSearchParams({ keyword: value, posttype: postType, maincategory: currentMainCategory._id, country: selectedCountry, page: 1 });
    };

    const clearCountry = () => {
        setSelectedCountry('');
        setSearchParams({
            keyword: value,
            maincategory: currentMainCategory?._id || '',
            subcategory: currentSubCategory?._id || '',
            country: '',
            page: 1
        });

    }

    //featch companies

    const [companies, setCompanies] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const fetchCompanies = async () => {
        const body = {
            filterKeyword: value,
            // filterCountry: 'Germany',
            filterCountry: selectedCountry,
            filterPostType: postType,
            filterSubCategory: subcategory,
            filterMainCategory: maincategory,
            itemsPerPage: 10,
            currentPage: page
        };

        const res = await fetch(`${Backend_URL}/api/posts/all`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        // Merge companyList and sponsorList
        // const mergedList = [...(data.companyList || []), ...(data.sponsorList || [])];

        setCompanies(data.results);
        setTotalCount(data.totalDataCount);

        // console.log("Posting-:", data);
    };

    console.log('the data -: ', companies)

    useEffect(() => {
        fetchCompanies();
    }, [value, maincategory, subcategory, postType, selectedCountry, page]);

    const handleMainCategoryChange = (id) => {
        setSearchParams({ keyword: value, posttype: postType, maincategory: id, country: selectedCountry, page: 1 });
    };

    const handleSubCategoryChange = (id) => {
        setSearchParams({ keyword: value, posttype: postType, maincategory, subcategory: id, country: selectedCountry, page: 1 });
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
            posttype: postType,
            maincategory: currentMainCategory,
            subcategory: currentSubCategory,
            country: selectedCountry,
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
    const { showAlert } = useAlert();

    const isLiked = (postId) => {
        if (!data || !data.like_posts) return false;
        return data.like_posts.some((lp) => lp.post === postId);
    };

    const handle_post_click = (postID) => {
        navigate(`/posting/${postID}`);
    };

    const handle_add_fav = async (id) => {
        if (data) {
            try {
                const res = await axios.post(`${Backend_URL}/api/users/add-like-post`, {
                    postId: id,
                }, {
                    withCredentials: true,
                })

                console.log(res.data);
                if (res.data.status) {
                    showAlert(<div className="d-flex align-items-center justify-content-start gap-1">
                        <IoIosCheckmarkCircle className="text-success fs-3" />
                        {res.data.msg}
                    </div>, 'success');
                }
            } catch (e) {
                const errorMessage =
                    e.response?.data?.msg ||
                    e.response?.data?.error ||
                    e.message ||
                    "Something went wrong";

                showAlert(
                    <div className="d-flex align-items-center justify-content-start gap-1">
                        <IoIosCheckmarkCircle className="text-danger fs-3" />
                        {errorMessage}
                    </div>,
                    "danger"
                );
            }
            dispatch(fetchUserInfo());
            fetchCompanies();
        } else {
            showAlert(<div className="d-flex gap-1 justify-content-center align-items-center text-start me-3">
                <TiWarning className="text-warning fs-3" />
                <span>Please Sign In first.</span>
            </div>, 'warning')
        }
    }
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
                    <div className="d-flex flex-row align-items-start justify-content-start w-100">
                        <div className="col-md-3 company-filter d-flex flex-column align-items-start justify-content-start gap-4">
                            {currentMainCategory && currentMainCategory._id || value || selectedCountry || selectedPostType ? (
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

                                            {selectedPostType && (
                                                <div
                                                    key={selectedPostType.value}
                                                    className="d-flex align-items-start justify-content-center w-100 company-filter-inner-div"
                                                >
                                                    <div className="d-flex align-items-start justify-content-start w-100">
                                                        <selectedPostType.icon className="me-3 fs-4" />
                                                        <span>{selectedPostType.label}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center pt-1 justify-content-center">
                                                        <MdClose
                                                            onClick={() => {
                                                                setPostType('');
                                                                setSearchParams({
                                                                    keyword: value,
                                                                    posttype: '',
                                                                    maincategory: currentMainCategory?._id || '',
                                                                    subcategory: currentSubCategory?._id || '',
                                                                    country: selectedCountry,
                                                                    page: 1,
                                                                });
                                                            }}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </div>
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
                                            {selectedCountry && (
                                                <>
                                                    <div className="w-100 text-start d-flex justify-content-between align-items-center " style={{ color: '#000' }}>
                                                        <span>
                                                            <img src={selectedCountry === 'Turkey' ? '/Images/turkey.png' : '/Images/germany.png'} width="25px" className="me-2" />
                                                            {/* <img src="/Images/germany.png" width="25px" className="me-2" /> */}
                                                            {/* <img src="/Images/turkey.png" width="25px" className="me-2" /> */}
                                                            {selectedCountry}</span>
                                                        <MdClose onClick={() => { clearCountry(); setSelectedCountry(''); }} style={{ cursor: 'pointer' }} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : null}

                            {value ? (null) : (
                                <>
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
                                </>
                            )}


                            {selectedPostType ? (null) : (
                                <>
                                    <div className="d-flex flex-column align-items-start justify-content-start w-100 company-filter-keyword gap-3 mb-2">
                                        <h5>Post Type</h5>
                                    </div>
                                    <div className="d-flex flex-column align-items-start justify-content-start w-100 category-list gap-3">
                                        {[
                                            { label: "Buying Post", value: "buy", icon: <LiaBuysellads className="me-3 fs-4" /> },
                                            { label: "Selling Offer", value: "sell", icon: <LiaSellcast className="me-3 fs-4" /> },
                                            { label: "Cooperation", value: "cooperation", icon: <MdOutlineEmojiTransportation className="me-3 fs-4" /> },
                                            { label: "Transportation", value: "transportation", icon: <FaCarSide className="me-3 fs-4" /> },
                                        ].map((type) => (
                                            <div
                                                key={type.value}
                                                // className={`d-flex align-items-center text-start w-100 p-2 rounded category-list-inner-div ${postType === type.value ? "bg-primary text-white" : "bg-light text-dark"}`}
                                                className="d-flex-align-items-start text-start w-100"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handlePostTypeFilter(type)}
                                            >
                                                {type.icon}
                                                <span>{type.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}



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

                            {selectedCountry ? (null) : (
                                <>
                                    <div className="d-flex flex-column align-items-start justify-content-start w-100 mt-2 gap-3 company-country">
                                        <h5>COUNTRIES</h5>
                                        <div onClick={() => handleCountry('Germany')} className="d-flex-align-items-start text-start">  <img src="/Images/germany.png" width="25px" className="me-2" /><span>Germany</span></div>
                                        <div onClick={() => handleCountry('Turkey')} className="d-flex-align-items-start text-start">  <img src="/Images/turkey.png" width="25px" className="me-2" /><span>Turkey</span></div>
                                    </div>
                                </>
                            )}

                        </div>

                        <div className="col-md-9 company-pages">
                            {companies.length > 0 ? (
                                <>
                                    {companies.map((c) => {
                                        const matchedType = POST_TYPES.find((type) => type.value === c.type);
                                        const liked = isLiked(c._id);

                                        return (
                                            <>
                                                <div className="d-flex flex-column w-100 text-start align-items-start justify-content-start company-page-data" style={{ height: '15rem', padding: '1.5rem' }} onClick={() => handle_post_click(c._id)}>
                                                    <div className="d-flex align-items-start justify-content-between w-100">
                                                        <div className="d-flex align-items-start justify-content-start gap-3">
                                                            <div className="posting-country d-flex aligm-items-center justify-content-center">
                                                                <img src={c.user.country === 'Germany' ? "/Images/germany.png" : "/Images/turkey.png"} width="20px" className="me-2" />
                                                                <span>{c.user.country.charAt(0).toUpperCase() + c.user.country.slice(1)}</span>
                                                            </div>
                                                            <div className="posting-country d-flex aligm-items-center justify-content-center">
                                                                {matchedType && (
                                                                    <div className="posting-type d-flex align-items-center">
                                                                        <matchedType.icon className="me-1 fs-5" />
                                                                        <span className="fw-bold">{matchedType.label}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <span>{getDaysAgo(c.created_time)}</span>
                                                        </div>
                                                        <div className="d-flex">
                                                            <IoMdThumbsUp onClick={(e) => { e.stopPropagation(); handle_add_fav(c._id) }}
                                                                className={`fs-4 ${liked ? "posting-thumsup-yes" : "posting-thumsup-no"}`} />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column align-items-start justify-content-start w-100 mt-3 post-title">
                                                        <h2>{c.title}</h2>
                                                        <p>{c.description}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )
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
                                </Stack>
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