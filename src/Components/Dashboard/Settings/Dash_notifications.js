import React, { useEffect, useState } from "react";
import { CFormSwitch } from '@coreui/react'
import axios from "axios";
import { useAlert } from "../../alert/Alert_message";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../../redux/userSlice";
import { useLocation } from "react-router-dom";
const Das_notifications = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const { showAlert } = useAlert();
    const location = useLocation();

    const dispatch = useDispatch();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);

    const [email_button, setEmail_button] = useState(false);
    const [notificaiton_button, setNotification_button] = useState(false);

    useEffect(() => {
        setEmail_button(data.email_notification);
        setNotification_button(data.news_notification);
    }, [data])

    const handle_email = async () => {
        setEmail_button(!email_button);

        try {
            const res = await axios.get(`${Backend_URL}/api/users/update-email-notification`, {
                withCredentials: true,
            });
            if (res.data.status === true) {
                showAlert(res.data.msg, 'success')
            }
            if (res.data.status === false) {
                showAlert(res.data.msg, 'danger');
            }
        } catch (err) {

            console.log(err);
        }
    }
    const handle_notification = async () => {
        setNotification_button(!notificaiton_button)
        try {
            const res = await axios.get(`${Backend_URL}/api/users/update-news-notification`, {
                withCredentials: true,
            });
            if (res.data.status === true) {
                showAlert(res.data.msg, 'success')
            }
            if (res.data.status === false) {
                showAlert(res.data.msg, 'danger');
            }
        } catch (err) {

            console.log(err);
        }
    }

    return (
        <div className="add-post-wrapper text-start">
            <div className="">
                <h5 className="mb-4">New Post</h5>
                <div className="d-flex flex-row w-100 align-items-start justify-content-start gap-5">
                    <div className="d-flex flex-row notification-control align-items-start justify-content-start gap-1 ms-2 me-2">
                        <span className="me-2">Email Notification</span>
                        <CFormSwitch className="" checked={email_button} onChange={handle_email} reverse type="checkbox" id="reverseFormSwitch1" />
                    </div>
                    <div className="d-flex flex-row notification-control align-items-start justify-content-start gap-1 ms-2 me-2">
                        <span className="me-2">News Notification</span>
                        <CFormSwitch className="" checked={notificaiton_button} onChange={handle_notification} reverse type="checkbox" id="reverseFormSwitch1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Das_notifications;