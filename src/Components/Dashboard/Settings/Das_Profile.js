import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../alert/Alert_message";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../../redux/userSlice";
import axios from "axios";
import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

const DragAndDrop = ({ accept, onFileDrop, label, className }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                onFileDrop(file);
            }
        },
        [onFileDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            className={`d-flex flex-column align-items-center justify-content-center text-center ${className}`}
        >
            <input {...getInputProps()} />
            <p>{label}</p>
        </div>
    );
};
const Das_Profile = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { showAlert } = useAlert();

    const [image_changed, setImage_changed] = useState(false);
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [current_password, setCurrent_password] = useState('');
    const [new_password, setNew_password] = useState('');
    const [confirm_password, setConfirm_password] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);

    console.log('user data -: ', data);


    if (requestStatus === 'rejected') {
        localStorage.setItem("procurement_token", "");
        showAlert("Token Expire Login Again");
        navigate('/login');
    }

    useEffect(() => {
        if (data.avatar) {
            setSelectedFile(data.avatar || '');
            setSelectedImage(data.avatar || '');
            setImage_changed(false);
        } else {
            setSelectedFile('');
            setSelectedImage('');
        }
        setFirst_name(data.first_name || '');
        setLast_name(data.last_name || '');

        // setCurrent_password(data.contact_position || '');
    }, [data, location])

    const handleFileDrop = (file) => {
        setImage_changed(true);
        setSelectedFile(file);
        setSelectedImage(URL.createObjectURL(file));
    };

    const [errors, setErrors] = useState('');

    const handle_update_profile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", first_name);
        formData.append("lastName", last_name);

        if (image_changed) {
            if (selectedFile) {
                formData.append("avatarImg", selectedFile);
            } else {
                formData.append("avatarImg", "false");
            }
        }

        try {
            const response = await axios.post(`${Backend_URL}/api/users/update-user-profile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            showAlert(response.data.msg, "success")
            navigate('/dashboard')
            console.log("Contact Info updated successfully");
        } catch (err) {
            const errorData = err.response.data;

            setErrors({});

            if (errorData) {
                const newErrors = {};
                for (const key in errorData) {
                    if (errorData[key]) {
                        newErrors[key] = errorData[key];
                    }
                }
                setErrors(newErrors);
            }
        }
    }

    const handle_reset_password = async (e) => {
        e.preventDefault();

        if (current_password.length <= 0) {
            setErrors({ currentPassword: 'Current password is required.' });
            return;
        }


        if (new_password.length <= 0) {
            setErrors({ newPassword: 'New password is required.' });
            return;
        }

        // if (new_password.length > 8) {
        //     setErrors({ newPassword: 'Password must be minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character' });
        //     return;
        // }
        if (confirm_password !== new_password) {
            setErrors({ confirmPassword: 'Passwords must match.' });
            return;
        } else {
            try {
                const response = await axios.post(`${Backend_URL}/api/users/change-password`,
                    {
                        currentPassword: current_password,
                        newPassword: new_password,
                    }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });

                showAlert(response.data.msg, "success")
                navigate('/dashboard')
                console.log("Contact Info updated successfully");
            } catch (err) {
                console.log(err)
                showAlert(err.response.data.msg);
                const errorData = err.response.data;
                setErrors({});

                if (errorData) {
                    const newErrors = {};
                    for (const key in errorData) {
                        if (errorData[key]) {
                            newErrors[key] = errorData[key];
                        }
                    }
                    setErrors(newErrors);
                }
            }
        }
    }

    const handle_email_varification = async () => {
        try {
            const res = await axios.post(`${Backend_URL}/api/auth/send-verify-email`, {
                email: data.email,
            }, {
                withCredentials: true,
            })

            if (res.data.status) {
                showAlert(<div className="d-flex align-items-center justify-content-start gap-1">
                    <IoIosCheckmarkCircle className="text-success fs-1" />
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
                    <MdError className="text-danger fs-3" />
                    {errorMessage}
                </div>,
                "danger"
            );
        }
    }
    return (
        <div className="d-flex flex-column align-items-start justify-content-start w-100">
            <h5 style={{ fontWeight: '700' }}>User Profile</h5>
            <div className="d-flex flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-2">
                <div className="d-flex flex-row w-100 align-items-start justify-content-start text-start">
                    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <div className="image-div-das-general-form d-flex flex-column align-items-center justify-content-center w-100">
                            {selectedImage ? (
                                <div className="d-flex flex-row align-item-end justify-content-end">

                                    <img
                                        src={!image_changed ? `${Backend_URL}/files/${selectedFile}` : selectedImage}
                                        // src={!image_changed ? `http://localhost:5001/files/${selectedFile}` : selectedImage}
                                        // src={selectedImage}
                                        alt="Selected"
                                        className="rounded-circle border border-1 border-dark image-div-das-image"
                                    />
                                    <RxCross2 style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { setSelectedFile(''); setSelectedImage(''); setImage_changed(true) }} />
                                </div>
                            ) : (
                                <>
                                    <DragAndDrop
                                        accept="image/*"
                                        onFileDrop={handleFileDrop}
                                        className="image-div-das-image-upload"
                                        label={
                                            <>
                                                <IoCloudUploadOutline className="fs-2 mb-3" /> <p><b>Click to upload</b> or drag and drop</p> <p style={{ fontSize: '12px' }}> SVG, PNG, JPG or WEBP</p>
                                            </>
                                        } />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6 d-flex flex-column align-items-start justify-content-end gap-3 ps-4">
                        {data.is_verified ? null : (
                            <>
                                <div className="d-flex text-start dssh-profile-email-var w-100">
                                    <p>Your email has not been verified yet. You need to check your email before you can do anything else.</p>
                                </div>

                                <div className="d-flex align-item-end justify-content-end p-0 w-100">
                                    <button className="das-button-end save-button" onClick={handle_email_varification}>Get the verified email</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="d-flex flex-row w-100 align-items-start justify-content-start text-start">
                    <div className="col-md-6 d-flex flex-column align-items-start justify-content-center gap-3 pe-4">
                        <div className="w-100">
                            <label for="website" className="das-form-label">First Name</label>
                            <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} class={`form-control ${errors.firstName ? 'border-danger' : ''}`} id="Fax Number" aria-describedby="website" name="firstName" placeholder="First Name"></input>
                            {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                        </div>

                        <div className="w-100">
                            <label for="website" className="das-form-label">Last Name </label>
                            <input type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)} class={`form-control ${errors.lastName ? 'border-danger' : ''}`} id="Website" aria-describedby="website" name="lastName" placeholder="Last Name"></input>
                            {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                        </div>

                        <div className="w-100">
                            <label for="website" className="das-form-label">Email</label>
                            <input type="text" class="form-control" id="HS Code" aria-describedby="website" value={data.email} disabled placeholder="Email"></input>
                        </div>

                        <div className="d-flex align-item-end justify-content-end p-0 w-100">
                            <button className="das-button-end save-button" onClick={handle_update_profile}>Save</button>
                        </div>
                    </div>


                    <div className="col-md-6 d-flex flex-column align-items-start justify-content-center gap-3 ps-4">
                        <div className="w-100">
                            <label for="website" className="das-form-label">Current Password</label>
                            <input type="password" value={current_password} onChange={(e) => setCurrent_password(e.target.value)} class={`form-control ${errors.currentPassword ? 'border-danger' : ''}`} id="Founded Year" aria-describedby="website" name="currentPassword" placeholder="Current Password"></input>
                            {errors.currentPassword && <small className="text-danger">{errors.currentPassword}</small>}
                        </div>

                        <div className="w-100">
                            <label for="website" className="das-form-label">New Password</label>
                            <input type="password" value={new_password} onChange={(e) => setNew_password(e.target.value)} class={`form-control ${errors.newPassword ? 'border-danger' : ''}`} id="website" aria-describedby="website" name="newPassword" placeholder="new password"></input>
                            {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
                        </div>

                        <div className="w-100">
                            <label for="website" className="das-form-label">Confirm Password</label>
                            <input type="password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} class={`form-control ${errors.confirmPassword ? 'border-danger' : ''}`} id="website" aria-describedby="website" name="confirmPassword" placeholder="confirm password"></input>

                            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                        </div>


                        <div className="d-flex align-item-end justify-content-end p-0 w-100">
                            <button className="das-button-end save-button" onClick={handle_reset_password}>Reset Password</button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Das_Profile;