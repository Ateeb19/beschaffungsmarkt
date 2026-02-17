import React, { useCallback, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useAlert } from "../../alert/Alert_message";
import ConfirmationModal from "../../alert/Conform_alert";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchUserInfo } from "../../../redux/userSlice";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { TiWarning } from "react-icons/ti";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
            <div>
                <input {...getInputProps()} />
                <p>{label}</p>
            </div>
        </div>
    );
};

const Das_co_product = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const location = useLocation();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);

    const [showModal, setShowModal] = useState(false);

    const handle_add_product = () => {
        if (data.is_premium === 0) {
            showAlert(
                <>
                    < FaExclamationTriangle className="me-2 fs-2 text-warning" /> Please upgrade your membership to upload product
                </>, "warning"
            )
        } else if (data.is_premium === 1) {
            if (user_products.length >= 5) {
                showAlert(<div className="d-flex gap-1 justify-content-center align-items-center text-start me-3">
                    <TiWarning className="text-warning" style={{ fontSize: '90px' }} />
                    <span>You have reached your limit of 5 uploads. Please upgrade your membership for additional uploads.</span>
                </div>, 'warning');
                return
            }
            setShowModal(true);
        } else if (data.is_premium === 2) {
            if (user_products.length >= 20) {
                showAlert(<div className="d-flex gap-1 justify-content-center align-items-center text-start me-3">
                    <TiWarning className="text-warning" style={{ fontSize: '90px' }} />
                    <span>You have reached your limit of 20 uploads. Please upgrade your membership for additional uploads.</span>
                </div>, 'warning');
                return
            }
            setShowModal(true);
        }
    }
    const [user_products, setUser_products] = useState([]);
    const [product_title, setProduct_title] = useState('');
    const [image_changed_product, setImage_changed_product] = useState(false);
    const [selectedFile_product, setSelectedFile_product] = useState(null);
    const [selectedImage_product, setSelectedImage_product] = useState(null);
    const handleFileDrop_product = (file) => {
        setImage_changed_product(true);
        setSelectedFile_product(file);
        setSelectedImage_product(URL.createObjectURL(file));
    }
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 15;

    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(initialPage);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const userProduct = async (currentPage = 1) => {
        try {
            const res = await axios.post(
                `${Backend_URL}/api/products`,
                {
                    currentPage,
                    itemsPerPage,
                },
                { withCredentials: true }
            );

            const total = res.data.totalDataCount || 0;
            setTotalCount(total);

            const lastValidPage = Math.ceil(total / itemsPerPage) || 1;
            if (currentPage > lastValidPage) {
                setPage(lastValidPage);
                setSearchParams({ page: lastValidPage });
                navigate(`?page=${lastValidPage}`, { replace: true });
                return;
            }

            setUser_products(res.data.results || []);
        } catch (err) {
            console.error("Error fetching user products:", err);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        setSearchParams({ page: value });
        userProduct(value);
    };

    useEffect(() => {
        userProduct(page);
    }, [page]);


    const [edit_product, setEdit_product] = useState();
    const [edit_image, setEdit_image] = useState(false);

    const handle_product_edit = (product) => {
        setShowModal(true);
        setEdit_product(product);
        setProduct_title(product.title);
    }

    const handleClose = () => {
        setShowModal(false);
        setEdit_product(null);
        setEdit_image(false);
        setProduct_title('');
    };

    console.log('product length-: ', user_products.length);
    const handle_product = async () => {

        if (!product_title && !selectedFile_product) {
             showAlert("Product Title and Image is required", 'warning')
            return
        }

        if (!product_title) {
            showAlert("Product Title is required", 'warning')
            return
        }
        if (!selectedFile_product) {
            showAlert("Product Image is required", 'warning')
            return
        }

        if (user_products.length >= 5) {
            showAlert('You have reached your limit of 5 uploads. Please upgrade your membership for additional uploads', 'warning')
            return
        }

        const formData = new FormData();

        formData.append("title", product_title);
        if (image_changed_product) {
            if (selectedFile_product) {
                formData.append("image", selectedFile_product);
            } else {
                formData.append("image", "false");
            }
        }

        try {
            const res = await axios.post(`${Backend_URL}/api/products/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            showAlert(res.data.msg, "success")
            navigate('/dashboard/company/product-management')
            // console.log('submit response', res.data);
            userProduct(page);
            setProduct_title('');
            setSelectedFile_product('');
            setSelectedImage_product('');
            handleClose();
        } catch (err) {
            console.log(err);
        }
    }

    const handle_edit_product = async () => {
        // if (!selectedFile_product || !product_title) {
        //     showAlert("Select an image to update", "warning")
        //     return
        // }

        const formData = new FormData();

        formData.append("productId", edit_product._id);
        formData.append("title", product_title);
        if (image_changed_product) {
            if (selectedFile_product) {
                formData.append("image", selectedFile_product);
            } else {
                // formData.append("image", "false");
            }
        }

        try {
            const res = await axios.post(`${Backend_URL}/api/products/edit`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            showAlert(res.data.msg, "success")
            navigate('/dashboard/company/product-management')
            userProduct(page);
            setProduct_title('');
            setSelectedFile_product('');
            setSelectedImage_product('');
            // console.log('submit response', res.data);
            handleClose();
        } catch (err) {
            console.log(err);
        }
    }

    const [selected_product, setSelected_product] = useState('');
    const [show_confirm, setShow_confirm] = useState(false);

    const handle_product_delete = (product) => {
        setSelected_product(product);
        setShow_confirm(true);
    }

    const handle_product_delete_cancel = () => {
        setSelected_product(null);
        setShow_confirm(false);
    }

    const handle_product_delete_confirm = async () => {
        try {
            const res = await axios.post(`${Backend_URL}/api/products/delete`, {
                productId: selected_product._id,
            }, {
                withCredentials: true,
            })

            showAlert(res.data.msg, 'success');
            navigate('/dashboard/company/product-management');
            handle_product_delete_cancel();
            userProduct(page);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="d-flex flex-column align-items-start justify-content-start w-100">
                <div className="d-flex flex-row align-items-between justify-content-between w-100">

                    <h5 style={{ fontWeight: '700' }}>Product</h5>

                    <button className="add-product-button" onClick={handle_add_product}><MdAdd /> Add Product</button>
                </div>
                {showModal && (
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
                                width: "700px",
                                maxWidth: "90%",
                            }}
                        >
                            <button
                                onClick={handleClose}
                                className="btn  position-absolute"
                                style={{ top: "10px", right: "10px" }}
                            >
                                <RxCross2 />
                            </button>

                            <div className="d-flex flex-column align-items-start justify-content-start">
                                <h4 className="mb-3">{edit_product ? (
                                    <>
                                        Edit
                                    </>
                                ) : (
                                    <>
                                        Add
                                    </>
                                )} Product</h4>

                                <div className="d-flex flex-column align-items-start w-100 mb-3">
                                    <label>
                                        Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="form-control"
                                        value={product_title}
                                        onChange={(e) => setProduct_title(e.target.value)}
                                    />
                                </div>

                                <div className="d-flex flex-column w-100 align-items-start mb-3">
                                    <label>
                                        Image <span className="text-danger">*</span>
                                    </label>
                                    <div className="d-flex align-items-start gap-3 w-100 mt-2">
                                        <DragAndDrop
                                            accept="image/*"
                                            name="banner"
                                            onFileDrop={handleFileDrop_product}
                                            className="image-div-das-image-upload-banner"
                                            label={
                                                <>
                                                    <IoCloudUploadOutline className="fs-2 mb-3" />{" "}
                                                    <p>
                                                        <b>Click to upload</b> or drag and drop
                                                    </p>
                                                    <p style={{ fontSize: "12px" }}>SVG, PNG, JPG or WEBP</p>
                                                </>
                                            }
                                        />
                                        {selectedImage_product ? (
                                            <div className="d-flex align-items-start justify-content-end image-div-das-image-baner-outer-div">
                                                <div className="px-4 py-3 image-div-das-image-baner-inner-div">
                                                    <img
                                                        src={
                                                            !image_changed_product
                                                                ? `${Backend_URL}/files/${selectedImage_product}`
                                                                : selectedImage_product
                                                        }
                                                        alt="Selected Image"
                                                        className="image-div-das-image-banner"
                                                    />
                                                </div>
                                                <RxCross2
                                                    style={{ cursor: "pointer", fontSize: "20px" }}
                                                    onClick={() => {
                                                        setSelectedFile_product("");
                                                        setSelectedImage_product("");
                                                        setImage_changed_product(true);
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                {edit_product && (
                                                    <>
                                                        {!edit_image && (
                                                            <div className="d-flex align-items-start justify-content-end image-div-das-image-baner-outer-div">
                                                                <div className="px-4 py-3 image-div-das-image-baner-inner-div">
                                                                    <img
                                                                        src={
                                                                            edit_product
                                                                                ? `${Backend_URL}/files/${edit_product.image}`
                                                                                : selectedImage_product
                                                                        }
                                                                        alt="Selected"
                                                                        className="image-div-das-image-banner"
                                                                    />
                                                                </div>
                                                                <RxCross2
                                                                    style={{ cursor: "pointer", fontSize: "20px" }}
                                                                    onClick={() => {
                                                                        setSelectedFile_product("");
                                                                        setSelectedImage_product("");
                                                                        setImage_changed_product(true);
                                                                        setEdit_image(true);
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </>
                                                )}

                                            </>
                                        )}

                                    </div>
                                </div>

                                <div className="d-flex flex-row justify-content-end w-100 mt-3 gap-2">
                                    <button className="das-button-end save-button" onClick={edit_product ? handle_edit_product : handle_product}>{edit_product ? <>Edit</> : <>Add</>}</button>
                                    <button className="das-button-end cancel-button" onClick={handleClose}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="d-none d-md-flex flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-2">

                    <h6>Product Table</h6>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col fs-6">NO</th>
                                <th scope="col fs-6">TITLE</th>
                                <th scope="col fs-6">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user_products.length >= 0 && (
                                <>
                                    {user_products.map((pro, key) => (
                                        <>
                                            <tr>
                                                <td>{key + 1}</td>
                                                <td>{pro.title}</td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        <button className="btn product_edit_btn" onClick={() => handle_product_edit(pro)}>Edit</button>
                                                        <button className="btn product_delete_btn" onClick={() => handle_product_delete(pro)}>Delete</button>
                                                    </div>
                                                    <>
                                                        <ConfirmationModal
                                                            show={show_confirm}
                                                            message={`Are you sure you want to delete this product?`}
                                                            onConfirm={handle_product_delete_confirm}
                                                            onCancel={handle_product_delete_cancel}
                                                        />
                                                    </>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>

                    {totalCount > 0 && (
                        <div className="d-flex justify-content-center mt-4 w-100">
                            <Stack spacing={2}>
                                <Pagination
                                    count={Math.ceil(totalCount / itemsPerPage)}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    shape="rounded"
                                />
                            </Stack>
                        </div>
                    )}
                </div>

                {/* {Mobile cards} */}
                <div className="d-flex flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-4 d-md-none">
                    {user_products.length >= 0 && (
                        <>
                            {user_products.map((pro, key) => (
                                <>
                                    <div className="das-mobile-card border border-gray-300 rounded-2 p-3 mb-3 w-100" key={key}>
                                        <div className="d-flex flex-row mb-2 gap-2">
                                            <span className="das-mobile-card-label">NO :</span>
                                            <span className="fw-bold">{key + 1}</span>
                                        </div>
                                        <div className="d-flex flex-row mb-2">
                                            <span className="das-mobile-card-label">TITLE : </span>
                                            <span className="fw-bold">{pro.title}</span>
                                        </div>
                                        <div className="d-flex flex-column">
                                          
                                            <div className="d-flex gap-3 mt-1">
                                                <button className="btn product_edit_btn" onClick={() => handle_product_edit(pro)}>Edit</button>
                                                <button className="btn product_delete_btn" onClick={() => handle_product_delete(pro)}>Delete</button>
                                            </div>
                                            <>
                                                <ConfirmationModal
                                                    show={show_confirm}
                                                    message={`Are you sure you want to delete this product?`}
                                                    onConfirm={handle_product_delete_confirm}
                                                    onCancel={handle_product_delete_cancel}
                                                />
                                            </>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </>
                    )}
                </div>


            </div>
        </>
    )
}

export default Das_co_product;