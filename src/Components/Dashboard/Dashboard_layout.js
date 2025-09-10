import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Dashboard_layout = () => {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar (col-3) */}
                    <div className="col-3 bg-light vh-100 p-3">
                        <h4>Dashboard</h4>
                        <ul className="nav flex-column gap-2">
                            <li><NavLink to="/dashboard/home" className="nav-link">Home</NavLink></li>
                            <li><NavLink to="/dashboard/message" className="nav-link">Messages</NavLink></li>
                            <li><NavLink to="/dashboard/profile" className="nav-link">Profile</NavLink></li>
                        </ul>
                    </div>

                    {/* Main content (col-9) */}
                    <div className="col-9 p-4">
                        {/* 👇 child route will render here */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}


export default Dashboard_layout;