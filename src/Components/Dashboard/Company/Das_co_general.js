import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Select from 'react-select'
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";
import * as GrIcons from "react-icons/gr";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../alert/Alert_message";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../../redux/userSlice";

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
const Das_co_general = () => {

    const Backend_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [image_changed, setImage_changed] = useState(false);
    const [image_changed_banner, setImage_changed_banner] = useState(false);

    const full_token = localStorage.getItem("procurement_token");
    const token = full_token.replace("Bearer ", "").trim();
    // console.log('this is token -:', token)
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const location = useLocation();
    const { data, requestStatus, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch, location]);
    console.log('user data -: ', data);
    console.log('user data requestStatus-: ', requestStatus);
    console.log('user data error-: ', error);
    const isPremium = data?.is_premium;


    const [selectedFile_banner, setSelectedFile_banner] = useState(null);
    const [selectedImage_banner, setSelectedImage_banner] = useState(null);

    const handleFileDrop = (file) => {
        setImage_changed(true);
        setSelectedFile(file);
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleFileDrop_banner = (file) => {
        setImage_changed_banner(true);
        setSelectedFile_banner(file);
        setSelectedImage_banner(URL.createObjectURL(file));
    }

    const [company_type_data, setCompany_type_data] = useState('');
    const [company_segments_data, setCompany_segments_data] = useState([]);
    const [company_main_categories_data, setCompany_main_categories_data] = useState([]);
    const [company_sub_categories_data, setCompany_sub_categories_data] = useState([]);
    const [city, setCity] = useState([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);

    const Country = [
        { value: 'Germany', label: 'Germany' },
        { value: 'Turkey', label: 'Turkey' }
    ]

    const [isLocked, setIsLocked] = useState(false);
    const [cityInput, setCityInput] = useState("")

    const getIconComponent = (iconString) => {
        if (!iconString) return null;
        const [libName, iconName] = iconString.split(".");
        const libraries = {
            GiIcons,
            FaIcons,
            Fa6Icons,
            AiIcons,
            PiIcons,
            SiIcons,
            GrIcons,
        };
        const lib = libraries[libName];
        return lib ? lib[iconName] : null;
    };

    const get_company_type = async () => {
        try {
            const res = await axios.get(`${Backend_URL}/api/users/get-company-types`);
            setCompany_type_data(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const get_company_segments = async () => {
        try {
            const res = await axios.get(`${Backend_URL}/api/users/get-company-segments`);
            setCompany_segments_data(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const get_company_main_categories = async () => {
        try {
            const res = await axios.get(`${Backend_URL}/api/users/get-company-main-categories`);
            setCompany_main_categories_data(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const get_company_sub_categories = async () => {
        try {
            const res = await axios.get(`${Backend_URL}/api/users/get-company-sub-categories`);
            setCompany_sub_categories_data(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        get_company_type();
        get_company_segments();
        get_company_main_categories();
        get_company_sub_categories();
    }, [])

    const [selected_company_name, setSelected_company_name] = useState(null);
    const [selected_company_description, setSelected_company_description] = useState(null);
    const [selected_company_type, setSelected_company_type] = useState([]);
    const [selected_company_segment, setSelected_company_segment] = useState([]);
    const [selected_main_category, setSelected_main_category] = useState([]);
    const [selected_sub_category, setSelected_sub_category] = useState([]);
    const [selected_category, setSelected_category] = useState([]);
    // const [isLocked, setIsLocked] = useState(false);

    // const maxCategories = 5;
    const maxCategories = isPremium === 1 || isPremium === 2 ? 5 : 1;
    const [selected_country, setSelected_country] = useState({
        value: '',
        label: ''
    });
    const [selected_city, setSelected_city] = useState({
        value: '',
        label: ''
    });
    const [selected_street, setSelected_street] = useState(null);
    const [selected_zipcode, setSelected_zipcode] = useState(null);
    const [selected_Taxpayer_ID, setSelected_Taxpayer_ID] = useState(null);
    const [selected_Fax_number, setSelected_Fax_number] = useState(null);
    const [selected_Website, setSelected_Website] = useState(null);
    const [selected_Hscode, setSelected_Hscode] = useState(null);
    const [selected_Founded_year, setSelected_Founded_year] = useState(null);
    const [selected_number_employee, setSelected_number_employee] = useState(null);
    const [selected_keyword, setSelected_keyword] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [error_keyword, setError_keyword] = useState("");

    const handleAddKeyword = () => {
        // Reset error initially
        setError_keyword("");

        // Empty field check
        if (!keyword.trim()) {
            setError_keyword("Keyword is required.");
            return;
        }

        // If not premium
        if (isPremium === 0) {
            setError_keyword("You cannot add keyword. Please upgrade user's membership.");
            return;
        }

        // Premium user limits
        const limit = isPremium === 1 ? 50 : 100;

        if (keywords.length >= limit) {
            setError_keyword(`You can add up to ${limit} keywords only.`);
            return;
        }

        // Add keyword if not duplicate
        if (keywords.includes(keyword.trim())) {
            setError_keyword("This keyword is already added.");
            return;
        }

        setKeywords([...keywords, keyword.trim()]);
        setKeyword(""); // clear input
    };

    const handleRemoveKeyword = (index) => {
        const newKeywords = [...keywords];
        newKeywords.splice(index, 1);
        setKeywords(newKeywords);
    };


    const get_city = async (keyword) => {
        console.log('this is the key - :', keyword)
        console.log('this is Country - :', selected_country)

        try {
            const res = await axios.post(`${Backend_URL}/api/users/get-cities`, {
                cityKeyword: keyword,
                countryName: selected_country.value,
            });
            setCity(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (selected_main_category) {
            setFilteredSubCategories(
                company_sub_categories_data.filter(
                    (sub) => sub.main_category === selected_main_category._id
                )
            );
        } else {
            setFilteredSubCategories([]);
        }
    }, [selected_main_category, company_sub_categories_data]);

    const availableOptions = company_segments_data
        .map((item) => ({
            _id: item._id,
            label: item.label,
            value: item._id, // value for <Select> 
        }))
        .filter(
            (option) =>
                !selected_company_segment.some(
                    // (s) => s.segment._id === option._id
                    (s) => s.segment && s.segment._id === option._id
                )
        );

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            // Find the full segment object from your company_segments_data
            const segmentObj = company_segments_data.find(
                (item) => item._id === selectedOption._id
            );

            // Add to selected_company_segment in consistent backend structure
            setSelected_company_segment([
                ...selected_company_segment,
                {
                    _id: segmentObj._id,  // you can generate a temporary id if needed
                    segment: {
                        _id: segmentObj._id,
                        value: segmentObj.value,
                        label: segmentObj.label,
                    },
                },
            ]);
        }
    };

    // Handle removing a selected segment
    const removeSegment = (id) => {
        setSelected_company_segment(
            selected_company_segment.filter((item) => item._id !== id)
        );
    };


    useEffect(() => {
        if (data) {
            if (data.company_logo) {
                setSelectedFile(data.company_logo || '');
                setSelectedImage(data.company_logo || '');
                setImage_changed(false);
            } else {
                setSelectedFile('');
                setSelectedImage('');
            }
            if (data.company_banner) {
                setSelectedFile_banner(data.company_banner || "");
                setSelectedImage_banner(data.company_banner || "");
                setImage_changed_banner(false);
            } else {

            }
            setSelectedImage_banner(data.company_banner || '')
            setSelected_company_name(data.company_name || "");
            setSelected_company_description(data.company_description || "");

            if (data && company_type_data.length > 0) {
                const companyTypeOption = company_type_data.find(
                    (option) => option._id === data.company_type
                ) || null;

                setSelected_company_type(companyTypeOption);
            }

            if (data && data.company_segment) {
                setSelected_company_segment(data.company_segment);
            }

            const transformedData = data.company_category.map(item => {
                // Find the corresponding main category using the main_category _id
                const mainCategory = company_main_categories_data.find(
                    (cat) => cat._id === item.category.main_category
                );

                // If no main category is found, return null or fallback values
                if (!mainCategory) {
                    return {
                        main: {},
                        sub: {
                            _id: item.category._id,
                            label: item.category.label,
                            value: item.category.value,
                            icon: item.category.icon,
                        },
                    };
                }

                // Return the transformed data
                return {
                    main: {
                        _id: mainCategory._id,
                        label: mainCategory.label,
                        value: mainCategory.value,
                        icon: mainCategory.icon,
                    },
                    sub: {
                        _id: item.category._id,
                        label: item.category.label,
                        value: item.category.value,
                        icon: item.category.icon,
                    },
                };
            });

            // Store the transformed data
            setSelected_category(transformedData);
            setSelected_country({ value: data.country, label: data.country } || "");
            setSelected_city({ value: data.city, label: data.city } || "");
            setSelected_street(data.street || "");
            setSelected_zipcode(data.zipcode || "");
            setSelected_Taxpayer_ID(data.taxpayer_id || "");
            setSelected_Fax_number(data.fax_number || "");
            setSelected_Website(data.website || "");
            setSelected_Hscode(data.hscode || "");
            setSelected_Founded_year(data.founded_year || "");
            setSelected_number_employee(data.employee_number || "");
            setSelected_keyword(data.keyword || []);
            if(data.keyword){
                setKeywords(data.keyword)
            }
        }
    }, [data, company_type_data]);


    const handleMainCategoryChange = (selected) => {
        setSelected_main_category(selected);
        setSelected_sub_category(null); // reset sub if main changes
    };

    const handleSubCategoryChange = (selected) => {
        setSelected_sub_category(selected);

        if (selected_main_category && selected) {
            setSelected_category((prev) => [
                ...prev,
                { main: selected_main_category, sub: selected },
            ]);
            setSelected_main_category(null);
            setSelected_sub_category(null);
            // setSelected_category([
            //     {
            //         main: selected_main_category,
            //         sub: selected,
            //     },
            // ]);
            if (selected_category.length + 1 >= maxCategories) {
                setIsLocked(true);
            }
            // setIsLocked(true); 
        }
    };

    const handle_remove_category = (indexToRemove) => {
        // setSelected_category([]);
        setSelected_category((prev) => prev.filter((_, index) => index !== indexToRemove));
        // setSelected_main_category(null);
        // setSelected_sub_category(null);
        setIsLocked(false);
    };


    const [errors, setErrors] = useState({});

    const handle_submit_details = async () => {
        const formData = new FormData();

        formData.append("companyName", selected_company_name || "");
        formData.append("companyDescription", selected_company_description || "");
        // formData.append("companyType", selected_company_type._id || "");
        if (selected_company_type) {
            formData.append("companyType", selected_company_type._id);
        }

        const transformedSegments = selected_company_segment.map((item) => ({
            _id: item.segment._id,
            label: item.segment.label,
            value: item.segment.value
        }));
        formData.append("companySegment", JSON.stringify(transformedSegments));

        const transformedCategory = selected_category.map(item => ({
            _id: item.sub._id,
            main_category: item.main._id,
            value: item.sub.value,
            label: item.sub.label,
            icon: item.sub.icon,
            created_time: item.sub.created_time,
        }));
        formData.append("category", JSON.stringify(transformedCategory));

        formData.append("country", selected_country && selected_country.value || "");
        formData.append("city", selected_city && selected_city.value || "");
        formData.append("street", selected_street || "");
        formData.append("zipcode", selected_zipcode || "");
        formData.append("taxpayerID", selected_Taxpayer_ID || "");
        formData.append("faxNumber", selected_Fax_number || "");
        formData.append("website", selected_Website || "");
        formData.append("hscode", selected_Hscode || "");
        formData.append("foundedYear", selected_Founded_year || "");
        formData.append("employeeNumber", selected_number_employee || "");
        formData.append("keyword", JSON.stringify(keywords));


        if (image_changed) {
            if (selectedFile) {
                formData.append("logo", selectedFile);
            } else {
                formData.append("logo", "false");
            }
        }

        if (image_changed_banner) {
            if (selectedFile_banner) {
                formData.append("banner", selectedFile_banner);
            } else {
                formData.append("banner", "false");
            }
        }

        try {
            const res = await axios.post(`${Backend_URL}/api/users/update-company-profile`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            showAlert(res.data.msg, "success")
            navigate('/dashboard/home')
            console.log('submit response', res.data);
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

            // showAlert(err.response.data)
            console.error(err);
        }
    }

    return (
        <>
            <div className="d-flex flex-column align-items-start justify-content-start w-100">
                <h5 style={{ fontWeight: '700' }}>General Settings</h5>
                <div className="d-flex flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-2">

                    <div className="d-flex flex-row w-100 align-items-start justify-content-start text-start mb-4">
                        <div className="col-md-6 d-flex flex-column align-items-start justify-content-center">
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

                        <div className="col-md-6 d-flex flex-column align-items-start justify-content-center">
                            <label for="company_name">Company Name <span style={{ color: '#dc2626' }}>*</span></label>
                            <input type="text" className={`form-control ${errors.companyName ? 'border-danger' : ''}`} name="companyName" id="company_name" aria-describedby="company_name" placeholder="Company Name" value={selected_company_name} onChange={(e) => setSelected_company_name(e.target.value)} />
                            {errors.companyName && <small className="text-danger">{errors.companyName}</small>}

                            <label for="company_description" className="d-flex justify-content-between w-100 mt-4">
                                <span>Company Description</span>
                                <span className="flag-icons">
                                    <img src="https://flagcdn.com/us.svg" alt="US" />
                                    <img src="https://flagcdn.com/tr.svg" alt="TR" />
                                    <img src="https://flagcdn.com/de.svg" alt="DE" />
                                </span>
                            </label>
                            <textarea className="form-control" placeholder="Company Description" value={selected_company_description} onChange={(e) => setSelected_company_description(e.target.value)} rows="5" cols="50"></textarea>
                        </div>
                    </div>

                    <div className="d-flex flex-row w-100 align-items-start justify-content-start text-start">
                        <div className="col-md-6 d-flex flex-column align-items-start justify-content-center pe-4">
                            <div className="image-div-das-general-form d-flex flex-column align-items-start justify-content-start text-start w-100 gap-3">
                                <div className="w-100">
                                    <label for="c_type" className="mb-2">Company Type</label>

                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Select Company Type"
                                        defaultValue={false}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={true}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="country"
                                        options={company_type_data}
                                        onChange={(e) => setSelected_company_type(e)}
                                        value={selected_company_type}
                                    />
                                </div>

                                <div className="w-100">
                                    <label for="c_segment" className="mb-2">Company Segment</label>

                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Select Company Segment"
                                        defaultValue={false}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={true}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="country"
                                        options={availableOptions}
                                        onChange={handleChange}
                                        value={null}
                                    />

                                    {selected_company_segment.length > 0 && (
                                        <div className="general-segment-div d-flex mt-3 gap-3">
                                            {selected_company_segment.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="general-segment-inner-div d-flex align-items-start justify-content-start"
                                                >
                                                    {/* {item.segment.label} */}
                                                    {item.segment ? item.segment.label : "No Label"}
                                                    <button
                                                        type="button"
                                                        className="btn-close btn-close-sm ms-2"
                                                        aria-label="Remove"
                                                        onClick={() => removeSegment(item._id)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="w-100">
                                    <label for="main_category" className="mb-2">Main Category</label>

                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Select Main Category"
                                        defaultValue={false}
                                        isLoading={false}
                                        isClearable={true}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="country"
                                        options={company_main_categories_data}
                                        onChange={handleMainCategoryChange}
                                        value={selected_main_category}
                                        // isDisabled={isLocked || selected_category.length > 0}
                                        isDisabled={isLocked}
                                    />
                                    {/* <select name="main_category" id="main_category">
                                        <option value="0" selected disabled>Select Main Category</option>
                                        <option value="1">Fashion & Accessories</option>
                                        <option value="2">Shoes</option>
                                        <option value="2">Textile & Leather</option>
                                        <option value="2">Automotive</option>
                                    </select> */}
                                </div>

                                <div className="w-100">

                                    <label for="main_category" className="mb-2">Sub Category</label>

                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder="Select Sub Category"
                                        defaultValue={false}
                                        isLoading={false}
                                        isClearable={true}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="country"
                                        options={filteredSubCategories}
                                        onChange={handleSubCategoryChange}
                                        value={selected_sub_category}
                                        // isDisabled={isLocked || !selected_main_category || selected_category.length > 0}
                                        isDisabled={isLocked || !selected_main_category}

                                    />

                                    {selected_category.length > 0 && (
                                        <div className="mt-3 d-flex flex-wrap gap-2 ">
                                            {selected_category.map((pair, index) => (
                                                <div
                                                    key={index}
                                                    className="position-relative border general-category-selected px-3 py-2 d-inline-flex align-items-center "
                                                    style={{
                                                        flex: "0 0 auto"
                                                    }}
                                                >

                                                    <button
                                                        type="button"
                                                        className="btn-close position-absolute top-0 end-0 me-1 mt-1"
                                                        // style={{ scale: "0.8" }}
                                                        aria-label="Remove"
                                                        onClick={() => handle_remove_category(index)}
                                                    ></button>
                                                    <div className="d-flex flex-column">
                                                        {/* Main category */}
                                                        <div className="d-flex align-items-center gap-1 text-sm">
                                                            {(() => {
                                                                const Icon = getIconComponent(pair.main.icon);
                                                                return Icon && <Icon size={18} />;
                                                            })()}
                                                            <span className="fw-semibold">{pair.main.label}</span>
                                                        </div>

                                                        {/* Sub category */}
                                                        <div className="d-flex align-items-center gap-1 ps-3 small">
                                                            <HiMiniArrowTurnDownRight />
                                                            {(() => {
                                                                const Icon = getIconComponent(pair.sub.icon);
                                                                return Icon && <Icon size={14} />;
                                                            })()}
                                                            <span>{pair.sub.label}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="w-100">
                                    <label for="website" className="">Country <span style={{ color: '#dc2626' }}>*</span></label>
                                    <Select
                                        className={`basic-single ${errors.country ? 'general-country-border' : ''}`}
                                        placeholder="Select Country"
                                        classNamePrefix="select"
                                        defaultValue={''}
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={true}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="country"
                                        value={selected_country}
                                        options={Country}
                                        onChange={(e) => setSelected_country(e)}
                                    />
                                    {errors.country && <small className="text-danger">{errors.country}</small>}
                                </div>


                                <div className="w-100">
                                    <label for="website" className="mt-2">City <span style={{ color: '#dc2626' }}>*</span></label>
                                    <Select
                                        className={`basic-single ${errors.city ? 'border-danger' : ''}`}
                                        placeholder="Select City"
                                        classNamePrefix="select"
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={true}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="city"
                                        value={selected_city}
                                        options={city}
                                        onInputChange={(value, { action }) => {
                                            if (action === "input-change") {
                                                setCityInput(value);
                                                get_city(value);
                                            }
                                        }}
                                        onChange={(e) => setSelected_city(e)}
                                    />
                                    {errors.city && <small className="text-danger">{errors.city}</small>}
                                </div>


                                <div className="w-100">
                                    <label for="website">Street & Street Nr <span style={{ color: '#dc2626' }}>*</span></label>
                                    <input type="text" name="street" class={`form-control ${errors.street ? 'border-danger' : ''}`} id="website" aria-describedby="website" value={selected_street} onChange={(e) => setSelected_street(e.target.value)} placeholder="Street & Street Nr"></input>
                                    {errors.street && <small className="text-danger">{errors.street}</small>}
                                </div>


                                <div className="w-100">
                                    <label for="website">Zip code <span style={{ color: '#dc2626' }}>*</span></label>
                                    <input type="text" name="zipcode" class={`form-control ${errors.zipcode ? 'border-danger' : ''}`} id="website" aria-describedby="website" value={selected_zipcode} onChange={(e) => setSelected_zipcode(e.target.value)} placeholder="Zip code"></input>
                                    {errors.zipcode && <small className="text-danger">{errors.zipcode}</small>}
                                </div>



                            </div>
                        </div>

                        <div className="col-md-6 d-flex flex-column align-items-start justify-content-center gap-3">

                            <div className="w-100">
                                <label for="website">Taxpayer ID </label>
                                <input type="text" class="form-control" id="TaxpayerID" aria-describedby="website" value={selected_Taxpayer_ID} onChange={(e) => setSelected_Taxpayer_ID(e.target.value)} placeholder="Taxpayer ID"></input>
                            </div>

                            <div className="w-100">
                                <label for="website">Fax Number</label>
                                <input type="text" class="form-control" id="FaxNumber" aria-describedby="FaxNumber" value={selected_Fax_number} onChange={(e) => setSelected_Fax_number(e.target.value)} placeholder="Fax Number"></input>
                            </div>

                            <div className="w-100">
                                <label for="website">Website </label>
                                <input type="text" class="form-control" id="Website" aria-describedby="website" value={selected_Website} onChange={(e) => setSelected_Website(e.target.value)} placeholder="Website"></input>
                            </div>

                            <div className="w-100">
                                <label for="website">HS Code</label>
                                <input type="text" class="form-control" id="HS Code" aria-describedby="website" value={selected_Hscode} onChange={(e) => setSelected_Hscode(e.target.value)} placeholder="HS Code"></input>
                            </div>

                            <div className="w-100">
                                <label for="website">Founded Year </label>
                                <input type="text" class="form-control" id="Founded Year" aria-describedby="website" value={selected_Founded_year}
                                    onKeyDown={(e) => {
                                        // Allow only digits, backspace, delete, arrows, tab
                                        if (
                                            !/[0-9]/.test(e.key) &&
                                            e.key !== "Backspace" &&
                                            e.key !== "Delete" &&
                                            e.key !== "ArrowLeft" &&
                                            e.key !== "ArrowRight" &&
                                            e.key !== "Tab"
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => setSelected_Founded_year(e.target.value)}
                                    placeholder="Founded Year"></input>
                            </div>

                            <div className="w-100">
                                <label for="website">Number of Employees</label>
                                <input type="text" class="form-control" id="website" aria-describedby="website" value={selected_number_employee}
                                    onKeyDown={(e) => {
                                        // Allow only digits, backspace, delete, arrows, tab
                                        if (
                                            !/[0-9]/.test(e.key) &&
                                            e.key !== "Backspace" &&
                                            e.key !== "Delete" &&
                                            e.key !== "ArrowLeft" &&
                                            e.key !== "ArrowRight" &&
                                            e.key !== "Tab"
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onChange={(e) => setSelected_number_employee(e.target.value)} placeholder="Number of Employees"></input>
                            </div>

                            <div className="w-100">
                                <label for="website">Keyword</label>
                                {/* <div className="d-flex align-items-between jusdify-content-between w-100 gap-3">
                                    <input type="text" class="form-control" id="website" aria-describedby="website" placeholder="Keyword"></input>
                                    <button className='das-control-key-add'>Add</button>
                                </div> */}
                                <div className="d-flex align-items-between justify-content-between w-100 gap-3">
                                    <input
                                        type="text"
                                        className={`form-control ${error_keyword ? "border-danger" : ""}`}
                                        id="website"
                                        aria-describedby="website"
                                        placeholder="Keyword"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button
                                        className="das-control-key-add"
                                        type="button"
                                        onClick={handleAddKeyword}
                                    >
                                        Add
                                    </button>
                                </div>

                                {error_keyword && <span className="text-danger d-block" style={{ fontSize: '14px' }}><i>{error_keyword}</i></span>}

                                {/* Keyword display section */}
                                {keywords.length > 0 && (
                                    <div className="mt-3 d-flex flex-wrap gap-2">
                                        {keywords.map((item, index) => (
                                            <div
                                                key={index}
                                                className="position-relative border general-category-selected px-3 py-2 d-inline-flex align-items-center "
                                                style={{
                                                    flex: "0 0 auto"
                                                }}
                                            // className="px-3 py-1 bg-light border rounded-pill d-flex align-items-center"
                                            >
                                                <button
                                                    type="button"
                                                    className="btn-close position-absolute top-0 end-0 me-1 mt-1"
                                                    aria-label="Remove"
                                                    onClick={() => handleRemoveKeyword(index)}
                                                ></button>
                                                <span className="me-2">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column align-items-start justify-content-start mt-3 w-100">
                        <label for="website">Company Banner (Image or Video)</label>
                        <div className="d-flex align-items-start justify-content-start gap-3 w-100 mt-3">
                            <>
                                <DragAndDrop
                                    accept="image/*"
                                    name="banner"
                                    onFileDrop={handleFileDrop_banner}
                                    className="image-div-das-image-upload-banner"
                                    label={
                                        <>
                                            <IoCloudUploadOutline className="fs-2 mb-3" /> <p><b>Click to upload</b> or drag and drop</p> <p style={{ fontSize: '12px' }}> SVG, PNG, JPG or WEBP</p>
                                        </>
                                    } />
                            </>
                            {selectedImage_banner && (
                                <div className="d-flex align-items-start justify-content-end image-div-das-image-baner-outer-div ">
                                    <div className="px-5 py-4 image-div-das-image-baner-inner-div">
                                        <img
                                            src={!image_changed_banner ? `${Backend_URL}/files/${selectedImage_banner}` : selectedImage_banner}
                                            // src={data.company_banner ? `http://localhost:5001/files/${selectedImage_banner}` : selectedImage_banner}
                                            alt="Selected"
                                            className="image-div-das-image-banner"
                                        />
                                    </div>

                                    <RxCross2 style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { setSelectedFile_banner(''); setSelectedImage_banner(''); setImage_changed_banner(true) }} />
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="d-flex flex-row align-items-end justify-content-end mt-3 w-100 gap-3">
                        <button className="das-button-end save-button" onClick={handle_submit_details} >Save</button>
                        <button className="das-button-end cancel-button">Cancel</button>
                    </div>

                </div>



            </div >
        </>
    )
}

export default Das_co_general;