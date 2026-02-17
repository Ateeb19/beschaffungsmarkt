import React, { useEffect, useState } from "react";
import "../../Assets/css/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/userSlice";
import { logoutUser } from "../../redux/userSlice";
import { GoBellFill } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { fetchUserChats } from "../../redux/userChatSlice";
import LanguageDropdown from "./LanguageDroper";
import { setDroper_open } from "../../redux/Close_droper";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("procurement_token");
  const isDashboard = location.pathname.startsWith("/dashboard");
  const [notification, setNotification] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    data,
    requestStatus: userStatus,
    error: userError,
  } = useSelector((state) => state.user);

  const {
    chatData,
    requestStatus: chatStatus,
    error: chatError,
  } = useSelector((state) => state.user_chat);

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchUserChats());
  }, [dispatch, location.pathname]);

  // console.log('chat -: ', chatData);

  useEffect(() => {
    const chat = chatData?.allChatData || [];

    const hasUnread = chat.some((c) => c.unreadMsg > 0);

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

  // console.log(notification);
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
    console.log("logou");
    try {
      const Backend_URL = process.env.REACT_APP_API_URL;
      console.log("logou");
      const res = await axios.post(
        `${Backend_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(logoutUser());
      localStorage.setItem("token", "");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const current_url = location.pathname;

  console.log("current_url -: ", current_url);

  const go = (path) => {
    navigate(path);
    setMobileOpen(false); // CLOSE mobile menu
  };

  return (
    <>
      <div className="w-100 nav-bar-wrap">
        <div className={isDashboard ? "container-fluid" : "container"}>
          {/* TOP BAR */}
          <div className="d-flex flex-row justify-content-between align-items-center">
            {/* LEFT SIDE */}

            <div className="d-flex align-items-center justify-content-start gap-2 gap-md-3">
              <div className="nav-image flex-shrink-0">
                <img
                  src="/beschaffungsmarkt_images/logo-eWxZ6qaB.svg"
                  alt="logo"
                  width={196}
                  onClick={() => navigate("/")}
                />
              </div>

              <div className="nav-laungage d-none d-md-block ms-lg-0">
                <LanguageDropdown />
              </div>
            </div>



            {/* DESKTOP MENU */}
            <div className="d-none d-lg-flex align-items-center justify-content-end nav-links gap-4">
              <span
                onClick={() => navigate("/")}
                className={current_url === "/" && "active-nav-bar"}
              >
                Home
              </span>
              <span
                onClick={() => navigate("/posting")}
                className={current_url === "/posting" && "active-nav-bar"}
              >
                Posting
              </span>
              <span
                onClick={() => navigate("/companies")}
                className={current_url === "/companies" && "active-nav-bar"}
              >
                Companies
              </span>
              <span
                onClick={() => navigate("/service")}
                className={current_url === "/service" && "active-nav-bar"}
              >
                Our Service
              </span>
              <span
                onClick={() => navigate("/pricing")}
                className={current_url === "/pricing" && "active-nav-bar"}
              >
                Pricing
              </span>
              <span
                onClick={() => navigate("/contact")}
                className={current_url === "/contact" && "active-nav-bar"}
              >
                Contact
              </span>

              {data ? (
                <div className="d-flex align-items-center jusitfy-content-center gap-3 nav-buttons">
                  <div
                    className="d-flex ailgn-items-center justify-content-center"
                    onClick={() => navigate("/dashboard/message")}
                  >
                    <GoBellFill
                      className={`fs-4 ${current_url === "/dashboard/message" && "active-nav-bar"}`}
                    />
                    {notification && <div className="notification_dot"></div>}
                  </div>

                  <div
                    className="user-initials d-flex flex-column gap-5 align-items-end justify-content-start"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    <div className="rounded-circle d-flex gap- nav-f_l_name">
                      <span>{data.first_name.slice(0, 1).toUpperCase()}</span>
                      <span>{data.last_name.slice(0, 1).toUpperCase()}</span>
                    </div>

                    {open && (
                      <div className="dropdown-menu d-flex flex-column align-items-start justify-content-start gap-2 bg-black text-start">
                        <button onClick={() => navigate("/dashboard/home")}>
                          <LuUser className="fs-5 me-1" /> Dashboard
                        </button>
                        <button onClick={handleLogout}>
                          <MdLogout className="fs-5 me-1" /> Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center jusitfy-content-center gap-2 nav-buttons">
                  <button onClick={() => navigate("/register")}>Sign Up</button>
                  <button onClick={() => navigate("/login")}>Login</button>
                </div>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <div className="d-flex gap-2">
              {data ? (
                <>
                  <div className="d-flex align-items-center jusitfy-content-center gap-3 nav-buttons d-block d-md-none">
                    <div
                      className="d-flex ailgn-items-center justify-content-center"
                      onClick={() => navigate("/dashboard/message")}
                    >
                      <GoBellFill
                        className={`fs-4 ${current_url === "/dashboard/message" && "active-nav-bar"}`}
                      />
                      {notification && <div className="notification_dot"></div>}
                    </div>

                    <div
                      className="user-initials d-flex flex-column gap-5 align-items-end justify-content-start"             
                      onClick={() => setOpen(!open)}
                    >
                      <div className="rounded-circle d-flex gap- nav-f_l_name">
                        <span>{data.first_name.slice(0, 1).toUpperCase()}</span>
                        <span>{data.last_name.slice(0, 1).toUpperCase()}</span>
                      </div>

                      {open && (
                        <div className="dropdown-menu d-flex flex-column align-items-start justify-content-start gap-2 bg-black text-start">
                          <button onClick={() => navigate("/dashboard/home")}>
                            <LuUser className="fs-5 me-1" /> Dashboard
                          </button>
                          <button onClick={handleLogout}>
                            <MdLogout className="fs-5 me-1" /> Sign out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex align-items-center jusitfy-content-center gap-2 nav-buttons d-block d-md-none">
                    <button onClick={() => navigate("/login")}>Login</button>
                  </div>
                </>
              )}

              <button
                className="d-lg-none border-0 bg-transparent fs-2 ms-2 text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                ☰
              </button>
            </div>
          </div>

          {/* MOBILE MENU (NOW CORRECTLY OUTSIDE FLEX ROW) */}
          {mobileOpen && (
            <div className="d-lg-none bg-dark text-white p-4 rounded mt-3">

              <div className="d-flex flex-column gap-3">
                <div className="nav-laungage ms-lg-0">
                  <LanguageDropdown />
                </div>
                <span onClick={() => go("/")}>Home</span>
                <span onClick={() => go("/posting")}>Posting</span>
                <span onClick={() => go("/companies")}>Companies</span>
                <span onClick={() => go("/service")}>Our Service</span>
                <span onClick={() => go("/pricing")}>Pricing</span>
                <span onClick={() => go("/contact")}>Contact</span>                
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Navbar);
