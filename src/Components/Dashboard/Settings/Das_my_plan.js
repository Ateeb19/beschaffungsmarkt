import React, { useEffect } from "react";
import { useAlert } from "../../alert/Alert_message";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../../redux/userSlice";
import { FiCheckCircle } from "react-icons/fi";

const Das_my_plane = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const location = useLocation();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);
    return (
        <div className="d-flex flex-column w-100 align-items-start justify-content-start p-3">
            <div className="d-flex flex-column align-items-start justify-content-start w-100">
                {data.is_premium === 2 ?
                    <>
                        <div className="pricing-dash-display d-flex flex-column align-items-start justify-content-start w-100 text-start">
                            <h2>Current Plan: <b>Premium +</b></h2>
                            <p>Advanced features for pros who need more customization.</p>
                            <ul classname='pricing-ul'>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Full Features for Company Website</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> 1st Priority + Sponsored for Listing</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Unlimited Messaging for Communication</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> 5 Main and 5 Subcategories</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> DE/TR/EN for Company Languages</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Full Access to Trade Platform</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Upload 20 Postings</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Upload 20 Products</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Upload 20 Certificates</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Upload 100 Keywords</li>
                                <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Personal Agent</li>
                            </ul>
                        </div>
                    </> : data.is_premium === 1 ?
                        <>
                            <div className="pricing-dash-display d-flex flex-column align-items-start justify-content-start w-100 text-start">
                                <h2>Current Plan: <b>Premium </b></h2>
                                <p>Better for growing businesses that want more customers.</p>
                                <ul classname='pricing-ul'>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Full Features for Company Website</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> 2nd Priority for Listing</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Unlimited Messaging for Communication</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> 5 Main and 5 Subcategories</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> DE/TR/EN for Company Languages</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Full Access to Trade Platform</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Upload 10 Postings</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Upload 5 Products</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Upload 5 Certificates</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Upload 50 Keywords</li>
                                </ul>
                            </div>
                        </> :
                        <>
                            <div className="pricing-dash-display d-flex flex-column align-items-start justify-content-start w-100 text-start">
                                <h2>Current Plan: <b>Free</b></h2>
                                <p>All the basics for businesses that are just getting started.</p>
                                <ul classname='pricing-ul'>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Limited for Company Website</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> 3rd Priority for Listing</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> Limited Messaging for Communication</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> 1 Main and 1 Subcategory</li>
                                    <li><FiCheckCircle className="fs-4 pe-2" style={{ color: '#4097fb' }} /> EN for Company Language</li>
                                </ul>
                            </div>
                        </>}
            </div>
            {data.is_premium === 2 ? null : <>
                <div className="d-flex flex-column align-items-start justify-content-start mt-3">
                    <button className="pricing-button-dash btn" onClick={() => navigate('/pricing')}>Upgrade Plan</button>
                </div>
            </>}
        </div>
    )
}

export default Das_my_plane;