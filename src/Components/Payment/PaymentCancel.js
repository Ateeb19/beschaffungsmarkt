import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {

  const navigate = useNavigate();
  return(
  <div style={{ textAlign: "center", marginTop: "100px" }}>
    <h2>❌ Payment Cancelled</h2>
    <p>Your payment was cancelled. You can try again anytime.</p>
    <button className="das-button-end save-button" onClick={() => navigate('/dashboard')}> Move to Dashboard </button>
  </div>
  )
};

export default PaymentCancel;
