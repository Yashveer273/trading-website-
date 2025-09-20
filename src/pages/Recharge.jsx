import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./Recharge.css";
import { useNavigate } from "react-router-dom";

const Recharge = () => {
  const navigate = useNavigate();

  const quickAmounts = [
    100, 200, 300, 500, 1000, 1200, 1500,
    2000, 2500, 3000, 4000, 5000,
  ];

  const explanations = [
    "Please do not modify the deposit amount unauthorized modification of the deposit amount will result in the deposit not being credited.",
    "Each deposit requires payment to be initiated through this page, please do not save the payment.",
    "Deposit received within 5 minutes, if not received within 5 minutes, please contact online customer service for processing.",
    "Due to too many deposit users, please try multiple times to obtain the deposit link or try again after a period of time.",
  ];

  // state for input amount & selected channel
  const [amount, setAmount] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleQuickAmount = (amt) => {
    setAmount(amt); 
  };

  const handleRecharge = () => {
    if (!amount || !selectedChannel) {
      alert("Please select an amount and a channel.");
      return;
    }

    
    if (selectedChannel === "Paytm") {
      window.open("https://paytm.com", "_blank"); 
    } else if (selectedChannel === "QePay") {
      window.open("https://www.qepay.in", "_blank"); 
    }
  };

  return (
    <div className="recharge-container">
      <div className="recharge-header">
        <button
          className="back-btnR"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <ArrowLeft />
        </button>
        <h2>Recharge</h2>
      </div>

      {/* Recharge Box */}
      <div className="recharge-box">
        {/* 1. Recharge Amount */}
        <label className="label1">Recharge Amount</label>
        <input
          type="number"
          placeholder="Recharge Amount"
          className="amount-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* 2. Quick Amounts */}
        <div className="quick-amounts">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              className={`quick-btn ${amount == amt ? "selected" : ""}`}
              onClick={() => handleQuickAmount(amt)}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* 3. Channels */}
        <div className="channels">
          <button
            className={`channel-btn ${selectedChannel === "Paytm" ? "selected" : ""}`}
            onClick={() => setSelectedChannel("Paytm")}
          >
            Paytm
          </button>
          <button
            className={`channel-btn ${selectedChannel === "QePay" ? "selected" : ""}`}
            onClick={() => setSelectedChannel("QePay")}
          >
            QePay
          </button>
        </div>

        {/* 4. Explain */}
        <div className="explain-box">
          <h3>Explain</h3>
          <ol>
            {explanations.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ol>
        </div>

        {/* Recharge Button */}
        <button className="recharge-btn" onClick={handleRecharge}>
          Recharge Now
        </button>
      </div>
    </div>
  );
};

export default Recharge;