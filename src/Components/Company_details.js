import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { IoHomeOutline } from "react-icons/io5";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as SiIcons from "react-icons/si";
import * as GrIcons from "react-icons/gr";

const Company_details = () => {
    const Backend_URL = process.env.REACT_APP_API_URL;
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.post(`${Backend_URL}/api/users/get-company-info`, {
                    companyId: companyId,
                });
                setCompany(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching company info:", err);
            }
        };

        fetchCompany();
    }, [companyId]);


    const asArray = (v) => {
        if (v === undefined || v === null) return [];
        return Array.isArray(v) ? v : [v];
    };

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

        const lib = libraries[libName];   // Example: GiIcons
        if (!lib) return null;

        const IconComponent = lib[iconName]; // Example: GiLeatherArmor
        return IconComponent ? <IconComponent /> : null;
    };


    if (!company) return <p>Loading...</p>;


    return (
        <div>
            {/* <h1>{company.company_name}</h1>
            <img src={`http://localhost:5001/files/${company.company_logo}`} alt={company.company_name} />
            <p>{company.company_description}</p>
            <p>{company.company_description2}</p>
            <p>Premium: {company.is_premium}</p> */}

            <div className="container d-flex flex-column align-items-center justify-content-center w-100 mt-5 gap-4">
                {company.premiumUser ? (null) : (<>
                    <div className="d-flex text-center align-items-center justify-content-center w-100 company-details-primium-div">
                        <span>Please upgrade your membership to view all contact information. <b onClick={() => navigate('/pricing')}>Here</b></span>
                    </div>
                </>)}

                <div className="d-flex align-items-start justify-content-start w-100">
                    <nav
                        style={{
                            "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
                        }}
                        aria-label="breadcrumb"
                    >
                        <ol className="overview-breadcrumb breadcrumb location-div">
                            <li className="breadcrumb-item" onClick={() => { navigate('/') }}><a href="#"><IoHomeOutline /> Home</a></li>
                            <li className="breadcrumb-item" aria-current="page">Company</li>
                            <li className="breadcrumb-item" aria-current="page">{company.company_name}</li>
                        </ol>
                    </nav>
                </div>

                <div className="d-flex align-items-start justify-content-start w-100 detail-company-name gap-4 company-card">
                    {company.is_premium === 2 && (
                                                        <>
                                                            <div class="verified-badge">
                                                                <p>Verified</p>
                                                                <p>Premium</p>
                                                                <div class="d-flex justify-content-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 
            3.8-36.7 36.1-17.7 54.6l105.7 103-25 
            145.5c-4.5 26.3 23.2 46 46.4 
            33.7L288 439.6l130.7 68.7c23.2 
            12.2 50.9-7.4 46.4-33.7l-25-145.5 
            105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 
            150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                    <div className="detail-image-div">
                        <img src={company.company_logo ? (`${Backend_URL}/files/${company.company_logo}`) : ('/Images/download23.jpeg')} alt={company.company_name} />
                        {/* <img src={company.company_logo ? (`http://localhost:5001/files/${company.company_logo}`) : ('/Images/download23.jpeg')} alt={company.company_name} /> */}
                    </div>

                    <div className="d-flex flex-column align-items-start justify-content-start gap-2">
                        <div className="d-flex flex-row align-itmes-center justify-content-center gap-3 company-name-img">
                            <h5 className="mt-2">{company.company_name}</h5>
                            <div className="flag-div d-flex align-items-center justfy-content-center ">
                                <img src={company.country === 'Germany' ? "/Images/germany.png" : "/Images/turkey.png"} alt="Country Flag" width={20} height={20} /><span>{company.country}</span>
                            </div>
                        </div>
                        <span className="description-company-details">{company.company_description ? (company.company_description) : null}</span>
                    </div>
                </div>

                <div className="d-flex flex-row align-items-start justify-content-start w-100 gap-3">
                    <div className="col-md-9 d-flex flex-column align-items-center justify-content-center gap-4">
                        <div className="detail-company-2 w-100 d-flex flex-column align-items-start justify-content-start">
                            <h5>Export Products</h5>
                            <div className="d-flex align-items-start justify-content-start gap-4 w-100">
                                {company.products.length > 0 ? (
                                    <>
                                        {company.products.map((p, key) => (
                                            <>
                                                <div className="export-product-div d-flex flex-column gap-2" key={key}>
                                                    <img src={`${Backend_URL}/files/${p.image}`} alt={p.title} />
                                                    {/* <img src={`http://localhost:5001/files/${p.image}`} alt={p.title} /> */}
                                                    <span >{p.title}</span>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                ) : <div className="d-flex align-item-center justify-content-center w-100 no-item-detail-div">
                                    <span>There are no export products</span>
                                </div>}
                            </div>
                        </div>

                        <div className="detail-company-2 w-100 d-flex flex-column align-items-start justify-content-start">
                            <h5>Certificates</h5>
                            <div className="d-flex align-items-start justify-content-start gap-4 w-100">
                                {company.certificates.length > 0 ? (
                                    <>
                                        {company.certificates.map((p, key) => (
                                            <>
                                                <div className="export-product-div d-flex flex-column gap-2" key={key}>
                                                    <img src={`${Backend_URL}/files/${p.image}`} alt={p.title} />
                                                    {/* <img src={`http://localhost:5001/files/${p.image}`} alt={p.title} /> */}
                                                    <span >{p.title}</span>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                ) : <div className="d-flex align-item-center justify-content-center w-100 no-item-detail-div">
                                    <span>There are no certificates</span>
                                </div>}
                            </div>
                        </div>
                        {company.company_category.length > 0 && (
                            <div className="detail-company-2 w-100 d-flex flex-column align-items-start justify-content-start">
                                <h5>Categories</h5>
                                <div className="d-flex align-items-start justify-content-start gap-4">
                                    {company.company_category?.map((c, k1) => {
                                        const categories = asArray(c.category); // handle object OR array

                                        return (
                                            <div key={k1} className="d-flex flex-column align-items-start justify-content-start text-start">
                                                {categories.map((cat, k2) => {
                                                    const mains = asArray(cat.main_category); // handle object OR array

                                                    return mains.map((main, k3) => (
                                                        <>
                                                            <div key={`${k1}-${k2}-${k3}`} className="me-2 category-detail-company">
                                                                <span style={{ fontSize: '20px' }} className="me-1">{getIconComponent(main.icon)}</span>
                                                                <span>{main?.label ?? cat?.label ?? "—"}</span>
                                                            </div>
                                                            <div className="ms-4 mt-2">
                                                                <span style={{ fontSize: '20px' }} className="me-1">{getIconComponent(cat.icon)}</span>
                                                                <span>{cat?.label ?? cat?.label ?? "—"}</span>
                                                            </div>
                                                        </>
                                                    ));
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-md-3 d-flex flex-column align-items-start justify-content-start">
                        <div className="detail-company-right w-100 p-0">
                            <div className="d-flex align-items-center justify-content-center text-center w-100 my-3">
                                <h6>Contact Information</h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <img src="/Images/user-avatar-CZ6R_fL7.webp" alt="" className="" />
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-3 w-100 detail-address">
                                <Fa6Icons.FaLocationDot className="me-1" style={{ color: '#3b82f6' }} /> <span>{company.street ? (company.street) : null} {company.zipcode ? (company.zipcode) : null} {company.city ? (company.city) : null} {company.country ? (company.country) : null}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center w-100 contect-detail-button gap-2">
                                <span>Contact Now</span> <Fa6Icons.FaRegMessage />
                            </div>
                        </div>



                        {(company.company_type || company.company_segment.length > 0 || company.founded_year || company.employee_number) ? (
                            <>

                                <div className="detail-company-right-2 d-flex flex-column align-items-start justify-content-start w-100">
                                    <div className="d-flex align-items-center justify-content-center w-100">
                                        <h6>Company Information</h6>
                                    </div>

                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                        {company.company_type && (
                                            <>
                                                <span className="detail-bottom-1">Type</span>
                                                <span className="detail-bottom-2">{company.company_type.label}</span>
                                            </>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                        {company.company_segment.length > 0 ? (
                                            <>
                                                <span className="detail-bottom-1">Segment</span>
                                                {company.company_segment.map((seg, key) => (
                                                    <>
                                                        <span className="detail-bottom-2">{seg.segment.label}</span>
                                                    </>
                                                ))}
                                            </>
                                        ) : (null)}
                                    </div>

                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                        {company.founded_year && (
                                            <>
                                                {company.founded_year.length > 0 ? (
                                                    <>
                                                        <span className="detail-bottom-1">Founding Year</span>
                                                        <span className="detail-bottom-2">{company.founded_year}</span>
                                                    </>
                                                ) : (null)}
                                            </>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                        {company.employee_number && (
                                            <>
                                                {company.employee_number.length > 0 ? (
                                                    <>
                                                        <span className="detail-bottom-1">Employee Number</span>
                                                        <span className="detail-bottom-2">{company.employee_number}</span>
                                                    </>
                                                ) : (null)}
                                            </>
                                        )}
                                    </div>

                                </div>

                            </>
                        ) : null}


                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Company_details;