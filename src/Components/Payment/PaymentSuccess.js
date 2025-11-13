import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  return(
    
  <div style={{ textAlign: "center", marginTop: "100px" }}>
    <h2>✅ Payment Successful!</h2>
    <p>Thank you for upgrading to Premium.</p>
    <button className="das-button-end save-button" onClick={() => navigate('/dashboard')}> Move to Dashboard </button>
  </div>
  )
};

export default PaymentSuccess;
