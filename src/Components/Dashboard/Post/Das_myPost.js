import React from "react";

const Das_myPost = () => {

    return(
        <>
            <div className="d-flex flex-column align-items-start justify-content-start w-100">
                            <div className="d-flex flex-row align-items-between justify-content-between w-100">
            
                                <h5 style={{ fontWeight: '700' }}>My Posts</h5>
{/*             
                                <button className="add-product-button"><MdAdd /> Add Product</button> */}
                            </div>
            
                            <div className="d-flex flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-2">
            
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
                                </table>
                            </div>
                        </div>
        </>
    )
}

export default Das_myPost;