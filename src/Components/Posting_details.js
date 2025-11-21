import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { IoHomeOutline } from "react-icons/io5";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";
import * as GrIcons from "react-icons/gr";
import { LiaBuysellads, LiaSellcast } from "react-icons/lia";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { FaCarSide } from "react-icons/fa6";
import { SlEye } from "react-icons/sl";
import { IoIosCheckmarkCircle, IoMdThumbsUp } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/userSlice";
import { useAlert } from "./alert/Alert_message";
import { TiWarning } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const POST_TYPES = [
    { label: "Buying Post", value: "buy", icon: LiaBuysellads },
    { label: "Selling Offer", value: "sell", icon: LiaSellcast },
    { label: "Cooperation", value: "cooperation", icon: MdOutlineEmojiTransportation },
    { label: "Transportation", value: "transportation", icon: FaCarSide },
];

const Posting_details = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const { postID } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const dispatch = useDispatch();
    const location = useLocation();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    // console.log(data);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);

    const [contact_company, setContact_company] = useState(false);
    const [contect_message, setContect_message] = useState('');
    // console.log('user data -: ', data);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.post(`${Backend_URL}/api/posts/get-posting-info`, {
                    postingId: postID,
                }, {
                    withCredentials: true,
                });
                setPost(res.data);
                // console.log(res.data);
            } catch (err) {
                console.error("Error fetching company info:", err);
            }
        };

        fetchCompany();
    }, [postID, data]);

    // console.log('company-: ', post);

    if (!post?.postInfoData) return <p>Loading...</p>;

    const matchedType = POST_TYPES.find(
        (type) => type.value === post.postInfoData.type
    );
    // let matchedType = '';

    // useEffect(() => {
    //     if (post) {
    //         matchedType = POST_TYPES.find((type) => type.value === post.postInfoData.type);
    //     }
    // }, [post])

    const asArray = (v) => {
        if (v === undefined || v === null) return [];
        return Array.isArray(v) ? v : [v];
    };

    const getIconComponent = (iconString) => {
        if (!iconString) return null;

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

        const lib = libraries[libName];   // Example: GiIcons
        if (!lib) return null;

        const IconComponent = lib[iconName]; // Example: GiLeatherArmor
        return IconComponent ? <IconComponent /> : null;
    };

    const isLiked = data?.like_posts?.some((item) => item.post === post.postInfoData._id);

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
                showAlert(e.msg, 'danger')
                console.log('error message -: ', e.response.msg);
            }
            dispatch(fetchUserInfo());
        } else {
            showAlert(<div className="d-flex gap-1 justify-content-center align-items-center text-start me-3">
                <TiWarning className="text-warning fs-3" />
                <span>Please Sign In first.</span>
            </div>, 'warning')
        }
    }

    const handle_contact = () => {
        setContact_company(true);
    }

    const handleClose = () => {
        setContact_company(false);
        setContect_message('')
    }

    const handle_send_message = async () => {
        try {
            const res = await axios.post(`${Backend_URL}/api/chats/create`, {
                message: contect_message,
                receiverId: post.postInfoData.user._id,
                title: post.postInfoData.title,
            }, {
                withCredentials: true,
            })

            if (res.data.status) {
                showAlert(<div className="d-flex align-items-center justify-content-start gap-1">
                    <IoIosCheckmarkCircle className="text-success fs-3" />
                    {res.data.msg}
                </div>, 'success');
                handleClose();
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
    }

    if (!post) return <p>Loading...</p>;

    return (
        <div className="w-100 d-flex flex-column align-items-start justify-content-start">
            <div className="container d-flex flex-column align-items-center justify-content-center w-100 mt-5 gap-4">
                {data ? (
                    <>
                        {data.is_premium === 0 ? (
                            <div className="d-flex text-center align-items-center justify-content-center w-100 company-details-primium-div">
                                <span>Please upgrade your membership to view all contact information. <b onClick={() => navigate('/pricing')} style={{ cursor: 'pointer' }}>Here</b></span>
                            </div>) : (null)}
                    </>
                ) : (
                    <div className="d-flex text-center align-items-center justify-content-center w-100 company-details-primium-div">
                        <span>Please upgrade your membership to view all contact information. <b onClick={() => navigate('/pricing')} style={{ cursor: 'pointer' }}>Here</b></span>
                    </div>
                )}


                <div className="d-flex align-items-start justify-content-start w-100">
                    <nav
                        style={{
                            "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
                        }}
                        aria-label="breadcrumb"
                    >
                        <ol className="overview-breadcrumb breadcrumb location-div">
                            <li className="breadcrumb-item" onClick={() => { navigate('/') }}><a href="#"><IoHomeOutline /> Home</a></li>
                            <li className="breadcrumb-item" aria-current="page">Posting</li>
                            <li className="breadcrumb-item" aria-current="page">{post.postInfoData.title}</li>
                        </ol>
                    </nav>
                </div>

                <div className="d-flex flex-row w-100">
                    <div className="col-9">
                        <div className="d-flex flex-column align-items-start justify-content-start w-100 detail-company-name gap-4 company-card">
                            <div className="d-flex align-items-between justify-content-between w-100">
                                <div className="d-flex align-items-start justify-content-start gap-3">
                                    <div className="d-flex post-company">
                                        <img src={post.postInfoData.user.country === 'Germany' ? "/Images/germany.png" : "/Images/turkey.png"} width="20px" className="me-2" />
                                        <span>{post.postInfoData.user.country.charAt(0).toUpperCase() + post.postInfoData.user.country.slice(1)}</span>
                                    </div>
                                    <div className="d-flex post-company">
                                        {matchedType ? (
                                            <>
                                                <matchedType.icon className="me-1 fs-5" />
                                                <span>{matchedType.label}</span>
                                            </>
                                        ) : (null)}
                                    </div>
                                    <div className="d-flex post-company">
                                        <span><SlEye className="me-1 fs-5" /> {post.postInfoData.view} Views</span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-end justify-content-end">
                                    <IoMdThumbsUp onClick={(e) => { e.stopPropagation(); handle_add_fav(post.postInfoData._id) }}
                                        className={`fs-4 ${isLiked ? "posting-thumsup-yes" : "posting-thumsup-no"}`} />
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-start w-75 text-start post-info-display">
                                <h2>{post.postInfoData.title}</h2>
                                <p>{post.postInfoData.description}</p>
                            </div>
                            {data && (
                                <>
                                    {data.is_premium !== 0 ? (<>
                                        <div className="d-flex gap-3 align-items-start justify-content-start">
                                            <button className="post-contact-btn" onClick={handle_contact}>Contact Company <FiMessageSquare className="fs-4" /></button>
                                            <button className="post-company-btn" onClick={() => navigate(`/company/${post.postInfoData.user._id}`)}>Go To Company Detail Page</button>
                                        </div>

                                        <div className="d-flex flex-column align-items-start justify-content-start w-100 post-atach-file-heading">
                                            <span>Attached file</span>
                                            <div className="d-flex flex-wrap gap-3 mt-4">
                                                {post.postInfoData.file.length > 0 && (
                                                    <>
                                                        {post.postInfoData.file.map((f, index) => (
                                                            <div className="post-atach-file">
                                                                <img src={`${Backend_URL}/files/${f}`} alt={post.postInfoData.title} />
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                    </>) : (
                                        null
                                    )}
                                </>
                            )}

                            {contact_company && (
                                <>
                                    <div
                                        className="popup-overlay"
                                        style={{
                                            position: "fixed",
                                            top: 0,
                                            left: 0,
                                            width: "100vw",
                                            height: "100vh",
                                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            zIndex: 9999,
                                        }}
                                    >
                                        <div
                                            className="popup-box bg-white rounded shadow-lg position-relative p-0"
                                            style={{
                                                width: "900px",
                                                maxWidth: "90%",
                                                cursor: 'default'
                                            }}
                                        >
                                            <button
                                                onClick={handleClose}
                                                className="btn  position-absolute"
                                                style={{ top: "10px", right: "10px" }}
                                            >
                                                <RxCross2 />
                                            </button>

                                            <div className="d-flex flex-column align-items-start justify-content-start w-100">
                                                <div className="d-flex w-100 border-bottom border-1 px-4 pb-2 pt-3 pop-up-post-head">
                                                    <h3>Contact Company</h3>
                                                </div>
                                                <div className="d-flex flex-column align-items-start justify-content-start w-100 px-4 py-3 gap-4  border-bottom border-1">
                                                    <div className="d-flex flex-column align-items-start justify-conttent-start w-100 gap-1">
                                                        <label>Title <span className="text-danger">*</span></label>
                                                        <input readOnly value={post.postInfoData.title} className="form-control bg-light" />
                                                    </div>
                                                    <div className="d-flex flex-column align-items-start justify-conttent-start w-100 gap-1">
                                                        <label>Message <span className="text-danger">*</span></label>
                                                        <textarea className="form-control" rows={6} value={contect_message} onChange={(e) => setContect_message(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-end justify-content-end w-100 gap-3 p-4">
                                                    <button className="das-button-end save-button" onClick={handle_send_message}>Send</button>
                                                    <button className="das-button-end cancel-button" onClick={handleClose}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}



                        </div>
                        {data && (
                            <>
                                {data.is_premium === 0 ? (null) : (

                                    <div className="d-flex flex-column align-items-start justify-content-start w-100 detail-company-name gap-4 company-card mt-3">
                                        {post.postInfoData.user.is_premium === 2 ? (
                                            <>
                                                <div class="verified-badge">
                                                    <p>Verified</p>
                                                    <p>Premium</p>
                                                    <div class="d-flex justify-content-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 
            3.8-36.7 36.1-17.7 54.6l105.7 103-25 
            145.5c-4.5 26.3 23.2 46 46.4 
            33.7L288 439.6l130.7 68.7c23.2 
            12.2 50.9-7.4 46.4-33.7l-25-145.5 
            105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
            150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </>
                                        ) : post.postInfoData.user.is_premium === 1 ? (
                                            <>
                                                <>
                                                    <div class="verified-badge">
                                                        <p>Verified</p>
                                                        <p>Premium</p>
                                                    </div>
                                                </>
                                            </>
                                        ) : (
                                            <></>
                                        )}

                                        <div className="d-flex flex-row w-100">
                                            <div className="col-6 d-flex flex-column align-items-start justify-content-start">
                                                <span>Company Information</span>
                                                <div className="d-flex flex-row w-100 mt-4">
                                                    <div className="col-4 d-flex">
                                                        <img src={post.postInfoData.user.company_logo ? `${Backend_URL}/files/${post.postInfoData.user.company_logo}` : '/Images/download23.jpeg'} alt={post.postInfoData.user.company_name}
                                                            style={{
                                                                width: "120px",
                                                                height: "120px",
                                                                borderRadius: "50%",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-8 d-flex flex-column align-items-start justify-content-start gap-3">
                                                        <span>{post.postInfoData.user.company_name}</span>
                                                        <div className="d-flex post-company">
                                                            <img src={post.postInfoData.user.country === 'Germany' ? "/Images/germany.png" : "/Images/turkey.png"} width="20px" className="me-2" />
                                                            <span>{post.postInfoData.user.country.charAt(0).toUpperCase() + post.postInfoData.user.country.slice(1)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-6 d-flex flex-column align-items-start justify-content-start">
                                                <span>Contact Information</span>
                                                <div className="d-flex flex-row w-100 mt-4">
                                                    <div className="col-4 d-flex">
                                                        <img src={post.postInfoData.user.company_logo ? `${Backend_URL}/files/${post.postInfoData.user.contact_img}` : ''} alt={post.postInfoData.user.contact_first_name}
                                                            style={{
                                                                width: "120px",
                                                                height: "120px",
                                                                borderRadius: "50%",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-8 d-flex flex-column align-items-start justify-content-start gap-1">
                                                        <div className="post-contact-person">{post.postInfoData.user.contact_first_name || ''}' {post.postInfoData.user.contact_last_name || ''}-{post.postInfoData.user.contact_first_name || ''} <span>{post.postInfoData.user.contact_position || ''}</span></div>
                                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                                            <MdEmail className="fs-6 text-primary" /> <span>{post.postInfoData.user.contact_email || ''}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                                            <IoIosCall className="fs-6 text-primary" /> <span>{post.postInfoData.user.contact_phone_number || ''}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-center gap-1">
                                                            <MdLocationPin className="fs-6 text-primary" /> <span>{post.postInfoData.user.street || ''} {post.postInfoData.user.city || ''} {post.postInfoData.user.country || ''}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-start justify-content-start w-100">
                                            <span>Categories</span>
                                            <div className="d-flex flex-wrap w-100 gap-5">

                                                {post?.postInfoData?.user?.company_category?.length > 0 && (
                                                    <>
                                                        {post.postInfoData.user.company_category.map((cat, index) => (
                                                            <div key={index} className="d-flex flex-column mb-2">
                                                                <div className="d-flex align-items-center gap-2 post-display-category-main">
                                                                    <span className="fs-4">{getIconComponent(cat?.category?.main_category.icon)}</span>
                                                                    <span className="">
                                                                        {cat?.category?.main_category?.label || "No Main Category"}
                                                                    </span>
                                                                </div>
                                                                <div className="d-flex align-items-center justify-content-start gap-2 post-display-category-sub">
                                                                    <span className="fs-4"> {getIconComponent(cat?.category?.icon)}</span>
                                                                    <span className="">
                                                                        {cat?.category?.label || "No Subcategory"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                    </div>

                    <div className="col-3 d-flex flex-column gap-3 ps-3">
                        <div className="d-flex align-items-center justify-content-center w-100 post-sponsor">
                            <span>SPONSORED</span>
                        </div>
                        {post.sponsorList.length > 0 && (
                            <>
                                {post.sponsorList.map((c, index) => (
                                    <div className="d-flex flex-column align-items-center justify-content-center w-100 detail-company-name gap-3 company-card-post" onClick={() => navigate(`/company/${c._id}`)}>
                                        {c.is_premium === 2 ? (
                                            <>
                                                <div class="verified-badge">
                                                    <p>Verified</p>
                                                    <p>Premium</p>
                                                    <div class="d-flex justify-content-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 
            3.8-36.7 36.1-17.7 54.6l105.7 103-25 
            145.5c-4.5 26.3 23.2 46 46.4 
            33.7L288 439.6l130.7 68.7c23.2 
            12.2 50.9-7.4 46.4-33.7l-25-145.5 
            105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
            150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </>
                                        ) : post.postInfoData.user.is_premium === 1 ? (
                                            <>
                                                <>
                                                    <div class="verified-badge">
                                                        <p>Verified</p>
                                                        <p>Premium</p>
                                                    </div>
                                                </>
                                            </>
                                        ) : (
                                            <></>
                                        )}


                                        <div className="d-flex flex-row align-items-end justify-content-center gap-3">

                                            <img
                                                className="comapny-list-logo-post"
                                                src={c.company_logo ? (`${Backend_URL}/files/${c.company_logo}`) : ('/Images/download23.jpeg')}
                                                alt={c.company_name}
                                            />
                                            <div className="d-flex flex-column align-items-start justify-content-center text-start">
                                                <span style={{ fontWeight: '500' }}>{c.company_name}</span>
                                            </div>
                                        </div>

                                        {post?.postInfoData?.user?.company_category?.length > 0 && (
                                            <div className="d-flex flex-wrap gap-3">
                                                {c.company_category.map((cat, index) => (
                                                    <div key={index} className="d-flex align-items-center gap-2 post-sponsor-category">
                                                        {getIconComponent(cat?.icon)}
                                                        <span className="subcategory-label fw-semibold">
                                                            {cat?.label || "No Subcategory"}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}


                                    </div>
                                ))}
                            </>
                        )}


                    </div>
                </div>



            </div>
            <section className="footer-section w-100">
                <Footer />
            </section>
        </div>
    )
}

export default Posting_details;