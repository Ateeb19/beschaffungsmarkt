import React, { useState } from "react";
import { CFormSwitch } from '@coreui/react'

const Das_notifications = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (nextChecked) => {
        setChecked(nextChecked);
    };
    return (
        <div className="d-flex flex-column w-100 align-items-start justify-content-start">
            <h5>Notifications</h5>

            <div className="d-flex flex-row w-100 align-items-start justify-content-start gap-3">
                <span className="me-2">Email Notification</span>

                <CFormSwitch className="" reverse type="checkbox" id="reverseFormSwitch1" />
            </div>
        </div>
    )
}

export default Das_notifications;