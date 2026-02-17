import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../../redux/userSlice";
import axios from "axios";
import { useAlert } from "../../alert/Alert_message";
import ConfirmationModal from "../../alert/Conform_alert";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Das_myPost = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);

    const [post, setPost] = useState([]);

    const get_post = async () => {
        try {
            const res = await axios.post(`${Backend_URL}/api/posts`, {}, {
                withCredentials: true,
            })
            console.log(res.data);
            setPost(res.data.results);
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        get_post();
    }, [data]);

    const [show_confirm, setShow_confirm] = useState(false);
    const [current_post, setCurrent_post] = useState('');

    const handle_delete = (p) => {
        setShow_confirm(true);
        setCurrent_post(p);
    }

    const handle_post_dlete = async () => {
        try {
            const res = await axios.post(`${Backend_URL}/api/posts/delete`, {
                postId: current_post._id,
            }, {
                withCredentials: true,
            })
            showAlert(
                <>
                    <IoMdCheckmarkCircle className="me-2 fs-2 text-success" />
                    {res.data.msg}
                </>,
                "success"
            );
            navigate('/dashboard/post/my-posts')
            get_post();
            setShow_confirm(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handle_post_cancel = () => {
        setShow_confirm(false);
        setCurrent_post('');
    }

    const [show_post, setShow_post] = useState('');
    const handle_show_details = async (p) => {
        setShow_post(p);
    }
    console.log(show_post);
    return (
        <>
            <div className="d-flex flex-column align-items-start justify-content-start w-100">
                <div className="d-flex flex-row align-items-between justify-content-between w-100">

                    <h5 style={{ fontWeight: '700' }}>My Posts</h5>
                    {/*             
                                <button className="add-product-button"><MdAdd /> Add Product</button> */}
                </div>

                <div className="d-none d-md-flex flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-2">

                    <h6>My Posts Table</h6>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col fs-6">NO</th>
                                <th scope="col fs-6">TYPE</th>
                                <th scope="col fs-6">TITLE</th>
                                <th scope="col fs-6">STATUS</th>
                                <th scope="col fs-6">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.length > 0 && (
                                <>
                                    {post.map((p, key) => (
                                        <tr key={key}>
                                            <td onClick={() => handle_show_details(p)}>{key + 1}</td>
                                            <td onClick={() => handle_show_details(p)}>{p.type}</td>
                                            <td onClick={() => handle_show_details(p)}>{p.title}</td>
                                            <td><span className="post-live">Live</span></td>
                                            <td><button className="btn post-delete" onClick={() => handle_delete(p)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>

                    {show_post && (
                        <div
                            className="popup-overlay"
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 9999,
                            }}
                        >
                            <div
                                className="popup-box bg-white p-4 rounded shadow-lg position-relative"
                                style={{
                                    // width: "900px",
                                    // maxWidth: "90%",
                                    width: "auto",
                                    minWidth: '10%',
                                    maxWidth: "66%",
                                    maxHeight: "90vh",
                                    overflowY: "auto",
                                }}
                            >
                                <button
                                    onClick={() => setShow_post('')}
                                    className="btn  position-absolute"
                                    style={{ top: "10px", right: "10px" }}
                                >
                                    <RxCross2 />
                                </button>

                                <div className="d-flex flex-column align-items-start justify-content-start">
                                    <h5 className="mb-3">
                                        {show_post.title} <span>({show_post.type})</span>
                                    </h5>
                                    <p>
                                        {show_post.description}
                                    </p>
                                    <div className="d-flex flex-wrap gap-3 w-100 justify-content-start">
                                        {show_post?.file?.length > 0 && (
                                            <div className="post_show_image "
                                            >
                                                {show_post.file.map((imgSrc, index) => (
                                                    <div
                                                        key={index}
                                                        className="image-box"
                                                    >
                                                        <img
                                                            src={`${Backend_URL}/files/${imgSrc}`}
                                                            alt={`Post Image ${index + 1}`}
                                                            className="w-100 h-100 object-fit-contain"
                                                            onClick={() => window.open(`${Backend_URL}/files/${imgSrc}`, "_blank", "noopener,noreferrer")}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="d-flex flex-row justify-content-end w-100 mt-3 gap-2">
                                        <button className="das-button-end cancel-button" onClick={() => setShow_post('')}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <ConfirmationModal
                        show={show_confirm}
                        message={`Are you sure you want to delete this product?`}
                        onConfirm={handle_post_dlete}
                        onCancel={handle_post_cancel}
                    />
                </div>

                {/* Mobile cards */}
                <div className="d-flex d-md-none flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-2">
                    {post.length > 0 && (
                        <>
                            {post.map((p, key) => (
                                <div className="das-mobile-card border border-gray-300 rounded-2 p-3 mb-3 w-100" key={key}>
                                    <div className="d-flex flex-row mb-2 gap-2">
                                        <span className="das-mobile-card-label">NO :</span>
                                        <span className="fw-bold">{key + 1}</span>
                                    </div>
                                    <div className="d-flex flex-row mb-2 gap-2">
                                        <span className="das-mobile-card-label">TYPE :</span>
                                        <span>{p.type}</span>
                                    </div>
                                    <div className="d-flex flex-row mb-2 gap-2">
                                        <span className="das-mobile-card-label">TITLE :</span>
                                        <span>{p.title}</span>
                                    </div>
                                    <div className="d-flex flex-row mb-2 gap-2">
                                        <span className="das-mobile-card-label">STATUS :</span>
                                        <span><span className="post-live">Live</span></span>
                                    </div>
                                    <div className="d-flex flex-row mb-2 gap-2">
                                        <button className="btn post-delete" onClick={() => handle_delete(p)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}  
                </div>
            </div>
        </>
    )
}

export default Das_myPost;