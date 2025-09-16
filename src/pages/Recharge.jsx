import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Recharge.css";
import { ArrowLeft, } from "lucide-react";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [channel, setChannel] = useState("");
  const navigate = useNavigate();

  const quickAmounts = [
    100, 200, 300,
    500, 1000, 1200,
    1500, 2000, 2500,
    3000, 4000, 5000
  ];

  const handleQuickAmount = (val) => {
    setAmount(val);
  };

  const handleRecharge = () => {
    if (amount && channel) {
      navigate("/Afterrecharge");
    } else {
      alert("Please enter amount and select a channel.");
    }
  };

  return (
    <div className="recharge-container">
      <div className="recharge-header">
       
        <button className="back-btnR" onClick={() => navigate(-1)}>
          <ArrowLeft color="black"/>
        </button>
        <h2>Recharge</h2>
      </div>

      <div className="recharge-box">
        <label className="label1">Recharge Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₹ Recharge Amount"
          className="amount-input"
        />

        <div className="quick-amounts">
          {quickAmounts.map((val) => (
            <button
              key={val}
              className={`quick-btn ${amount === val ? "selected" : ""}`}
              onClick={() => handleQuickAmount(val)}
            >
              {val}
            </button>
          ))}
        </div>

      
        <div className="channels">
          <button
            className={`channel-btn ${channel === "Ptm" ? "selected" : ""}`}
            onClick={() => setChannel("Ptm")}
          >
            Ptm
          </button>
          <button
            className={`channel-btn ${channel === "QePay" ? "selected" : ""}`}
            onClick={() => setChannel("QePay")}
          >
            QePay
          </button>
        </div>

        <div className="explain-box">
          <h3>Explain</h3>
          <ol>
            <li>Please do not modify the deposit amount. Unauthorized modification will not be credited.</li>
            <li>Each deposit requires payment to be initiated through this page. Do not save the payment.</li>
            <li>Deposit should be received within 5 minutes. If not, contact customer service.</li>
            <li>Due to too many users, please try multiple times if the link does not work immediately.</li>
          </ol>
        </div>

        <button className="recharge-btn" onClick={handleRecharge}>
          Recharge Now
        </button>
      </div>
    </div>
  );
};

export default Recharge;
