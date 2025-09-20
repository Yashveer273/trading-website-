import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TradePassword.css";
import { ArrowLeft } from "lucide-react";

function TradePassword() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [tradePassword, setTradePassword] = useState("");
  const [showTradePass, setShowTradePass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Trade Password Updated Successfully!");
  };

  return (
    <div className="trade-wrapper">
      <div className="trade-container">
        {/* Header */}
        <div className="trade-header">
         <button className="back-btnR" onClick={() => navigate(-1)}>
                  <ArrowLeft color="white"/>
                </button>
          <h2>Update Trade Password</h2>
        </div>

        {/* Form */}
        <form className="trade-card" onSubmit={handleSubmit}>
          {/* OTP */}
          <label className="input-label">Verification Code (OTP)</label>
          <div className="otp-wrapper">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="trade-input"
            />
            <button type="button" className="send-btn">
              Send
            </button>
          </div>

          {/* Trade Password */}
          <label className="input-label">Trade Password</label>
          <div className="password-wrapper">
            <input
              type={showTradePass ? "text" : "password"}
              value={tradePassword}
              onChange={(e) => setTradePassword(e.target.value)}
              placeholder="Enter trade password"
              className="trade-input"
            />
            <span
              className="toggle-visibility"
              onClick={() => setShowTradePass(!showTradePass)}
            >
            </span>
          </div>

          <button type="submit" className="update-btn">
            Update Trade Password
          </button>
        </form>

        {/* Explain Section */}
        <div className="explain-card">
          <h3>📘 Explain</h3>
          <p>
            1. The transaction password is an important credential for you to
            withdraw funds, add bank accounts, and delete bank accounts.
          </p>
          <p>
            2. Do not set the transaction password to match the login password.
          </p>
          <p>
            3. If you forget your transaction password, reset it using mobile
            OTP verification.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TradePassword;