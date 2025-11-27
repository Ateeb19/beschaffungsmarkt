import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/userSlice";
import { logoutUser } from "../../redux/userSlice";
import { GoBellFill } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { fetchUserChats } from "../../redux/userChatSlice";


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem("procurement_token");
    const isDashboard = location.pathname.startsWith("/dashboard");
    const [notification, setNotification] = useState(false);
    const dispatch = useDispatch();

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
    }, [dispatch, location.pathname]);

    console.log('chat -: ', chatData);

    useEffect(() => {
        const chat = chatData?.allChatData || [];

        const hasUnread = chat.some(c => c.unreadMsg > 0);

        setNotification(hasUnread);
    }, [data, chatData]);

    // useEffect(() => {
    //     const notify = () => {
    //         const chat = chatData?.allChatData || [];
    //         chat.forEach(c => {
    //             if (c.unreadMsg != 0) {
    //                 setNotification(true);
    //             }
    //         });
    //     }
    //     notify();
    // }, [data, chatData])

    console.log(notification);
    // const { data, requestStatus, error } = useSelector((state) => state.user);
    // useEffect(() => {
    //     const token = localStorage.getItem("procurement_token");
    //     if (token) {
    //         dispatch(fetchUserInfo());
    //     }
    // }, [dispatch]);
    // console.log(data);
    // console.log('request-: ', requestStatus);

    useEffect(() => {
        setOpen(false);
    }, [data]);

    const handleLogout = async () => {
        console.log('logou')
        try {
            const Backend_URL = process.env.REACT_APP_API_URL;
            console.log('logou')
            const res = await axios.post(
                `${Backend_URL}/api/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            dispatch(logoutUser());
            localStorage.setItem('token', '');
            navigate("/login");
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };
    return (
        <>
            <div className="w-100 nav-bar-wrap">
                {/* <div className="container"> */}
                <div className={isDashboard ? "container-fluid" : "container"}>
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
                            <span onClick={() => { navigate('/posting') }}>Posting</span>
                            <span onClick={() => { navigate('/companies') }}>Companies</span>
                            <span onClick={() => { navigate('/service') }}>Our Service</span>
                            <span onClick={() => { navigate('/pricing') }}>Pricing</span>
                            <span onClick={() => { navigate('/contact') }}>Contact</span>

                            {data ? (
                                // {requestStatus === 'fulfilled' ? (
                                <>
                                    <div className="d-flex align-items-center jusitfy-content-center gap-3 nav-buttons">
                                        <div className="d-flex ailgn-items-center justify-content-center" onClick={() => { navigate('/dashboard/message') }}><GoBellFill className="fs-4" />{notification && (<>
                                            <div className="notification_dot"></div>
                                        </>)} </div>
                                        <div
                                            className="user-initials d-flex flex-column gap-5 align-items-end justify-content-start"
                                            onMouseEnter={() => setOpen(true)}
                                            onMouseLeave={() => setOpen(false)}
                                        >
                                            <div className="rounded-circle d-flex gap- nav-f_l_name">
                                                <span className="">
                                                    {data.first_name.slice(0, 1).toUpperCase()}
                                                </span>
                                                <span className="">
                                                    {data.last_name.slice(0, 1).toUpperCase()}
                                                </span>
                                            </div>

                                            {open && (
                                                <div className="dropdown-menu d-flex flex-column align-items-start justify-content-start gap-2 bg-black text-start">
                                                    <button onClick={() => { navigate('/dashboard/home') }}>< LuUser className="fs-5 me-1" /> Dashboard</button>
                                                    <button onClick={handleLogout}><MdLogout className="fs-5 me-1" /> Sign out</button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="d-flex align-items-center jusitfy-content-center gap-2 nav-buttons">
                                        <button onClick={() => { navigate('/register') }}>Sign Up</button>
                                        <button onClick={() => { navigate('/login') }}>Login</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;