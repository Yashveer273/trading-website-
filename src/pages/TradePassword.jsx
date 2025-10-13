import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TradePassword.css";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../api";

function TradePassword() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const [tradePassword, setTradePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTradePass, setShowTradePass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Send OTP via WhatsApp
  const handleSendOTP = async () => {
    if (!phone) return alert("📱 Please enter your WhatsApp number!");
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}api/trade/send-otp`, { number: phone });
      setOtpSent(true);
      setTimer(60); // 1 min
      alert("✅ OTP sent to your WhatsApp!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP (calls backend)
  const handleVerifyOTP = async () => {
    if (!otp) return alert("Please enter OTP first!");
    try {
      const res = await axios.post(`${API_BASE_URL}api/trade/verify-otp`, {
        number: phone,
        otp,
      });
      if (res.data.success) {
        setOtpVerified(true);
        alert("✅ OTP Verified Successfully!");
      } else {
        alert("❌ Invalid OTP");
      }
    } catch {
      alert("❌ Invalid or expired OTP");
    }
  };

  // ✅ Update Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tradePassword !== confirmPassword) return alert("⚠️ Passwords do not match!");
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?._id;
      if (!userId) return alert("User not found. Please log in again.");

      await axios.post(`${API_BASE_URL}/api/trade/update`, {
        userId,
        tradePassword,
      });

      alert("✅ Trade Password Updated Successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update password");
    }
  };

  return (
    <div className="trade-wrapper">
      <div className="trade-container">
        {/* Header */}
        <div className="trade-header">
          <button className="back-btnO" onClick={() => navigate(-1)}>
            <ArrowLeft color="white" />
          </button>
          <h2>Update Trade Password</h2>
        </div>

        <form className="trade-card" onSubmit={handleSubmit}>
          {/* WhatsApp Number */}
          <label className="input-label">WhatsApp Number</label>
          <div className="otp-wrapper">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter WhatsApp number (e.g. 919876543210)"
              className="trade-input"
              disabled={otpSent && timer > 0}
              required
            />
            {!otpSent ? (
              <button
                type="button"
                className="send-btn"
                onClick={handleSendOTP}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            ) : timer > 0 ? (
              <button type="button" className="send-btn" disabled>
                Resend in {timer}s
              </button>
            ) : (
              <button
                type="button"
                className="send-btn"
                onClick={handleSendOTP}
              >
                Resend
              </button>
            )}
          </div>

          {/* OTP Input + Verify button beside it */}
          {otpSent && !otpVerified && (
            <>
              <label className="input-label">Verification Code (OTP)</label>
              <div className="otp-wrapper">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="trade-input"
                />
                <button
                  type="button"
                  className="verify-btn"
                  onClick={handleVerifyOTP}
                >
                  Verify
                </button>
              </div>
            </>
          )}

          {/* Password fields after OTP verified */}
          {otpVerified && (
            <>
              <label className="input-label">New Trade Password</label>
              <div className="password-wrapper">
                <input
                  type={showTradePass ? "text" : "password"}
                  value={tradePassword}
                  onChange={(e) => setTradePassword(e.target.value)}
                  placeholder="Enter new trade password"
                  className="trade-input"
                  required
                />
                <span
                  className="toggle-visibility"
                  onClick={() => setShowTradePass(!showTradePass)}
                >
                  {showTradePass ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <label className="input-label">Confirm Trade Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm trade password"
                  className="trade-input"
                  required
                />
                <span
                  className="toggle-visibility"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <button
                type="submit"
                className="update-btn"
                disabled={!tradePassword || tradePassword !== confirmPassword}
              >
                Update Trade Password
              </button>
            </>
          )}
        </form>

        <div className="explain-card">
          <h3>📘 Explain</h3>
          <p>1. OTP is valid for 1 minute only.</p>
          <p>2. Verify your OTP before proceeding.</p>
          <p>3. Resend available after 60 seconds.</p>
        </div>
      </div>
    </div>
  );
}

export default TradePassword;
