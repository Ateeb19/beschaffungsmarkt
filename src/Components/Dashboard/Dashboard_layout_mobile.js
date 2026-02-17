import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaRegBuilding } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/userSlice";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "../alert/Alert_message"

const Dashboard_layout_mobile = () => {
    const navigate = useNavigate();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [list, setList] = useState('');
    const [show_company, setShow_company] = useState(false);
    const [show_post, setShow_post] = useState(false);
    const [show_Setting, setShow_Setting] = useState(false);
    const { showAlert } = useAlert();

    const dispatch = useDispatch();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        const token = localStorage.getItem("procurement_token");
        if (token) {
            dispatch(fetchUserInfo());
        }
    }, [dispatch]);

    if (requestStatus === 'rejected') {
        localStorage.setItem("procurement_token", "");
        showAlert("Token Expire Login Again");
        navigate('/login');
    }

    useEffect(() => {
        const token = localStorage.getItem("procurement_token");
        console.log("this is token-:", token);

        if (!token || token === "undefined" || token === "null") {
            console.log("token is not valid, redirecting to login...");
            showAlert("Token is not valid");
            navigate("/login", { replace: true });
        } else {
            console.log("token found");
        }

        setCheckingAuth(false);
    }, [navigate]);


    if (checkingAuth || !data) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="container-fluid d-flex flex-row align-items-center justify-content-center w-100 p-0 dashboard">

                <div className="dashboar-left-div pt-4">
                    {/* <div className="d-flex flex-column align-items-center justify-content-center w-100">
                        <div className="das-left-pic mb-3">
                            <img src="/Images/user-avatar-CZ6R_fL7.webp" alt="" width="100%" />
                        </div>

                        <span>{data.first_name} {data.last_name}</span>
                    </div> */}

                    <div className="dashboard-menue-list d-flex flex-column align-items-center justify-content-center w-100 mt-4">
                        <ul className="d-flex flex-column align-items-center justify-content-center w-100 p-0">
                            <li className={`w-100 text-start ${list === 'home' ? 'das-li-bg' : ''}`} onClick={() => { navigate("/dashboard/home"); setList('home') }} ><IoHomeOutline className="fs-5 me-2" /> Dashboard</li>
                            <li className={`w-100 text-start ${list === 'message' ? 'das-li-bg' : ''}`} onClick={() => { navigate("/dashboard/message"); setList('message') }} ><FiMessageCircle className="fs-5 me-2" /> Messages</li>
                            <li className={`w-100 text-start d-flex flex-row justify-content-between ${list === 'company' ? 'das-li-bg' : ''}`} onClick={() => { setShow_company(!show_company); setList('company'); setShow_post(false); setShow_Setting(false) }} ><div className="d-flex flex-column align-items-center justify-content-end"><FaRegBuilding className="fs-5 me-2" /> Company</div> <div>{show_company ? (< FaAngleUp />) : (<FaAngleDown />)} </div></li>
                            {show_company && (
                                <div className="">
                                    <ul className="das-sub-menu-ul">
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_company(!show_company); navigate("/dashboard/company/general-settings") }}>General Settings</li>
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_company(!show_company); navigate("/dashboard/company/contact-settings") }}>Contact Settings</li>
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_company(!show_company); navigate("/dashboard/company/product-management?page=1") }}>Product Management</li>
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_company(!show_company); navigate("/dashboard/company/certificates?page=1") }}>Certificates</li>
                                    </ul>
                                </div>
                            )}

                            <li className={`w-100 text-start d-flex flex-row justify-content-between ${list === 'post' ? 'das-li-bg' : ''}`} onClick={() => { setShow_post(!show_post); setList('post'); setShow_company(false); setShow_Setting(false) }} ><div className="d-flex flex-column align-items-center justify-content-end"><MdOutlinePostAdd className="fs-5 me-2" /> Posts</div> <div> {show_post ? (< FaAngleUp />) : (<FaAngleDown />)}</div></li>
                            {show_post && (
                                <div className="">
                                    <ul className="das-sub-menu-ul">
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_post(!show_post); navigate("/dashboard/post/my-posts?page=1") }}>My Posts</li>
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_post(!show_post); navigate("/dashboard/post/new-post") }}>Add New Post</li>
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_post(!show_post); navigate("/dashboard/post/like-posts?page=1") }}>Favourites</li>
                                    </ul>
                                </div>
                            )}

                            <li className={`w-100 text-start d-flex flex-row justify-content-between ${list === 'setting' ? 'das-li-bg' : ''}`} onClick={() => { setShow_Setting(!show_Setting); setList('setting'); setShow_company(false); setShow_post(false) }} ><div className="d-flex flex-column align-items-center justify-content-end"><RiUserSettingsLine className="fs-5 me-2" /> Settings</div> <div> {show_Setting ? (< FaAngleUp />) : (<FaAngleDown />)}</div></li>
                            {show_Setting && (
                                <div className="">
                                    <ul className="das-sub-menu-ul">
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_Setting(!show_Setting); navigate("/dashboard/profile") }}>Profile</li>
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_Setting(!show_Setting); navigate("/dashboard/my-plan") }}>My Plan</li>
                                        <li className="w-100 text-start d-flex flex-row justify-content-between das-sub-menu" onClick={() => { setShow_Setting(!show_Setting); navigate("/dashboard/notifications?page=1") }}>Notifications</li>
                                    </ul>
                                </div>
                            )}

                        </ul>
                    </div>
                </div>

                <div className="dashboard-right-div">
                    <Outlet />
                </div>
            </div>
        </>
    )
}


export default React.memo(Dashboard_layout_mobile);