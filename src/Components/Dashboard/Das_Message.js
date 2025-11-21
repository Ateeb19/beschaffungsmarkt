import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserChats } from "../../redux/userChatSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../redux/userSlice";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useAlert } from "../alert/Alert_message";
import axios from "axios";
import { GrAttachment } from "react-icons/gr";
import { FaRegFolder } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";

const Das_Message = () => {

    const Backend_URL = process.env.REACT_APP_API_URL;
    const Backend_CHAT_URL = process.env.REACT_APP_CHAT_URL;
    const [selected_chat, setSelected_chat] = useState(null);
    const [activeChatId, setActiveChatId] = useState(null);
    const [messageText, setMessageText] = useState("");
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const location = useLocation();

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
    // console.log('chates-: ', chatData);
    // console.log('user data-: ', data);

    const [ws, setWs] = useState(null);
    const [socket, setSocket] = useState(null);
    const userId = data?._id;
    const [uploadedFiles, setUploadedFiles] = useState();
    const [uploadedFileTypes, setUploadedFileTypes] = useState();

    const timeAgo = (dateString) => {
        const created = new Date(dateString);
        const now = new Date();
        const diff = (now - created) / 1000; // diff in seconds

        if (diff < 60) {
            return diff < 10 ? "just now" : `${Math.floor(diff)} seconds ago`;
        }

        const minutes = diff / 60;
        if (minutes < 60) {
            return minutes < 2 ? "a minute ago" : `${Math.floor(minutes)} minutes ago`;
        }

        const hours = minutes / 60;
        if (hours < 24) {
            return hours < 2 ? "an hour ago" : `${Math.floor(hours)} hours ago`;
        }

        const days = hours / 24;
        if (days < 2) {
            return "a day ago";
        }
        if (days < 30) {
            return `${Math.floor(days)} days ago`;
        }

        const months = days / 30;
        if (months < 12) {
            return months < 2 ? "a month ago" : `${Math.floor(months)} months ago`;
        }

        const years = months / 12;
        return years < 2 ? "a year ago" : `${Math.floor(years)} years ago`;
    };

    const handle_chate = async (c) => {
        setActiveChatId(c._id);

        try {
            const res = await axios.post(`${Backend_URL}/api/messages`, {
                chatId: c._id,
                itemsPerPage: 20,
                lastMessageCreatedTime: '',
                page: 1
            }, { withCredentials: true });

            setSelected_chat({
                chat_info: c,
                messages: res.data
            });

            // CLOSE OLD SOCKET IF EXISTS
            if (socket) {
                socket.close();
            }
            connectWebSocket(c._id);
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
    };

    const connectWebSocket = (chatId) => {
        // close previous connection if exists
        if (socket) socket.close();

        const ws = new WebSocket(`${Backend_CHAT_URL}`);
        setSocket(ws);

        ws.onopen = () => {
            console.log("WebSocket Connected");

            // authenticate immediately after connection
            ws.send(JSON.stringify({
                type: "authenticate",
                data: {
                    userId: userId,
                    chatId: chatId,
                }
            }));
        };

        ws.onmessage = (event) => {
            const incoming = JSON.parse(event.data);

            if (incoming.type === "reply_message") {
                // update UI in real-time
                setSelected_chat(prev => ({
                    ...prev,
                    messages: [...prev.messages, incoming.data]
                }));
            }
        };

        ws.onclose = () => console.log("WebSocket Disconnected");
        ws.onerror = (error) => console.log("WebSocket Error:", error);
    };


    const handleSendMessage = () => {
        const isMessageEmpty = !messageText || messageText.trim() === "";
        if (isMessageEmpty) {
            showAlert(<div className="d-flex gap-1 justify-content-center align-items-center text-start me-3">
                            <TiWarning className="text-warning fs-5" />
                            <span>Write a message!</span> </div>, "warning")
            return;
        }

        if (!socket || socket.readyState !== WebSocket.OPEN) {
            alert("WebSocket not connected");
            return;
        }

        socket.send(JSON.stringify({
            type: "reply_message",
            data: {
                chatId: activeChatId,
                senderId: userId,
                message: messageText,
                file: uploadedFiles || null,
                fileType: uploadedFileTypes || null,
            }
        }));

        setMessageText("");
        handle_chate(selected_chat.chat_info);
    };

    useEffect(() => {
        const box = document.querySelector(".dash-right-msg-chat-box");
        if (box) box.scrollTop = box.scrollHeight;
    }, [selected_chat?.messages]);

    const formatChatDate = (isoString) => {
        const date = new Date(isoString);
        const now = new Date();

        const options = {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        };

        const formattedDate = date.toLocaleString("en-US", options);

        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);

        let relative = "";

        if (diffSec < 60) relative = `${diffSec} sec ago`;
        else if (diffMin < 60) relative = `${diffMin} min ago`;
        else if (diffHr < 24) relative = `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
        else if (diffDay === 1) relative = `a day ago`;
        else relative = `${diffDay} days ago`;

        return `${formattedDate} (${relative})`;
    };

    return (
        <div className="d-flex flex-column align-items-start justify-content-start w-100 p-1">
            <div className="d-flex align-items-start justify-content-start w-100 dash-message"><h2>Your Messages</h2></div>
            <div className="row w-100 dash-message-box mt-1 p-1 dash-message-outter-div">
                <div className="col-4 dash-message-box-left">
                    <div className="w-100 py-1 px-2">
                        <input className="form-control w-100 message-search" placeholder="Search..." />
                    </div>
                    <div className="w-100 mt-4 d-flex flex-column align-items-start justify-content-start">
                        {chatData?.allChatData?.length > 0 && (
                            <>
                                {chatData?.allChatData?.map((c, key) => (
                                    <>
                                        <div
                                            className={`d-flex flex-column w-100 align-items-start justify-content-start border-bottom dash-msg-left ${activeChatId === c._id ? "dash-msg-left-active" : "dash-msg-left"}`}
                                            key={key}
                                            onClick={() => handle_chate(c)}
                                        >
                                            <div className="d-flex align-items-start justify-content-between w-100 ">
                                                <div className="d-flex flex-column align-items-start justify-content-start">
                                                    <h3>{c.title}</h3>
                                                    {c.sender.contact_first_name && c.sender.contact_last_name ? (
                                                        <>
                                                            <span>{c.sender.contact_first_name} {c.sender.contact_last_name}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>{c.sender.company_name}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <p>{timeAgo(c.created_time)}</p>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="col-8 dash-message-box-right">
                    {selected_chat && (
                        <>
                            <div className="d-flex flex-column align-items-start justify-content-start w-100 p-1 dash-chat-outer-div">
                                <div className="dash-right-msg-top w-100 d-flex flex-column align-items-start gap-2 py-3">
                                    <h1>{selected_chat.chat_info.title}</h1>
                                    <button
                                        className=""
                                        onClick={() => navigate(`/company/${selected_chat.chat_info.sender._id}`)}
                                    >{selected_chat.chat_info.sender.contact_first_name && selected_chat.chat_info.sender.contact_last_name ? (
                                        <>
                                            <span>{selected_chat.chat_info.sender.contact_first_name} {selected_chat.chat_info.sender.contact_last_name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{selected_chat.chat_info.sender.company_name}</span>
                                        </>
                                    )}</button>
                                </div>
                                <div className="dash-right-msg-chat-box w-100 d-flex flex-column align-items-start justify-content-end py-3">
                                    {selected_chat?.messages?.slice()
                                        .reverse().map((chat, key) => (
                                            <>
                                                <div className="chat-inner-box w-100 d-flex flex-column align-items-start justify-content-start">
                                                    <div className="chat-box-profile d-flex flex-row align-items-start justify-content-start gap-2">
                                                        <img src={chat.sender ? selected_chat.chat_info.sender.contact_img ? `${Backend_URL}/files/${selected_chat.chat_info.sender.contact_img}` : '/Images/user-avatar-CZ6R_fL7.webp' : selected_chat.chat_info.receiver.contact_img ? `${Backend_URL}/files/${selected_chat.chat_info.receiver.contact_img}` : '/Images/user-avatar-CZ6R_fL7.webp'} alt="" />
                                                        <div className="chat-inner-box-id d-flex flex-column align-items-start justify-content-start">
                                                            {chat.sender ? selected_chat.chat_info.sender.contact_first_name ? <>
                                                                <label>{selected_chat.chat_info.sender.contact_first_name} {selected_chat.chat_info.sender.contact_last_name}</label>
                                                                <span>{selected_chat.chat_info.sender.contact_email}</span>
                                                            </> : <>
                                                                <label>{selected_chat.chat_info.sender.company_name}</label>

                                                            </> : selected_chat.chat_info.receiver.contact_first_name ? <>
                                                                <label>{selected_chat.chat_info.receiver.contact_first_name} {selected_chat.chat_info.receiver.contact_last_name}</label>
                                                                <span>{selected_chat.chat_info.receiver.contact_email}</span>
                                                            </> : <>
                                                                <label>{selected_chat.chat_info.receiver.company_name}</label>
                                                            </>}
                                                        </div>
                                                    </div>
                                                    <div className="chat-box-text d-flex ftranspostlex-column align-items-start justify-content-start w-100">
                                                        <span>{chat.message} </span>
                                                        {chat?.file.map((f, key) => (
                                                            <>
                                                                <div key={key}
                                                                    // onClick={() => navigate(`${Backend_URL}/files/${f}`)}
                                                                    onClick={() => {
                                                                        const link = document.createElement("a");
                                                                        link.href = `${Backend_URL}/files/${f}`;
                                                                        link.download = f; // forces download
                                                                        document.body.appendChild(link);
                                                                        link.click();
                                                                        document.body.removeChild(link);
                                                                    }}
                                                                    className="chat-box-text-file d-flex flex-column align-items-start justify-content-start w-100">
                                                                    <div className="chat-box-text-file-inner d-flex flex-column align-items-start justify-content-start">
                                                                        <FaRegFolder className="fs-3 text-secondary" />
                                                                        <span>{f}</span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ))}
                                                    </div>

                                                    <div className="chat-box-date d-flex align-items-start justify-content-end w-100">
                                                        <span>{formatChatDate(chat.created_time)} </span>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                </div>

                                <div className="dash-right-msg-chat-input w-100 d-flex flex-column align-items-start justify-content-start py-3 gap-3">
                                    <textarea
                                        rows={3}
                                        className="form-control w-100"
                                        placeholder="Type your reply here..."
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                    />

                                    <div className="d-flex flex-row align-items-start justify-content-between w-100 px-2">
                                        <GrAttachment className="fs-4 text-secondary" />

                                        <button
                                            className="das-button-end save-button"
                                            onClick={handleSendMessage}
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Das_Message;