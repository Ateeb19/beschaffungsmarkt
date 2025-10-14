import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXX"); // Your Stripe Publishable Key

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("monthly");
  const [email, setEmail] = useState("");

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/payments/create-checkout-session", {
        email,
        plan,
      });

      const { url } = response.data;
      if (url) {
        window.location.href = url; // Redirect to Stripe checkout
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h3>Upgrade to Premium</h3>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
      />

      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="radio"
            name="plan"
            value="monthly"
            checked={plan === "monthly"}
            onChange={() => setPlan("monthly")}
          />{" "}
          ₹179 / month
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="plan"
            value="yearly"
            checked={plan === "yearly"}
            onChange={() => setPlan("yearly")}
          />{" "}
          ₹1999 / year
        </label>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || !email}
        style={{
          padding: "10px 20px",
          background: "#6772E5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>
    </div>
  );
};

export default PaymentButton;
