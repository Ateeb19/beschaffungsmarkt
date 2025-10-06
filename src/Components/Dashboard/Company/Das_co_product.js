import React from "react";
import { MdAdd } from "react-icons/md";
import { useAlert } from "../../alert/Alert_message";
import { FaExclamationTriangle } from "react-icons/fa";

const Das_co_product = () => {
 const { showAlert } = useAlert();
    const handle_alert = () => {
        showAlert(
            <>
              < FaExclamationTriangle className="me-2 fs-2 text-warning" /> Please upgrade your membership to upload product             
            </>, "warning"
           )
    }
    return (
        <>
            <div className="d-flex flex-column align-items-start justify-content-start w-100">
                <div className="d-flex flex-row align-items-between justify-content-between w-100">

                    <h5 style={{ fontWeight: '700' }}>Product</h5>

                    <button className="add-product-button" onClick={handle_alert}><MdAdd /> Add Product</button>
                </div>

                <div className="d-flex flex-column w-100 align-items-start justify-content-start text-start das-general-form mt-2">

                    <h6>Product Table</h6>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col fs-6">NO</th>
                                <th scope="col fs-6">TITLE</th>
                                <th scope="col fs-6">ACTION</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Das_co_product;