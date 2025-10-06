import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "../../alert/Alert_message";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../../redux/userSlice";
import axios from "axios";



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

const Das_co_contact = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const [image_changed, setImage_changed] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileDrop = (file) => {
        setImage_changed(true);
        setSelectedFile(file);
        setSelectedImage(URL.createObjectURL(file));
    };

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [phno, setPhno] = useState('');

    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const location = useLocation();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);

    console.log('user data -: ', data);


    useEffect(() => {
        if (data.contact_img) {
            setSelectedFile(data.contact_img || '');
            setSelectedImage(data.contact_img || '');
            setImage_changed(false);
        }else{
            setSelectedFile('');
            setSelectedImage('');
        }
        setFirst_name(data.contact_first_name || '');
        setLast_name(data.contact_last_name || '');
        setPosition(data.contact_position || '');
        setEmail(data.contact_email || '');
        setPhno(data.contact_phone_number || '');
    }, [data, location])

    const [errors, setErrors] = useState('');

    const handle_save = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("firstName", first_name);
        formData.append("lastName", last_name);
        formData.append("position", position);
        formData.append("email", email);
        formData.append("phoneNumber", phno);

        if (image_changed) {
            if (selectedFile) {
                formData.append("avatarImg", selectedFile);
            } else {
                formData.append("avatarImg", "false");
            }
        }
        try {
            const response = await axios.post(`${Backend_URL}/users/update-company-contact-info`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            showAlert(response.data.msg, "success")
            navigate('/dashboard')
            console.log("Contact Info updated successfully");
        } catch (err) {
            setErrors(err.response.data.msg)
            // const errorData = err.response.data;
            // setErrors({});
            // if (errorData) {
            //     const newErrors = {};
            //     for (const key in errorData) {
            //         if (errorData[key]) {
            //             newErrors[key] = errorData[key];
            //         }
            //     }
            //     setErrors(newErrors);
            // }
            console.log("Error:", err);
        }

    }

    const handle_cancel = () => {
        setSelectedFile('');
        setFirst_name('');
        setLast_name('');
        setPosition('');
        setEmail('');
        setPhno('');
        navigate('/dashboard/home')
    }

    return (
        <div className="d-flex flex-column align-items-start justify-content-start w-100">
            <h5 style={{ fontWeight: '700' }}>Contact Settings</h5>
            <div className="d-flex flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-2">
                <div className="d-flex flex-row w-100 align-items-center justify-content-start text-start">
                    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <div className="image-div-das-general-form d-flex flex-column align-items-center justify-content-center w-100">
                            {selectedImage ? (
                                <div className="d-flex flex-row align-item-end justify-content-end">

                                    <img
                                        src={!image_changed ? `https://api.beschaffungsmarkt.com/files/${selectedFile}` : selectedImage}
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

                    <div className="col-md-6 d-flex flex-column align-items-start justify-content-center gap-3">

                        <div className="w-100">
                            <label for="website" className="das-form-label">First Name</label>
                            <input type="text" class={`form-control ${errors.firstName ? 'border-danger' : ''}`} onChange={(e) => setFirst_name(e.target.value)} value={first_name} id="Fax Number" aria-describedby="website" name="firstName" placeholder="First Name"></input>
                        </div>

                        <div className="w-100">
                            <label for="website" className="das-form-label">Last Name </label>
                            <input type="text" class={`form-control ${errors.lastName ? 'border-danger' : ''}`} onChange={(e) => setLast_name(e.target.value)} value={last_name} id="Website" aria-describedby="website" name="lastName" placeholder="Last Name"></input>
                        </div>

                        <div className="w-100">
                            <label for="website" className="das-form-label">Position</label>
                            <input type="text" class={`form-control ${errors.position ? 'border-danger' : ''}`} onChange={(e) => setPosition(e.target.value)} value={position} id="HS Code" aria-describedby="website" name="position" placeholder="ex: CEO, Export Manager"></input>
                        </div>

                        <div className="w-100">
                            <label for="website" className="das-form-label">Email</label>
                            <input type="text" class={`form-control ${errors === 'Please enter a valid email address.' ? 'border-danger' : ''}`} onChange={(e) => setEmail(e.target.value)} value={email} id="Founded Year" aria-describedby="website" name="email" placeholder="Email"></input>
                            {errors === 'Please enter a valid email address.' && <small className="text-danger">{errors}</small>}
                        </div>

                        <div className="w-100">
                            <label for="website" className="das-form-label">Phone Number</label>
                            <input type="text" class={`form-control ${errors === 'Please enter a valid phone number.' ? 'border-danger' : ''}`} onChange={(e) => setPhno(e.target.value)} value={phno} id="website" aria-describedby="website" name="phoneNumber" placeholder="ex: +49 91 51201 9038, +90 242 809 1696"></input>
                            {errors === 'Please enter a valid phone number.' && <small className="text-danger">{errors}</small>}
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-row align-items-end justify-content-end mt-3 w-100 gap-3">
                    <button className="das-button-end save-button" onClick={handle_save}>Save</button>
                    <button className="das-button-end cancel-button" onClick={handle_cancel}>Cancel</button>
                </div>
            </div>
        </div >
    )
}

export default Das_co_contact;